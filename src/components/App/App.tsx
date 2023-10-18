import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Layout from "../Layout/Layout";
import Portfolio from "../../pages/Portfolio/Portfolio";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Route>
    </Routes>
  );
}

export default App;
