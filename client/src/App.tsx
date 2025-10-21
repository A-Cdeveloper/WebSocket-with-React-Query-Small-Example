import People from "./components/People";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Websockets App</h1>
      <div className="mt-8">
        <People />
      </div>
    </div>
  );
}

export default App;
