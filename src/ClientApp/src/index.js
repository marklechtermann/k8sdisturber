import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Memory from "./pages/Memory";
import Health from "./pages/Health";
import HeavyLoad from "./pages/HeavyLoad";
import Database from "./pages/Database";
import { Layout } from "./layouts/Layout";
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/home" element={<Home></Home>} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/health" element={<Health />} />
          <Route path="/heavy" element={<HeavyLoad />} />
          <Route path="/database" element={<Database />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
