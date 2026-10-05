import { createContext, useEffect, useState } from "react";

export const ArtContext = createContext(null);

const SEARCH_URL = "https://api.artic.edu/api/v1/artworks/search";
const FIELDS = "id,title,image_id,artist_title,date_display,medium_display";

const IIIF_BASE = "https://www.artic.edu/iiif/2";

export function getImageUrl(imageId, size = 843) {
    if (!imageId) return null;
    if (import.meta.env.DEV) {
        return `/aic-img/${imageId}/full/${size},/0/default.jpg`; // local: Vite proxy
    }
    return `/api/img?id=${imageId}&w=${size}`; // online: Vercel function
}

export function getArtworkUrl(artID) {
    if (!artID) return null;
    return `https://www.artic.edu/artworks/${artID}`;
}

const MATERIALS = [
    "Oil",
    "Watercolor",
    "Bronze",
    "Wood",
    "Ceramic",
    "Paper",
    "Silver",
    "Cotton",
    "Glass",
    "Ink",
].map((m) => ({ key: m, value: m }));

const TECHNIQUES = [
    "Painting",
    "Print",
    "Drawing",
    "Photograph",
    "Sculpture",
    "Textile",
    "Etching",
    "Engraving",
].map((t) => ({ key: t, value: t }));

export function ArtProvider({ children }) {
    const [art, setArt] = useState([]);
    const [total, setTotal] = useState(0);
    const [materials] = useState(MATERIALS);
    const [techniques] = useState(TECHNIQUES);

    const [order, setOrder] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [material, setMaterial] = useState("");
    const [technique, setTechnique] = useState("");

    const [page, setPage] = useState(1);
    const [count, setCount] = useState();
    const [amountPerPage, setAmountPerPage] = useState(100);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            setLoading(true);
            setArt([]);

            const params = new URLSearchParams({
                page: String(page),
                limit: String(amountPerPage),
                fields: FIELDS,
            });

            // Set search param based on user input
            if (searchInput) params.set("q", searchInput);

            const filters = [];
            if (technique)
                filters.push(["match", "classification_titles", technique]);
            if (material) filters.push(["match", "medium_display", material]);

            filters.forEach(([type, field, value], i) => {
                params.set(
                    `query[bool][filter][${i}][${type}][${field}]`,
                    value,
                );
            });

            const url = `${SEARCH_URL}?${params}`;

            try {
                const res = await fetch(url, { signal: controller.signal });
                const data = await res.json();

                setArt(data.data);
                setCount(data.data.length);
                setTotal(data.pagination.total);
            } catch (error) {
                if (error.name === "AbortError") return; // cancelled on purpose, ignore
                console.error("Error fetching art objects:", error);
                setArt([]);
                setCount(0);
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        load();

        return () => controller.abort();
    }, [order, page, material, technique, searchInput, amountPerPage]);

    useEffect(() => {
        setPage(1);
    }, [order, material, technique, searchInput]);

    const nextPage = () => {
        setPage(page + 1);
        scrollTo(0, 0);
    };

    const previousPage = () => {
        setPage(page - 1);
        scrollTo(0, 0);
    };

    return (
        <ArtContext.Provider
            value={{
                art,
                total,
                setOrder,
                order,
                materials,
                techniques,
                setMaterial,
                setTechnique,
                setSearchInput,
                page,
                loading,
                nextPage,
                previousPage,
                count,
                amountPerPage,
            }}
        >
            {children}
        </ArtContext.Provider>
    );
}
