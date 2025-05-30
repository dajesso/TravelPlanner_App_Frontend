// shared layout
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <header>
        <h1>Travel Planner</h1>
      </header>
      <main>
        <Outlet /> {/* This will render the child route component */}
      </main>
    </div>
  )
};

export default App