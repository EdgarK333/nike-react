import React from 'react';

const Cart = ({ cartItems, onClose, onRemoveItem }) => {
  return (
    <div className="cart">
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
            </div>
            <button onClick={() => onRemoveItem(item.id)}></button>{' '}
           
          </div>
        ))}
      </div>
      <button className="close-button" onClick={onClose}></button>
    </div>
  );
};

export default Cart;
