// shared layout
import { Outlet } from 'react-router-dom';
import "../src/pages/BasicLayout.css"

function App() {
  return (
    <div className="app-layout">
      <header className="header">Travel Planner</header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        &copy; 2025 Travel Planner. All rights reserved.
      </footer>

    </div>
  );
}

export default App