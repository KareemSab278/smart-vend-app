# Smart Vend App

A mobile vending app prototype built with Expo Router and React Native. The app includes authentication, a catalogue, cart management, checkout flow, account pages, and payment UI.

## Key Features

- Sign in / sign up user flow with auth guard redirects
- Home dashboard with favourites, order history, and quick cart access
- Product catalogue with filters and add-to-cart support
- Checkout flow with QR/pin payment interface
- Payment screen support for Stripe integration
- Local persistence via AsyncStorage (or web localStorage)
- Expo Router navigation for cross-platform mobile and web

## Tech Stack

- Expo SDK
- Expo Router
- React Native
- TypeScript
- React Navigation
- React Native Paper
- Expo Camera
- Stripe React Native

## Project Structure

- `app/` — Expo Router entrypoints for each route:
  - `app/index.tsx` → Home
  - `app/sign-in.tsx` → login screen
  - `app/sign-up.tsx` → registration screen
  - `app/catalogue.tsx` → catalogue screen
  - `app/account.tsx` → account screen
  - `app/checkout.tsx` → checkout screen
  - `app/payment.tsx` → payment screen
- `screens/` — screen implementations and nested screen components
- `ApiCallers/` — API helper functions, mock data, and auth calls
- `Security/` — auth checks and navigation guard components
- `store/` — persistence utilities and storage helpers
- `components/` — reusable UI components
- `Types/` — TypeScript type definitions

## Navigation and App Flow

### Sign In / Sign Up

- The app launches at `/` via `app/index.tsx` and renders `HomeScreen`.
- If the user is not authenticated, the home screen redirects to `/sign-in`.
- `app/sign-in.tsx` and `app/sign-up.tsx` both render `screens/SignIn/SignInScreen.tsx`.
- Registration is enabled by `SignInScreen` using the `initialMode="register"` prop.
- `screens/SignIn/SignInScreen.tsx` calls `ApiCallers/signInUser.ts` and `ApiCallers/signUpUser.ts`.
- After successful auth, user data is stored using `store/Storage.ts`, and navigation returns to home.

### Home Screen

- `screens/Home/HomeScreen.tsx` loads:
  - user session state from storage
  - cart data from storage
  - catalogue items from `ApiCallers/fetchCatalogue.ts`
  - favourites from `ApiCallers/fetchFavourites.ts`
  - order history from `ApiCallers/fetchOrderHistory.ts`
- It also enforces authentication with `Security/signInCheck.tsx`.
- The UI highlights recent orders, favourite items, and cart shortcuts.

### Catalogue Screen

- `screens/Catalogue/CatalogueScreen.tsx` provides the product listing experience.
- Supports categories, dietary filters, item details, and cart interactions.
- The screen uses local state and storage-backed cart persistence.

### Checkout and Payment

- `app/checkout.tsx` renders `screens/CheckOut/CheckOutScreen.tsx`.
- `app/payment.tsx` renders `screens/Payment/PaymentScreen.tsx`.
- The checkout flow includes cart summary, QR scanning modal, and pin generation.
- `ApiCallers/fetchNewPayPin.ts` provides the payment pin generation stub.
- Successful checkout clears cart state from storage.

## Authentication and Storage

- `Security/checkUser.ts` verifies whether a signed-in user exists.
- `Security/signInCheck.tsx` exports:
  - `IfUserNotSignedIn` — redirects unauthenticated users to `/sign-in`
  - `IfUserSignedIn` — redirects authenticated users away from auth screens
- `store/Storage.ts` abstracts AsyncStorage and browser `localStorage`.
- `store/StorageHelpers.ts` provides storage helper utilities.

## API Layer and Mock Data

- `ApiCallers/` contains the current data layer and auth helpers.
- `fetchCatalogue.ts`, `fetchFavourites.ts`, and `fetchOrderHistory.ts` currently return local/demo data.
- `signInUser.ts` and `signUpUser.ts` are ready for backend integration.
- `callAPI.ts` can be configured to use a real backend via `EXPO_PUBLIC_BACKEND_URL`.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start Expo:

   ```bash
   npm run start
   ```

3. Run on a device or emulator:

   ```bash
   npm run android
   npm run ios
   npm run web
   ```

4. For real API integration, set the backend URL:

   ```bash
   export EXPO_PUBLIC_BACKEND_URL=https://your-backend.example.com
   ```

## Notes for Future Work

- Replace mock/demo API responses in `ApiCallers/*` with real endpoints.
- Integrate real authentication and backend validation in `signInUser.ts` / `signUpUser.ts`.
- Update `callAPI.ts` to forward requests to a configured backend.
- Keep `Security/checkUser.ts` development flags disabled for production.

## Overview

This repo is a working Expo-based prototype with auth, catalogue, cart, checkout, and payment flows. The current architecture is built to swap out mock data for live API responses with minimal changes.
