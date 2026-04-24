# Smart Vend App

A mobile vending app built with Expo and React Native. This project includes a sign-in/sign-up flow, home dashboard, catalogue browsing, cart management, and checkout with QR/pin payment UI.

## Key Features

- User authentication flow with login and registration screens
- Home dashboard showing previous orders and favourites
- Product catalogue with filters and add-to-cart functionality
- Cart modal with item quantity updates, removal, and checkout navigation
- Checkout flow with camera-based QR scanning and pin generation UI
- Local persistence using AsyncStorage (or browser localStorage on web)
- Expo Router-based navigation and cross-platform support

## Tech Stack

- Expo
- React Native
- Expo Router
- AsyncStorage / localStorage
- TypeScript
- React Navigation
- React Native Paper

## App Structure

- `app/` — router entry points for screens:
  - `app/index.tsx` → Home screen
  - `app/sign-in.tsx` → Sign in / login screen
  - `app/sign-up.tsx` → Sign up screen
  - `app/catalogue.tsx` → Catalogue screen
- `screens/` — main screen implementations:
  - `screens/Home/HomeScreen.tsx`
  - `screens/SignIn/SignInScreen.tsx`
  - `screens/Catalogue/CatalogueScreen.tsx`
  - `screens/CheckOut/CheckOutScreen.tsx`
- `helpers/` — data fetching, authentication, and API helpers
- `store/` — persistent storage utilities for user, cart, and catalogue data
- `Security/` — simple sign-in guard utilities to redirect users
- `components/` — reusable UI elements used across the app
- `Types/` — TypeScript definitions for user, catalogue, and order data

## User Flow

### 1. Sign In / Sign Up

- The app starts on the home route (`/`), which renders `HomeScreen`.
- If the user is not authenticated, `HomeScreen` redirects to `/sign-in`.
- `SignInScreen` supports both login and registration modes.
- Login uses `helpers/signInUser.ts` and registration uses `helpers/signUpUser.ts`.
- Successful sign in or registration stores the user in local storage via `store/Storage.ts`.
- After authentication, the app routes to the home screen.

### 2. Home Screen

- `screens/Home/HomeScreen.tsx` loads:
  - saved user details from local storage
  - cart contents from local storage
  - fake order history via `helpers/fetchOrderHistory.ts`
  - fake favourites via `helpers/fetchFavourites.ts`
  - catalogue data via `helpers/fetchCatalogue.ts`
- The screen shows a welcome message, previous orders, and favourites.
- A cart button is always available to open the cart modal from the home UI.

### 3. Catalogue Screen

- `screens/Catalogue/CatalogueScreen.tsx` displays all available catalogue items.
- It supports:
  - category selection
  - dietary filters
  - adding items to the cart
  - opening the cart modal
- Cart state is persisted locally with `CartStorage`.

### 4. Checkout Flow

- `screens/CheckOut/CheckOutScreen.tsx` shows the current cart summary and total.
- Checkout UI supports a camera-based QR scan modal and a pin generation modal.
- `helpers/fetchNewPin.ts` retrieves a new pin for the payment flow.
- After a successful pay flow, the cart is cleared from storage.

## Authentication and Storage

- `Security/checkUser.ts` determines whether the user is signed in by checking stored user data.
- `Security/signInCheck.tsx` provides navigation guards:
  - `IfUserNotSignedIn` redirects unauthenticated users to `/sign-in`
  - `IfUserSignedIn` redirects authenticated users away from the auth screens
- `store/Storage.ts` provides cross-platform persistence using AsyncStorage and `localStorage` on web.
- `store/Storage.ts` also stores cart and catalogue caches.

## Current API Setup

- The project currently uses mock backend behavior in development mode.
- `helpers/signInUser.ts` returns a dummy user object when `DEVELOPMENT_MODE` is `true`.
- `helpers/signUpUser.ts` and `helpers/callAPI.ts` are ready to call real endpoints if a backend URL is provided.
- `helpers/callAPI.ts` expects `EXPO_PUBLIC_BACKEND_URL` to be configured in environment variables.

## Important Notes / Future Work

- This app still needs real backend API endpoints for:
  - user sign-in (`sign-in`)
  - user sign-up (`signup`)
  - catalogue data
  - favourites
  - order history
  - payment or pin generation
- `helpers/callAPI.ts` will send requests to `BASE_URL/<endpoint>` once the backend URL is configured.
- `helpers/fetchCatalogue.ts`, `helpers/fetchFavourites.ts`, and `helpers/fetchOrderHistory.ts` currently use fake data and must be updated to use actual API responses.
- `Security/checkUser.ts` currently supports an `IGNORE_SECURITY` flag for development; this should be removed or disabled in production.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the Expo development server:

   ```bash
   npm run start
   ```

3. Run on a device or emulator:

   ```bash
   npm run android
   npm run ios
   npm run web
   ```

4. Set backend URL for real API integration:

   ```bash
   export EXPO_PUBLIC_BACKEND_URL=https://your-backend.example.com
   ```

## Where to Add Real API Endpoints

- `helpers/callAPI.ts` — central request helper for POST calls.
- `helpers/signInUser.ts` — replace development stub with real login request.
- `helpers/signUpUser.ts` — validate and send sign-up form data to the backend.
- `helpers/fetchCatalogue.ts` — replace fake catalogue data with a real catalogue endpoint.
- `helpers/fetchFavourites.ts` — retrieve user favourites from the backend.
- `helpers/fetchOrderHistory.ts` — retrieve order history from the backend.
- `helpers/fetchNewPin.ts` — implement real payment pin generation.

## Summary

The Smart Vend App is a complete Expo-based prototype with auth, shopping, and checkout flows. It is designed to be extended with backend endpoints later, and the current architecture supports swapping mock data for live API responses with minimal changes.
