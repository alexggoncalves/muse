import { useEffect, useRef } from "react";
import { getImageUrl, getArtworkUrl } from "../../contexts/ArtContext";

const ArtCard = ({ art }) => {
    const imageSrc = getImageUrl(art.image_id, 400);
    const artworkUrl = getArtworkUrl(art.id);

    const captionRef = useRef();

    const toggleCaptionVisibility = () => {
        captionRef.current.classList.toggle("hide");
    };

    const moveCaption = (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        if (captionRef.current) {
            captionRef.current.style.left = mouseX + 14 + "px";
            captionRef.current.style.top = mouseY + 20 + "px";
        }
    };

    useEffect(() => {
        document.addEventListener("mousemove", moveCaption);
        return () => {
            document.removeEventListener("mousemove", moveCaption);
        };
    }, []);

    return (
        <div className="art-object">
            <a
                href={artworkUrl}
                target="_blank"
                rel="noreferrer noopener"
            >
                <img
                    className="art-image"
                    src={imageSrc}
                    alt={art.title}
                    loading="lazy"
                    onMouseEnter={toggleCaptionVisibility}
                    onMouseLeave={toggleCaptionVisibility}
                />
            </a>

            <div ref={captionRef} className={`hide floating-caption`}>
                <h3 className="art-card__title">{art.title}</h3>
                <p className="art-card__artist">
                    {art.artist_title ?? "Unknown"}
                </p>
                {art.date_display && (
                    <p className="art-card__date">{art.date_display}</p>
                )}
            </div>
        </div>
    );
};

export default ArtCard;
