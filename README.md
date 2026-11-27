# Afx-played

This is a react/redux spa made to present a unique list of tracks.  
  - Those are tracks played at shows of richard d. james aka the aphex twin.
  - You might call this a fan-site.
  - This list is long and has many fine items burried in it.
  - The created app makes an attemp to present these tracks.

## Tech

  - This is node app which uses express for API consumption.
  - MongoDb is used for the Database.
  - React is used for the client side UI.
  - Redux is used for state management.
  - Components are function based, some incorporate hooks and all are self-written.
  - Sass is used as a stylesheet preprocessor.     
  - The data sources are a few json files which i assembled.  
  - Vite is used for the dev server and production build.
  - Vitest and Testing Library are used for testing.

## Development

Requires Node 24 or newer (`.node-version` pins 26 for fnm/nvm).

Create a `variables.env` file in the project root (it is gitignored):

```
DATABASE=mongodb+srv://<user>:<password>@<cluster>/afx_played
PORT=8000
# Optional: GA4 measurement id for analytics (read at build time)
VITE_GA_MEASUREMENT_ID=
```

```sh
npm install
npm run dev:api   # API on http://localhost:8000 (restarts on change)
npm run dev       # client on http://localhost:3000, proxies /api to the API
npm test          # unit and route smoke tests
npm run build     # production build into build/
npm start         # serves the API and build/ on PORT
```
