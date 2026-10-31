import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Cart() {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart()

  if (cart.length === 0) {
    return (
      <main className="empty-state-page">
        <h1>Your cart is empty</h1>
        <p>Add items from the catalog to begin shopping.</p>
        <Link to="/products" className="primary-button">Continue shopping</Link>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <div className="page-header">
        <h1>Your cart</h1>
      </div>

      <div className="cart-layout">
        <section className="cart-items">
          {cart.map((item) => (
            <article key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.title} />

              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>${item.price.toFixed(2)}</p>

                <div className="quantity-controls">
                  <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </div>

              <button type="button" className="remove-button" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </article>
          ))}
        </section>

        <aside className="summary-card">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>Free</strong>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
          <Link to="/checkout" className="primary-button checkout-button">
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </main>
  )
}

export default Cart