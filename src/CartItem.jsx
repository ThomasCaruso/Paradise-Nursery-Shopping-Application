import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalCost = (item) => item.price * item.quantity;
  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + calculateTotalCost(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleCheckout = () => {
    window.alert('Checkout is Coming Soon!');
  };

  return (
    <main className="cart-page">
      <section className="cart-header">
        <div>
          <p className="cart-kicker">Shopping cart</p>
          <h1>Your selected plants</h1>
        </div>
        <div className="cart-total-card">
          <span>Total Cart Amount</span>
          <strong>${calculateTotalAmount().toFixed(2)}</strong>
        </div>
      </section>

      {cart.length === 0 ? (
        <section className="empty-cart">
          <span aria-hidden="true">🪴</span>
          <h2>Your cart is empty.</h2>
          <p>Add a plant from the catalog to start your order.</p>
          <button type="button" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </section>
      ) : (
        <>
          <section className="cart-list" aria-label="Cart items">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-details">
                  <div className="cart-item-heading">
                    <div>
                      <h2>{item.name}</h2>
                      <p>Unit price: ${item.price.toFixed(2)}</p>
                    </div>
                    <strong>${calculateTotalCost(item).toFixed(2)}</strong>
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        disabled={item.quantity <= 1}
                        onClick={() => handleDecrement(item)}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => handleIncrement(item)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="delete-button"
                      type="button"
                      onClick={() => handleRemove(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="cart-summary">
            <div>
              <span>Order total</span>
              <strong>${calculateTotalAmount().toFixed(2)}</strong>
            </div>
            <div className="cart-summary-actions">
              <button
                className="continue-shopping-button"
                type="button"
                onClick={onContinueShopping}
              >
                Continue Shopping
              </button>
              <button
                className="checkout-button"
                type="button"
                onClick={handleCheckout}
              >
                Checkout — Coming Soon
              </button>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default CartItem;
