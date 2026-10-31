import { useEffect, useState } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import '../styles/product_listing.css'
import ProductFilters from "../components/ProductFilters.jsx";
import { categoryGroups } from "../data/categoryGroups";
import { useCart } from "../context/CartContext";

function Product_Listing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart, stockChanges } = useCart();
  const [searchParams] = useSearchParams();

  const selectedCategoryParam = searchParams.get('category');
  const [selectedCategories, setSelectedCategories] = useState(
    selectedCategoryParam ? [selectedCategoryParam] : ["Electronics"]
  );
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    if (selectedCategoryParam) {
      setSelectedCategories([selectedCategoryParam]);
    }
  }, [selectedCategoryParam]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=0");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) =>
        categoryGroups[category]?.includes(product.category)
      );

    const matchesMinPrice =
      priceRange.min === "" || product.price >= Number(priceRange.min);

    const matchesMaxPrice =
      priceRange.max === "" || product.price <= Number(priceRange.max);

    const matchesRating = product.rating >= selectedRating;

    return (
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesRating
    );
  });

  return (
    <div className="product-page">
      <h1>Shop Products</h1>

      <div className="product-layout">
        <ProductFilters
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />

        <section className="product-section">
          <h2>Products</h2>
          <p>Products found: {filteredProducts.length}</p>

          <div className="product-grid">
            {filteredProducts.map((product) => {
              const availableStock = stockChanges[product.id] ?? product.stock;

              return (
                <article className="product-card" key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <img src={product.thumbnail} alt={product.title} />
                  </Link>

                  <div className="product-card-body">
                    <h3>{product.title}</h3>
                    <p className="price-tag">${product.price}</p>
                    <p className="stock-tag">
                      {availableStock > 0
                        ? `In Stock: ${availableStock}`
                        : 'Out of Stock'}
                    </p>

                    <div className="card-actions">
                      <Link to={`/products/${product.id}`} className="secondary-button small-button">
                        View details
                      </Link>
                      <button
                        type="button"
                        className="primary-button small-button"
                        onClick={() => addToCart(product)}
                        disabled={availableStock <= 0}
                      >
                        {availableStock <= 0 ? 'Out of Stock' : 'Add to cart'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Product_Listing;