import { Link } from 'react-router-dom'
import { categoryGroups } from '../data/categoryGroups'

const featuredCategories = Object.keys(categoryGroups)

function Home() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Fresh arrivals</p>
          <h1>Shop smarter, live better.</h1>
          <p>
            Discover quality essentials across electronics, fashion, beauty,
            home, and more—all in one place.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="primary-button">Shop now</Link>
            <Link to="/cart" className="secondary-button">View cart</Link>
          </div>
        </div>
        <div className="hero-visual">
          <Link to="/products" className="promo-card large">
            <span>Up to 40% off</span>
            <strong>Seasonal picks</strong>
          </Link>
          <Link to="/products" className="promo-card small">
            <span>Free shipping</span>
            <strong>Orders over $75</strong>
          </Link>
        </div>
      </section>

      <section className="category-showcase">
        <div className="section-heading">
          <h2>Browse categories</h2>
        </div>

        <div className="category-grid">
          {featuredCategories.map((category) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className="category-item"
            >
              <h3>{category}</h3>
              <p>{categoryGroups[category].length} curated products</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="feature-strip">
        <div>
          <strong>24/7</strong>
          <span>Customer support</span>
        </div>
        <div>
          <strong>100%</strong>
          <span>Secure checkout</span>
        </div>
        <div>
          <strong>2-day</strong>
          <span>Fast delivery</span>
        </div>
      </section>
    </main>
  )
}

export default Home