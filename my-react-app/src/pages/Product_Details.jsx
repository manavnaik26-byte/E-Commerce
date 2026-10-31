import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Product_Details() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart, stockChanges } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);

        if (!response.ok) {
          throw new Error('Product not found');
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <main className="detail-page"><h2>Loading product...</h2></main>;
  }

  if (error || !product) {
    return (
      <main className="detail-page empty-state-page">
        <h1>Product not found</h1>
        <Link to="/products" className="primary-button">Back to products</Link>
      </main>
    );
  }

  const availableStock = stockChanges[product.id] ?? product.stock;

  return (
    <main className="detail-page">
      <Link to="/products" className="secondary-button back-link">
        ← Back to products
      </Link>

      <div className="detail-layout">
        <div className="detail-image-box">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        <div className="detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="brand-label">Brand: {product.brand}</p>
          <div className="detail-meta">
            <span>{product.rating}★</span>
            <span>{availableStock > 0 ? `${availableStock} in stock` : 'Out of stock'}</span>
          </div>

          <div className="detail-price-row">
            <strong>${product.price}</strong>
            <span>{product.discountPercentage}% off</span>
          </div>

          <p className="detail-description">{product.description}</p>

          <ul className="detail-list">
            <li>Shipping: {product.shippingInformation || 'Standard'}</li>
            <li>Return policy: {product.returnPolicy || '30 day returns'}</li>
            <li>Warranty: {product.warrantyInformation || '1 year'}</li>
          </ul>

          <div className="detail-buttons">
            <button
              type="button"
              className="primary-button"
              onClick={() => addToCart(product)}
              disabled={availableStock <= 0}
            >
              {availableStock <= 0 ? 'Out of Stock' : 'Add to cart'}
            </button>
            <Link to="/cart" className="secondary-button">Go to cart</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Product_Details;