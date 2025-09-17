# Geo Map Manager Server

This is the server-side component of the Geo Map Manager application, built using ASP.NET Core and MongoDB. The server provides a RESTful API for managing geographic objects on an interactive map.

## Project Structure

- **Controllers**: Contains the API controllers that handle HTTP requests.
  - `GeoObjectsController.cs`: Manages geographic objects (Create, Read, Delete).
  
- **Models**: Defines the data structures used in the application.
  - `GeoObject.cs`: Represents the structure of geographic objects stored in MongoDB.
  
- **Services**: Contains services for database interactions.
  - `MongoService.cs`: Handles CRUD operations with MongoDB.
  
- **Program.cs**: The entry point of the application, configuring and running the web server.
  
- **Startup.cs**: Configures services and the request pipeline for the application.
  
- **appsettings.json**: Configuration settings, including MongoDB connection strings.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd geo-map-manager/server
   ```

2. **Install dependencies**:
   Ensure you have the .NET SDK installed. Run the following command to restore the necessary packages:
   ```
   dotnet restore
   ```

3. **Configure MongoDB**:
   Update the `appsettings.json` file with your MongoDB connection string.

4. **Run the application**:
   Start the server using:
   ```
   dotnet run
   ```

5. **API Documentation**:
   The API endpoints can be accessed at `http://localhost:<port>/api/geoobjects`. Refer to the `GeoObjectsController.cs` for detailed endpoint information.

## Usage

The server provides endpoints for managing geographic objects, which can be consumed by the client-side application. Ensure the client is configured to point to the correct server URL.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.