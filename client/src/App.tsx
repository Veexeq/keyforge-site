import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import GalleryPage from "./pages/GalleryPage";
import NotFoundPage from "./pages/NotFoundPage";
import ScrollToTop from "./components/shared/ScrollToTop";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import AdminProductCreatePage from "./pages/AdminProductCreatePage";
import AdminProductEditPage from "./pages/AdminProductEditPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminProductsPage from "./pages/AdminProductsPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin/products/:id" element={<AdminProductDetailsPage />} />
        <Route path="/admin/products/new" element={<AdminProductCreatePage />} />
        <Route path="/admin/products/:id/edit" element={<AdminProductEditPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
      </Routes>
    </>
  );
}