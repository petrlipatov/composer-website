import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Home from "../../pages/Home/Home";
import Layout from "../Layout/Layout";
import Preloader from "../Preloader/Preloader";

const Portfolio = lazy(() => import("../../pages/Portfolio/Portfolio"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="/portfolio"
          element={
            <Suspense fallback={<Preloader content={"🦙"} />}>
              <Portfolio />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
