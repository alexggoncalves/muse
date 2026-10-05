const SIZES = new Set(["200", "400", "843"]);

export default async function handler(req, res) {
  const { id, w = "843" } = req.query;

  if (!/^[0-9a-f-]{36}$/i.test(id) || !SIZES.has(w)) {
    return res.status(400).end();
  }

  const upstream = await fetch(
    `https://www.artic.edu/iiif/2/${id}/full/${w},/0/default.jpg`,
    { headers: { "AIC-User-Agent": "MUSE (https://github.com/alexggoncalves/muse)" } }
  );

  const type = upstream.headers.get("content-type") || "";
  if (!upstream.ok || !type.startsWith("image/")) {
    return res.status(502).end();
  }

  res.setHeader("Content-Type", type);
  res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=2592000");
  res.send(Buffer.from(await upstream.arrayBuffer()));
}