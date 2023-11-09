import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Layout from "../Layout/Layout";
import Preloader from "../Preloader/Preloader";

const Home = lazy(() => import("../../pages/Home/Home"));
const Portfolio = lazy(() => import("../../pages/Portfolio/Portfolio"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<Preloader content={"🦙"} />}>
              <Home />
            </Suspense>
          }
        />
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
