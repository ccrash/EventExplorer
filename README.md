# Event Explorer

EventExplorer is a mobile application built with Expo and React Native that allows users to browse, search, and mark interest in events.

The app features a dynamic event list, interest tracking, theme switching, and smooth navigation between screens.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/client) app on iOS or Android

### Steps

**Install dependecies:**
  ```bash
  yarn install
  ```
**Run the project locally**
  ```bash
  yarn start
  ```
**Download the Expo Go app**

Available on both the iOS App Store and Google Play Store.

**Scan the QR code**

With your phone connected to the same Wi-Fi network, scan the QR code displayed in the terminal or browser with Expo Go to launch the app.

## Features

- **Event Listing:**  
  Browse through a list of upcoming events with images and metadata.
- **Search Functionality**  
  Filter events by name or location using a search input.
- **Interest Tracking:**  
  Mark interested events and revisit them in a dedicated screen.
- **Native Navigation:**
  Managed via @react-navigation/native-stack for smooth transitions.
- **Dark/Light Theme Toggle:**  
  Theme switching via a header toggle using Zustand state management.
- **State Management:**  
  Zustand is used for managing theme and event state.
- **Responsive Design:**
  UI is designed to work consistently across both Android and iOS devices.

## Development Considerations:
This project was completed in approximately 10 hours, with a focus on adhering to the requirements, ensuring clean architecture, quality code, test coverage, and strong separation of concerns.

### Potential Improvements with More Time

- Splash Screen & Icons: A polished first impression is crucial. Custom splash screens and adaptive icons would enhance professionalism.
- UI/UX Refinements: Further visual polish with smoother transitions, micro-interactions, and layout improvements.
- Localization: Add multi-language support to improve accessibility and usability for international users.

## Known Bugs
- On Android, the header may not show the "Interested" icon. This may be related to [Expo SDK 53](https://github.com/expo/expo/issues/36793). Downgrade testing pending.


