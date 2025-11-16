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

- **app**
  This is the main folder for the app. It contains the logic for the navigation and the layout of the app. This folder should not have any UI components. All features should be placed in the features folder.
- **features**
  This folder contains all the features of the app such as security alerts, reports, device health, etc. To make sure the feature related code is as modular as possible, we add the code that will only be used in the feature under \_shared and the code that will be used in multiple features under shared.
  - **\_shared**
    A folder for shared feature code. This folder contains code that is only used for the feature under which it is placed.For example, if we have a feature called settings, then `_shared` folder will contain the modules that will only be used in the settings feature.
- shared
  This folder contains code that is used in multiple features or across the app. For example, we can have a buttons component or a Auth context or some commonly used hooks and helper functions.
