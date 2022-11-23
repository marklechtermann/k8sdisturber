import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

import Home from "./pages/Home";
import Memory from "./pages/Memory";
import Health from "./pages/Health";
import HeavyLoad from "./pages/HeavyLoad";
import Database from "./pages/Database";
import LayoutContainer from "./layouts/LayoutContainer";
import Environment from "./pages/Environment";

const queryClient = new QueryClient()

function App() {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {" "}
        <BrowserRouter>
          <LayoutContainer>
            <Routes>
              <Route path="/" element={<Home></Home>} />
              <Route path="/home" element={<Home></Home>} />
              <Route path="/environment" element={<Environment></Environment>} />
              <Route path="/memory" element={<Memory />} />
              <Route path="/health" element={<Health />} />
              <Route path="/heavyload" element={<HeavyLoad />} />
              <Route path="/database" element={<Database />} />
            </Routes>
          </LayoutContainer>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
