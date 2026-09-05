# 1Fi Marketplace

# Link - https://1-fi-marketplace-five.vercel.app/

A mobile-first React implementation of the 1Fi Shop experience and the requested **1Fi Marketplace** feature.

## Included

- Five-item bottom navigation: Home, Shop, EMI Dues, Limit, and Profile
- Shop hero and three-way selector: Top Brands, Nearby Stores, and Marketplace
- Reference-style Top Brands and Nearby Stores lists
- Marketplace catalogue with search, responsive product cards, and generic no-cost EMI messaging
- Product detail, variant selection, EMI-plan selection, selected-plan summary, and confirmation state
- Typed asynchronous mock API with loading, empty-search, and error states

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite. The app is designed for a mobile viewport and is centered in a phone-width canvas on larger displays.

## Mock data

Product catalogue, variants, and generic EMI plan values are in `src/data/marketplaceMockData.ts`. UI components retrieve that data through `src/services/marketplaceApi.ts`, so it can be replaced with a real backend without changing feature components.

To preview the error state, start with `VITE_FORCE_API_ERROR=true` in the environment.

## Verify

```bash
npm run build
```
