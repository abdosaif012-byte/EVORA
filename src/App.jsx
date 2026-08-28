// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./Pages/header";
import { Home } from "./Pages/home";
import { Login } from "./Pages/login";
import { Men } from "./Pages/men";
import { Women } from "./Pages/women";
import { Accessories} from "./Pages/accessories";
import { Fragrances } from "./Pages/fragrances";

function MainLayout() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/fragrances" element={<Fragrances />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages WITHOUT Navbar */}
        <Route path="/login" element={<Login />} />

        {/* Pages WITH Navbar */}
        <Route path="*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;