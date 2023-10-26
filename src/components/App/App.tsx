import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Home from "../../pages/Home";
import Layout from "../Layout/Layout";

const Portfolio = lazy(() => import("../../pages/Portfolio/Portfolio"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="/portfolio"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Portfolio />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
