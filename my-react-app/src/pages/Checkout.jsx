import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const emptyForm = {
  name: '',
  email: '',
  address: '',
  city: '',
  zip: '',
  card: '',
};

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  if (cart.length === 0) {
    return (
      <main className="empty-state-page">
        <h1>Checkout is empty</h1>
        <p>Your cart is empty. Add some products before checking out.</p>
        <Link to="/products" className="primary-button">Browse products</Link>
      </main>
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (Object.values(form).some((value) => value.trim() === '')) {
      setError('Please complete all checkout fields before placing your order.');
      return;
    }

    const orderId = `ORD-${Date.now()}`;
    clearCart();
    navigate('/order-confirmation', {
      state: {
        orderId,
        customerName: form.name,
        total: cartTotal,
      },
    });
  }

  return (
    <main className="checkout-page">
      <div className="page-header">
        <h1>Checkout</h1>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label>
              Full name
              <input name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" />
            </label>
          </div>

          <div className="field-group">
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" />
            </label>
          </div>

          <div className="field-group">
            <label>
              Street address
              <input name="address" value={form.address} onChange={handleChange} placeholder="123 Market Street" />
            </label>
          </div>

          <div className="field-row">
            <label>
              City
              <input name="city" value={form.city} onChange={handleChange} placeholder="New York" />
            </label>
            <label>
              ZIP code
              <input name="zip" value={form.zip} onChange={handleChange} placeholder="10001" />
            </label>
          </div>

          <div className="field-group">
            <label>
              Card number
              <input name="card" value={form.card} onChange={handleChange} placeholder="4242 4242 4242 4242" />
            </label>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="primary-button submit-button">
            Place order
          </button>
        </form>

        <aside className="summary-card">
          <h2>Order summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="summary-row">
              <span>
                {item.title} x {item.quantity}
              </span>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}

          <div className="summary-row total-row">
            <span>Total</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;