import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from './Header';
import Main from './Main';
import Sort from './Sort';
import '../Styles/Header.css';
import '../Styles/Sort.css';
import '../Styles/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(null);
  const sortArrowRef = useRef();
  const sortOptionsRef = useRef();

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const addToCart = (product) => {
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const existingCartItem = cartItems.find((item) => item.id === productId);

    if (existingCartItem) {
      if (existingCartItem.quantity > 1) {
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
          ),
        );
      } else {
        setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== productId));
      }
    }
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return totalPrice.toFixed(2);
  };

  const calculateTotalQuantity = () => {
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    return totalQuantity;
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSortType('');
  };

  const categories = Array.from(new Set(products.map((product) => product.category)));

  const sortedAndFilteredProducts = products
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === '' || product.category === selectedCategory),
    )
    .sort((a, b) => {
      if (sortType === 'asc') return a.price - b.price;
      if (sortType === 'desc') return b.price - a.price;
      if (sortType === 'name-asc') return a.title.localeCompare(b.title);
      if (sortType === 'name-desc') return b.title.localeCompare(a.title);
      return 0;
    });

  const handleToggleSortOptions = () => {
    setIsSortOpen((prevIsSortOpen) => !prevIsSortOpen);
  };

  const handleSortOptionClick = (sortType) => {
    setSelectedSort(sortType);
    setIsSortOpen(false);
    setSortType(sortType);
  };

  const handleOutsideClick = (e) => {
    if (sortOptionsRef.current && !sortOptionsRef.current.contains(e.target)) {
      setIsSortOpen(false);
    }
  };

  useEffect(() => {
    if (sortArrowRef.current) {
      sortArrowRef.current.classList.toggle('sort-arrow-up', isSortOpen);
    }
  }, [isSortOpen]);

  useEffect(() => {
    if (isSortOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isSortOpen]);

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        handleSearchInputChange={handleSearchInputChange}
        isCartOpen={isCartOpen}
        handleCloseCart={handleCloseCart}
        cartItems={cartItems}
        handleOpenModal={handleOpenModal}
        calculateTotalQuantity={calculateTotalQuantity}
        removeFromCart={removeFromCart}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        calculateTotalPrice={calculateTotalPrice}
      />

      <Sort
        selectedCategory={selectedCategory}
        categories={categories}
        handleCategoryChange={handleCategoryChange}
        handleToggleSortOptions={handleToggleSortOptions}
        isSortOpen={isSortOpen}
        sortArrowRef={sortArrowRef}
        handleSortOptionClick={handleSortOptionClick}
      />

      <Main
        selectedCategory={selectedCategory}
        categories={categories}
        handleCategoryChange={handleCategoryChange}
        sortArrowRef={sortArrowRef}
        sortOptionsRef={sortOptionsRef}
        isSortOpen={isSortOpen}
        handleToggleSortOptions={handleToggleSortOptions}
        handleSortOptionClick={handleSortOptionClick}
        handleOutsideClick={handleOutsideClick}
        sortedAndFilteredProducts={sortedAndFilteredProducts}
        addToCart={addToCart}
      />
    </div>
  );
};

export default ProductList;
