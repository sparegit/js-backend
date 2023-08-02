


import React from 'react';
import './App.css';
import{BrowserRouter , Routes, Route} from "react-router-dom";

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import Register from './pages/Register';
import Customers from './pages/Customers';
import Product from './pages/Products';
import Blogs from './pages/Blogs';
import Orders from './pages/Orders';
import Addproduct from './pages/AddProduct';
function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Login/>}></Route>
        <Route path ="/register" element={<Register/>}></Route>
        <Route path ="/admin" element={<MainLayout/>}></Route>
        <Route path ="/admin/Customers" element={<Customers/>}></Route>
        <Route path ="/admin/Product-List" element={<Product/>}></Route>
        <Route path ="/admin/Blog-List" element={<Blogs/>}></Route>
        <Route path ="/admin/Orders" element={<Orders/>}></Route>
        <Route path ="/admin/Product" element={<Addproduct/>}></Route>
        {/* <Route index element ={<Dashboard/>}/> */}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
