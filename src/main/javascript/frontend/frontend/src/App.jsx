

import './App.css'
import {Route, BrowserRouter, Routes} from "react-router-dom";
import ProductsComponent from "./components/ProductsComponent.jsx";
import LayoutComponent from "./components/LayoutComponent.jsx";
import LoginComponent from "./components/LoginComponent.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <LayoutComponent/>
                <Routes>
                    <Route path="/" element={<ProductsComponent />} />
                    <Route path="/login" element={<LoginComponent />} />
                </Routes>
        </BrowserRouter>
    );
};

export default App;
