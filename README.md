# EventExplorer

EventExplorer is a mobile application built with Expo and React Native that allows users to browse, search, and mark interest in events.

The app features a dynamic event list, interest tracking, theme switching, and smooth navigation between screens.


## Installation Guide

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

With your phone connected to the same Wi-Fi network, scan the QR code displayed by the Expo server to launch the app.

## Features

- **Event Listing:**  
  Browse through a list of upcoming events with images and metadata.
- **Search Functionality**  
  Filter events by name or location using a search input.
- **Interest Tracking:**  
  Mark events as "interested" and revisit them in a dedicated screen.
- **Native Navigation**
  Managed via @react-navigation/native-stack for smooth transitions.
- **Dark/Light Theme Toggle:**  
  Theme switching via a header toggle using Zustand state management.
- **State Management:**  
  Zustand is used for managing theme and event state.
- **Responsive Design:**
  UI is designed to work consistently across both Android and iOS devices.

## Future Enhancements:
If more time were available, the following improvements could be implemented:

- Splashscreen: The documentation says it should work better with a production build but I didn't have time to test it
- User Authentication: Implement a login process to verify users and manage their data.
- Persistent User Data: Integrate AsyncStorage to save test results and user preferences across app sessions.
- Backend Integration: Develop and integrate a robust backend API to dynamically fetch consultation questions and update product recommendations in real time.
- Enhanced Error Handling: Improve error handling for API calls and user interactions, including support for offline scenarios and retry mechanisms.
- UI/UX Refinements: Polish the user interface with advanced animations, transitions, and a modern design to enhance the overall experience.
- Localization: Implement multi-language support to broaden the app's accessibility to international users.
- Analytics Integration: Add analytics to track user behavior and engagement, which can help in continuously refining the consultation process.
- Testing: Implement basic unit tests and end-to-end tests to ensure the app functions correctly.

## License

[MIT](https://choosealicense.com/licenses/mit/)

