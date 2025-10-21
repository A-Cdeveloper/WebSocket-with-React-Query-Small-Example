# WebSocket with React Query Example

A real-time application demonstrating WebSocket integration with React Query for automatic cache invalidation and UI updates.

## Features

- **Real-time Updates**: WebSocket connection for instant UI updates
- **React Query Integration**: Automatic cache invalidation when new data arrives
- **REST API**: Standard CRUD operations for people management
- **Modern Stack**: React + Vite + TypeScript + Express + WebSocket

## Project Structure

```
websocket-with-react-query-example/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks (React Query + WebSocket)
│   │   └── providers/      # Query client provider
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Express backend
│   ├── server.js          # Main server file
│   ├── data.json         # JSON database
│   └── package.json
└── README.md
```

## Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **React Query (TanStack Query)** - Server state management
- **Tailwind CSS** - Styling

### Backend

- **Node.js** - Runtime
- **Express** - Web framework
- **WebSocket (ws)** - Real-time communication
- **CORS** - Cross-origin requests

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

**Clone the repository**

**Install server dependencies**

**Install client dependencies**

### Running the Application

**Start the server**

Server will run on `http://localhost:4002`

**Start the client** (in a new terminal)

Client will run on `http://localhost:5173`

**Open your browser**  
Navigate to `http://localhost:5173`

## How It Works

### WebSocket Integration

- Client establishes WebSocket connection on component mount
- Server sends real-time updates when new people are added
- React Query automatically invalidates cache and refetches data
- UI updates instantly without manual refresh

### Data Flow

1.  User submits form to add a person
2.  POST request sent to `/api/people` endpoint
3.  Server saves data and broadcasts WebSocket message
4.  Client receives WebSocket message
5.  React Query invalidates cache and refetches data
6.  UI automatically updates with new person

### Key Components

- `**usePeopleSocket**`: WebSocket hook for real-time updates
- `**usePeople**`: React Query hook for fetching people data
- `**useAddPeople**`: React Query mutation for adding people
- `**People**`: Main component displaying list and form

## API Endpoints

- `GET /api/people` - Fetch all people
- `POST /api/people` - Add new person
- `DELETE /api/people/:id` - Delete person by ID

## WebSocket Events

- `new-person` - Broadcasted when a new person is added
- `person-deleted` - Broadcasted when a person is deleted

## Development Notes

- Server uses `node server.js` (not nodemon) to maintain stable WebSocket connections
- Data is persisted in `server/data.json`
- CORS is enabled for development
- TypeScript types are defined for all data structures

## Contributing

1.  Fork the repository
2.  Create a feature branch
3.  Make your changes
4.  Test thoroughly
5.  Submit a pull request

## License

MIT License - feel free to use this code for learning and projects.

```
cd client
npm run dev
```

```
cd server
node server.js
```

```
cd ../client
npm install
```

```
cd server
npm install
```

```
git clone <your-repo-url>
cd websocket-with-react-query-example
```
