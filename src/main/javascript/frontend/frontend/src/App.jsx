

import './App.css'
import {Route, BrowserRouter, Routes} from "react-router-dom";
import ProductsComponent from "./components/ProductsComponent.jsx";
import LayoutComponent from "./components/LayoutComponent.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import Navbar from "./components/NavbarComponent.jsx";
import ProductFormComponent from "./components/ProductFormComponent.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar/>
                <Routes>
                    <Route path="/" element={<ProductsComponent />} />
                    <Route path="/items" element={<ProductsComponent />} />
                    <Route path="/add-product" element={<ProductFormComponent />} />
                    <Route path="/edit-product/:id" element={<ProductFormComponent />} />
                    <Route path="/login" element={<LoginComponent />} />
                </Routes>
        </BrowserRouter>
    );
};

export default App;
