# Geo Map Manager Client

This project is a client-side application built with React for managing geographic objects on an interactive map. It allows users to create, read, update, and delete geographic objects, such as polygons and points, using a user-friendly interface.

## Getting Started

To get started with the client application, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd geo-map-manager/client
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then, run the following command to install the required dependencies:
   ```bash
   npm install
   ```

3. **Run the Application**
   Start the development server with:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

## Project Structure

- **public/index.html**: The main HTML file for the React application.
- **src/App.tsx**: The root component that sets up the layout of the application.
- **src/components/Map.tsx**: The component that integrates the map library for displaying the interactive map.
- **src/services/api.ts**: Functions for making API calls to the server.
- **src/types/index.ts**: TypeScript interfaces for defining data structures used in the application.

## Features

- Interactive map for visualizing geographic objects.
- Ability to draw polygons and place objects on the map.
- CRUD operations for managing geographic objects through a RESTful API.

## Technologies Used

- React
- TypeScript
- CSS
- Map library (e.g., Leaflet or MapLibre)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you would like to add.

## License

This project is licensed under the MIT License. See the LICENSE file for details.