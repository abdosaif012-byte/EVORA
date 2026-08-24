import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./Pages/header";
import { Home } from "./Pages/home";
import { Login } from "./Pages/login";

function MainLayout() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
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