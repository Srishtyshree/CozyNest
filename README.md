# Cozynest Urni Decor

Cozynest Urni Decor is a beautiful, full-featured React Native application built with Expo. It serves as a comprehensive e-commerce platform for home decor and furniture, providing users with a seamless shopping experience from product discovery to checkout.

## 📱 Features

- **Authentication Flow**: Smooth onboarding with Splash, Welcome, Login, and Signup screens.
- **Product Discovery**: Browse products through the Home, Explore, and Search screens.
- **Product Details**: View detailed information about specific items in the Product Detail screen.
- **Shopping Cart & Checkout**: Add items to the cart and securely proceed through the Checkout screen.
- **User Profile & Orders**: Manage user settings, view favorite items, and track past orders.
- **Responsive Design**: Adapts beautifully across different mobile device sizes.

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/)
- **Navigation**: [React Navigation](https://reactnavigation.org/) (Native Stack & Bottom Tabs)
- **Local Storage**: `@react-native-async-storage/async-storage`
- **UI Elements**: `react-native-svg`, `expo-linear-gradient`, `react-native-vector-icons`

## 📂 Project Structure

```text
src/
├── assets/         # Images, fonts, and other static assets
├── components/     # Reusable UI components
├── context/        # React Context for global state management
├── data/           # Mock data or data models
├── navigation/     # Navigation setup and routers
├── screens/        # App screens (Home, Cart, Profile, etc.)
├── services/       # API clients and external services
├── styles/         # Global styles and theme definitions
└── utils/          # Utility and helper functions
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [Expo Go](https://expo.dev/client) app installed on your iOS or Android device (for physical device testing)

### Installation

1. Navigate to the project directory:
   ```bash
   cd path/to/cozynest
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npm start
   ```

4. Open the app:
   - Press `a` to open on an Android emulator.
   - Press `i` to open on an iOS simulator.
   - Scan the QR code shown in the terminal with your device's camera (iOS) or the Expo Go app (Android).

## 📄 License

This project is proprietary and confidential. All rights reserved.
