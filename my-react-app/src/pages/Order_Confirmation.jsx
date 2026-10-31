import { Link, useLocation } from 'react-router-dom';

function Order_Confirmation() {
  const location = useLocation();
  const { orderId, customerName, total } = location.state || {};

  return (
    <main className="confirmation-page">
      <div className="confirmation-card">
        <p className="eyebrow success">Order confirmed</p>
        <h1>Thank you, {customerName || 'shopper'}!</h1>
        <p>
          Your order <strong>{orderId || 'ORD-0000'}</strong> has been placed successfully.
        </p>
        <p>
          Total paid: <strong>${Number(total || 0).toFixed(2)}</strong>
        </p>
        <Link to="/products" className="primary-button">
          Continue shopping
        </Link>
      </div>
    </main>
  );
}

export default Order_Confirmation;