import React from 'react';


const Main = ({ sortedAndFilteredProducts, addToCart }) => {
  return (
    <body>
    <main>
      <div className="product-list">
        {sortedAndFilteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.title} />
            <div>
              <h3>{product.title}</h3>
              <p>{product.category}</p>
              <p>Price: ${product.price}</p>
              <button onClick={() => addToCart(product)}>
                <img src="/images/Add-cart.png" alt="Add to cart"></img>
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
    </body>
  );
};

export default Main;
