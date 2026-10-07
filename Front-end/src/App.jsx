// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./Pages/header";
import { Home } from "./Pages/home";
import { Login } from "./Pages/login";
import { Men } from "./Pages/men";
import { Women } from "./Pages/women";
import { Accessories } from "./Pages/accessories";
import { Fragrances } from "./Pages/fragrances";
import { SignUp } from "./Pages/signup";
import { Footer } from "./Pages/footer";
import { ProfileAndDashboard } from "./Pages/profile";
import { EditProduct } from "./Pages/editproduct";
import { EditUser } from "./Pages/editUser";
import { CreateProduct } from "./Pages/createProduct";
import { ProductInfo } from "./Pages/productinfo";
import { Cart} from "./Pages/cart";
import { Chatbot } from "./Pages/chatbot";
import toast, { Toaster } from "react-hot-toast";

function MainLayout() {
  return (
    <>
      <Toaster position="top-right" />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/fragrances" element={<Fragrances />} />
        <Route path="/profile" element={<ProfileAndDashboard />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/:id" element={<ProductInfo />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/chatbot" element={<Chatbot forceOpen={true} />} />

      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages WITHOUT Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Pages WITH Navbar */}
        <Route path="*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
