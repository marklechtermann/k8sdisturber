import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Memory from "./pages/Memory";
import Health from "./pages/Health";
import HeavyLoad from "./pages/HeavyLoad";
import Database from "./pages/Database";
import Dashboard from "./layouts/Dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {" "}
      <BrowserRouter>
        <Dashboard>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/home" element={<Home></Home>} />
            <Route path="/memory" element={<Memory />} />
            <Route path="/health" element={<Health />} />
            <Route path="/heavy" element={<HeavyLoad />} />
            <Route path="/database" element={<Database />} />
          </Routes>
        </Dashboard>
      </BrowserRouter>
    </div>
  );
}

export default App;
