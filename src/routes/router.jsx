import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import PrivateRoutes from "../utils/PrivateRoutes";
import Login from "../pages/login/Login";
import Layout from "../components/Layout";
import ManageCategory from "../pages/Category/ManageCategory";
import AddCategory from "../pages/Category/AddCategory";
import PublicRoute from "../utils/PublicRoute";
import ManageBrands from "../pages/Brands/ManageBrands";
import AddBrand from "../pages/Brands/AddBrand";
import ManageBanners from "../pages/Banners/ManageBanners";
import AddBanner from "../pages/Banners/AddBanner";
import AddProduct from "../pages/Products/AddProduct";
import ManageProducts from "../pages/Products/ManageProducts";
import Dashboard from "../pages/Dashboard";
function RouteHandler() {
  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard/>} />

            <Route path="/manage-category" element={<ManageCategory />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/edit-category/:id" element={<AddCategory />} />

            {/* BRANDS */}
            <Route path="/manage-brands" element={<ManageBrands />} />
            <Route path="/add-brand" element={<AddBrand />} />
            <Route path="/edit-brand/:id" element={<AddBrand />} />

             {/* BANNERS */}
            <Route path="/manage-banners" element={<ManageBanners />} />
            <Route path="/add-banner" element={<AddBanner />} />
            <Route path="/edit-banner/:id" element={<AddBanner />} />

            {/* PRODUCTS */}
            <Route path="/manage-products" element={<ManageProducts />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<AddProduct />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default RouteHandler;
