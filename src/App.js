import { BrowserRouter, Routes, Route } from "react-router-dom";
import Country from "./pages/Country/Country";
import Destinations from "./pages/Destinations/Destinations";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:country" element={<Country />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
