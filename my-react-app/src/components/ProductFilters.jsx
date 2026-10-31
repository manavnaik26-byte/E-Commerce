import { categoryGroups } from "../data/categoryGroups";

function ProductFilters({ selectedCategories, setSelectedCategories, priceRange,
    setPriceRange, selectedRating,
    setSelectedRating, }) {

    function handleCategoryChange(category) {
        setSelectedCategories((previous) => {
            if (previous.includes(category)) {
                return previous.filter((item) => item !== category);
            }

            return [...previous, category];
        });
    }

    return (
        <aside className="category-sidebar">
            <h2>Filter Products</h2>

            <details open>
                <summary>Categories</summary>

                {Object.keys(categoryGroups).map((category) => (
                    <label key={category} className="filter-option">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                        />

                        {category}
                    </label>
                ))}
            </details>
            <details>
                <summary>Price Range</summary>

                <div className="price-filter">
                    <label>
                        Minimum Price ($)
                        <input
                            type="number"
                            min="0"
                            placeholder="Min"
                            value={priceRange.min}
                            onChange={(event) =>
                                setPriceRange((previous) => ({
                                    ...previous,
                                    min: event.target.value,
                                }))
                            }
                        />
                    </label>

                    <label>
                        Maximum Price ($)
                        <input
                            type="number"
                            min="0"
                            placeholder="Max"
                            value={priceRange.max}
                            onChange={(event) =>
                                setPriceRange((previous) => ({
                                    ...previous,
                                    max: event.target.value,
                                }))
                            }
                        />
                    </label>
                </div>
            </details>
            <details>
                <summary>Customer Rating</summary>

                <div className="rating-filter">

                    {[4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="filter-option">
                            <input
                                type="radio"
                                name="rating"
                                value={rating}
                                checked={selectedRating === rating}
                                onChange={() => setSelectedRating(rating)}
                            />

                            {rating}★ & above
                        </label>
                    ))}

                    <label className="filter-option">
                        <input
                            type="radio"
                            name="rating"
                            value={0}
                            checked={selectedRating === 0}
                            onChange={() => setSelectedRating(0)}
                        />

                        All Ratings
                    </label>

                </div>
            </details>
        </aside>
    );
}

export default ProductFilters;