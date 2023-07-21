import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import ProductList from './components/ProductList';


function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <Router>
      <Routes>
      
      <Route path="/" element={<ProductList cartItems={cartItems} setCartItems={setCartItems} />} />
        
      </Routes>
    </Router>
  );
}

export default App;
