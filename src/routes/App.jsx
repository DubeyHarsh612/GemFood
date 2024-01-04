import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import "bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "../Components/ContextReducer";
function App() {
  return (
    <CartProvider>
      <Navbar />

      <Outlet />
      <Footer />
    </CartProvider>
  );
}

export default App;
