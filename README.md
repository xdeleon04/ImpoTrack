# ImpoTrack

ImpoTrack is a web application built with ASP.NET and React. It provides an interface for managing and tracking contributors and fiscal receipts.

## Features

- List of tax contributors
- List of fiscal receipts
- Detailed view of each tax contributor and their associated fiscal receipts

## Technologies

- Backend: ASP.NET
- Frontend: React
- Database: MySQL
- Testing: xUnit for .NET and Vitest for React

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- .NET 8.0 SDK or later
- Node.js LTS
- A MySQL server
- Docker (optional)

### Installation

1.  Clone the repository

```bash
git clone https://github.com/xdeleon04/impotrack.git
```

2.  Navigate to the project directory

```bash
    cd impotrack
```

3.  Restore the .NET packages

```bash
    dotnet restore
```

4.  Install the Node.js dependencies

```bash
    cd client && npm install
```

### Configuration

The application requires a connection string to a MySQL database. This can be provided in one of the following ways:

- In the `secrets.json` file (recommended for development)
- As an environment variable
- With a secrets provider of your choice

For development, you can set the connection string in the `secrets.json` file as follows:

1.  Right-click on the `ImpoTrack.Server` project in Visual Studio
    
2.  Select `Manage User Secrets`
    
3.  Add the connection string in the following format:
    

```JSON
    {
        "ConnectionStrings:DefaultConnection":
            "Server=myServerAddress;Database=myDataBase;Uid=myUsername;Pwd=myPassword;"
    }
```

Replace `myServerAddress`, `myDataBase`, `myUsername`, and `myPassword` with your MySQL server address, database name, username, and password, respectively.

### Running the Application

You can run the application using the .NET CLI with the following command in the root directory:

```bash
dotnet run --project ImpoTrack.Server
```

The application will be accessible at `https://localhost:5001`.

Or, if you prefer to use Docker:

```bash
docker build -t impotrack .
docker run -p 8000:80 impotrack
```

Then, navigate to `http://localhost:8000` in your web browser.

## Testing

Unit tests can be run using the .NET CLI and Vitest with the following command:

`dotnet test`  
`npx vitest run`

## Built With

- [ASP.NET](https://dotnet.microsoft.com/apps/aspnet) - The web framework used
- [React](https://reactjs.org/) - The frontend library used

### License

This project is licensed under the MIT License - see the LICENSE.md file for details.
