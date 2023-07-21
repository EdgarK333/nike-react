import React from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart';

const Header = ({
  searchQuery,
  handleSearchInputChange,
  isCartOpen,
  handleCloseCart,
  cartItems,
  handleOpenModal,
  calculateTotalQuantity,
  removeFromCart,
  isModalOpen,
  handleCloseModal,
  calculateTotalPrice,
}) => {
  return (
    <header>
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src="/images/nike.png" alt="My Logo" className="logo" />
        </Link>
      </div>
      <nav className="nav-container">
        <Link to="/" className="nav-link">
          New & Featured
        </Link>
        <Link to="/" className="nav-link">
          Men
        </Link>
        <Link to="/" className="nav-link">
          Woman
        </Link>
        <Link to="/" className="nav-link">
          Kids
        </Link>
        <Link to="/" className="nav-link">
          Accessories
        </Link>
        <Link to="/" className="nav-link">
          Sale
        </Link>
      </nav>
      <div className="search-cart-container">
        <div className="search-box">
          <div className="search-icon">
            <img src="/images/search-icon.jpg" alt="Search Icon" />
          </div>
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className={`cart-container ${isCartOpen ? 'open' : ''}`}>
          <Cart cartItems={cartItems} onClose={handleCloseCart} onRemoveItem={removeFromCart} />
        </div>
        <img className="cart-toggle-image" src="images/Cart.svg" onClick={handleOpenModal} />

        {calculateTotalQuantity() > 0 && (
          <div className="cart-quantity">{calculateTotalQuantity()}</div>
        )}
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close-button" onClick={handleCloseModal}>
              <span className="modal-close-icon"></span>
            </button>
            <h2>Your Cart</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                  <img src="images/Remove-cart.svg" alt="Remove" />
                </button>
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
            <div className="cart-total">Total: ${calculateTotalPrice()}</div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
