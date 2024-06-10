

import './App.css'
import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";
import ProductsComponent from "./components/ProductsComponent.jsx";
import LayoutComponent from "./components/LayoutComponent.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import Navbar from "./components/NavbarComponent.jsx";
import ProductFormComponent from "./components/ProductFormComponent.jsx";
import CartComponent from "./components/CartComponent.jsx";
import {Toaster} from 'react-hot-toast';
import OrderFormComponent from "./components/OrderFormComponent.jsx";

const App = () => {
    return (
            <BrowserRouter>
                <Toaster></Toaster>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<ProductsComponent />} />
                    <Route path="/items" element={<ProductsComponent />} />
                    <Route path="/cart" element={<CartComponent />} />
                    <Route path="/add-product" element={<ProductFormComponent />} />
                    <Route path="/edit-product/:id" element={<ProductFormComponent />} />
                    <Route path="/newOrder" element={<OrderFormComponent />} />
                    <Route path="/login" element={<LoginComponent />} />
                </Routes>
            </BrowserRouter>
    );
};

export default App;
