# Event Explorer

EventExplorer is a mobile application built with Expo and React Native that allows users to browse, search, and mark interest in events.

The app features a dynamic event list, interest tracking, theme switching, and smooth navigation between screens.

![alt text](https://github.com/ccrash/EventExplorer/tree/main/assets/screen_0.png?raw=true)
![alt text](https://github.com/ccrash/EventExplorer/tree/main/assets/screen_1.png?raw=true)
![alt text](https://github.com/ccrash/EventExplorer/tree/main/assets/screen_2.png?raw=true)
![alt text](https://github.com/ccrash/EventExplorer/tree/main/assets/screen_3.png?raw=true)

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

Scan the QR code displayed in the terminal or browser with Expo Go to launch the app.

## Features

- **Fully Typed with TypeScript:**  
  All components, hooks, and utilities are written in strict TypeScript for improved safety and developer experience.
- **Event Listing:**  
  Browse through a list of upcoming events with images and metadata.
- **Search Functionality**  
  Quickly filter events by name or location using a responsive search input.
- **Interest Tracking:**  
  Mark interesting events and revisit them in a dedicated screen.
- **Native Navigation:**
  Smooth and performant screen transitions powered by @react-navigation/native-stack.
- **Dark/Light Theme Toggle:**  
  Theme switching via a header toggle using Zustand state management.
- **State Management:**  
  Zustand is used for managing theme and event state.
- **Offline Capability:**
  Event data is cached locally to support offline usage.
- **Mocked API Simulation:**
  Data is loaded from a local JSON file with artificial latency to simulate network conditions.
- **Cross-Platform Responsive UI:**
  Polished, consistent design that works seamlessly on both Android and iOS.

## Development Considerations:

This project was completed in approximately 10 hours, with a focus on adhering to the requirements, ensuring clean architecture, quality code, test coverage, and strong separation of concerns.

### Potential Improvements with More Time

- Splash Screen & Icons: A polished first impression is crucial. Custom splash screens and adaptive icons would enhance professionalism.
- UI/UX Refinements: Further visual polish with smoother transitions, micro-interactions, and layout improvements.
- Localization: Add multi-language support to improve accessibility and usability for international users.

## Known Bugs

- On Android, the header may not show the "Interested" icon. This may be related to [Expo SDK 53](https://github.com/expo/expo/issues/36793). Downgrade/Upgrade testing pending.
