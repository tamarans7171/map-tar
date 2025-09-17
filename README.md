# Project Name

A short description of your project, what it does, and its purpose.

---

## Table of Contents

* [Project Structure](#project-structure)
* [Prerequisites](#prerequisites)
* [Getting Started](#getting-started)

  * [Server](#server)
  * [Client](#client)
  * [Running Both Together](#running-both-together)
* [Available Scripts](#available-scripts)
* [Environment Variables](#environment-variables)
* [Technologies Used](#technologies-used)
* [Contributing](#contributing)
* [License](#license)

---

## Project Structure

```
root/
│
├── server/         # .NET Core backend
│   ├── Controllers
│   ├── Models
│   ├── Services
│   └── Program.cs
│
├── client/         # React frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   └── App.js
│   └── package.json
│
└── README.md
```

---

## Prerequisites

* [.NET 6/7 SDK](https://dotnet.microsoft.com/download)
* [Node.js 18+](https://nodejs.org/)
* npm or yarn
* SQL Server / MongoDB (if applicable)

---

## Getting Started

### Server

1. Navigate to the `server` folder:

   ```bash
   cd server
   ```
2. Restore dependencies:

   ```bash
   dotnet restore
   ```
3. Run the server:

   ```bash
   dotnet run
   ```
4. The API will be available at: `https://localhost:5231` (or `http://localhost:5000`)

---

### Client

1. Navigate to the `client` folder:

   ```bash
   cd client
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm start
   ```
4. The app will open in your browser at: `http://localhost:3000`

---

### Running Both Together

To run both the client and server simultaneously, you can use a tool like [concurrently](https://www.npmjs.com/package/concurrently) in the root folder.

1. Install concurrently:

   ```bash
   npm install -g concurrently
   ```
2. In the root folder, create a script in `package.json`:

   ```json
   {
     "scripts": {
       "dev": "concurrently \"cd server && dotnet run\" \"cd client && npm start\""
     }
   }
   ```
3. Run both:

   ```bash
   npm run dev
   ```

---

## Available Scripts (Client)

* `npm start` – Runs the app in development mode
* `npm run build` – Builds the app for production
* `npm test` – Runs tests

---

## Environment Variables

You can configure your environment variables in a `.env` file for the client and server as needed:

**Server example (appsettings.json / secrets.json):**

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=MyDb;Trusted_Connection=True;"
  }
}
```

---

## Technologies Used

* **Frontend:** React, Redux, react-leaflet
* **Backend:** .NET Core, Entity Framework Core, MongoDB
* **Other:** REST APIs, Axios

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## License

Specify your license here (e.g., MIT License)
