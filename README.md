# Lockout Demo

## Overview

This is a prototype for the lockout app. It is a React Native app that allows lockout admins to view their device health and security alerts. This app is created for demonstration purposes only and is not intended for production use.

## Getting Started

### Prerequisites

- Node.js
- PNPM

### Installation

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Add the Firebase configuration files for iOS and Android. You can download it from the Firebase console. For ios, the file name is `GoogleService-Info.plist` and for android, it is `google-services.json`. While building the app on EAS server, files will be picked from the EAS environment secret.
4. Run the app with `pnpm start`

## Styling

For our React Native app, we use [Native Winds](https://nativewind.dev/) for styling. Nativewind helps us to write [Tailwind CSS](https://tailwindcss.com/) code in React Native. Tailwind CSS is a utility-first CSS framework that allows you to style your application quickly and easily. It provides a set of predefined utility classes that you can use to quickly style your application without writing any CSS code.

## Firebase

We use Firebase for authentication, database (Realtime and Firestore), and crash reporting.

### Firebase Authentication

Firebase Authentication is used for user authentication. We sign up and sign in users using email and password.

### Firebase Realtime Database

Firebase Realtime Database is used for showing real time alerts related to the device health and school security. For now, we are also using it to show notifications.

### Firebase Firestore

Firebase Firestore is used for storing/reading data related to the device health and school security.

## Project Structure

The project structure is as follows:

### `app/`
This is the main folder for the app. It contains the **logic for the navigation ,screen entry points and the layout of the app**. This folder should not have any UI components. All features should be placed in the features folder.  

#### Structure Rules
- `(auth)` → Screens shown **before authentication** (login/signup).
- `(protected)` → Screens accessible **after login**.
- `_layout.tsx` in each folder → Controls everything **inside that folder only**.

#### Key Files

##### `app/_layout.tsx`  
Main controller of the entire app.  
Handles:
- **Global Providers**
  - `AuthProvider`
  - `OTAUpdateProvider`
  - `BottomSheetModalProvider`
  - `KeyboardProvider`
  - `GestureHandlerRootView`
- Font loading  
- Splash screen visibility  
- Auth-based routing:
  - Logged in → `(protected)`
  - Not logged in → `(auth)`

##### `(auth)/_layout.tsx`
- Handles **unauthenticated navigation stack**.

##### `(protected)/_layout.tsx`
- Wraps secured screens using `Stack`.
- Shows **AppHeader**.
- Applies alerts.

##### `(protected)/(tabs)/_layout.tsx`
- Defines bottom tab navigation using `<Tabs />`.

>  _Each `_layout.tsx` controls the behavior, navigation, and layout of its folder scope._

####  `AuthProvider` (hooks)
Handles:
- Login  
- Signup  
- Logout  
- Session persistence  

> All **UI and logic** must be imported from the `features` directory—nothing directly coded in `app/`.

###  `features/`
This folder contains all the features of the app such as security alerts, reports, device health, etc. To make sure the feature related code is as modular as possible, we add the code that will only be used in the feature under \_shared and the code that will be used in multiple features under shared.

#### Rules
- One folder per domain (e.g., `auth`, `device-health`, `report`, `security-alerts`)
- **_shared/** folder (inside feature)
  - A folder for shared feature code. This folder contains code that is only used for the feature under which it is placed.For example, if we have a feature called settings, then `_shared` folder will contain the modules that will only be used in the settings feature.
  - Not global, not imported by other features

> Screens import UI **only from features**, never from `shared`.



### `shared/`
Contains **global, reusable code** used across multiple features.For example, we can have a buttons component or a Auth context or some commonly used hooks and helper functions.

#### Structure

##### `components/`
- `core/` → Foundation UI (e.g., Divider, Loader, Form elements)
- `domain/` → Domain-specific reusable UI
  - `_shared/components` → Used only within domain component
  - `_shared/utils` → Domain-level helper utilities

##### `hooks/`
- Reusable **global hooks**.

##### `contexts/`
- Global **React Context Providers** (e.g., session, user state, OTA updates).

##### `stores/`
- Global **state management** shared across screens.

##### `types/`
- Global **TypeScript models & types**.



### `app.config.js`
- Expo **project-wide settings**  
- Platform-specific configuration  
- Expo plugins  
- OTA update settings  



### `eas.json`
- Defines **build types** (development, testing, production)
- Used for:
  - Final build generation  
  - Internal testing via development builds  

## Summary Diagram

app/
 ├── _layout.tsx  ← Global providers + routing
 ├── (auth)/_layout.tsx
 └── (protected)/
      ├── _layout.tsx
      └── (tabs)/_layout.tsx

features/
 └── <feature>/
      ├── UI + logic
      └── _shared/

shared/
 ├── components/
 │    ├── core/
 │    └── domain/
 │         └── _shared/
 ├── hooks/
 ├── contexts/
 ├── stores/
 └── types/

app.config.js  ← Expo settings
eas.json       ← EAS build types


