// URL of an album cover. Some ALBUM_IDs contain # or ? (a raw # cuts the URL
// short), so those are encoded. Other characters such as + & ( ) ' are left as
// they are: they are valid in a URL path, and Vite's dev server does not decode
// %2B, which would break most covers locally.
const coverUrl = (albumId) =>
    `/assets/album_covers/160x160pp/${String(albumId).replace(/[#?%\s]/g, encodeURIComponent)}.jpg`;

export { coverUrl };
