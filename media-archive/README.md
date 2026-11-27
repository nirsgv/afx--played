# media-archive

Original media kept for reference but **not deployed**: nothing in the app loads these files.
Only `public/` is copied into the site build.

- `album_covers/600x600pp`, `400x400pp`, `200x200pp`: larger cover sizes (the app uses `public/assets/album_covers/160x160pp`)
- `album_covers/album_image_*.jpg`: original cover images
- `*.mp3`: audio samples for the unfinished sample player (`/api/sample` has no server route)

To use one, move it back under `public/assets/` and reference it as `/assets/...`.
