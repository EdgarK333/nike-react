import React from 'react';

const Sort = ({
  selectedCategory,
  categories,
  handleCategoryChange,
  handleToggleSortOptions,
  isSortOpen,
  sortArrowRef,
  handleSortOptionClick,
}) => {
  return (
    <div className="sort-container" ref={sortArrowRef}>
      {selectedCategory && <div className="selected-category">{selectedCategory}</div>}
      <div className="category-dropdown">
        <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <button className="sort-button" onClick={handleToggleSortOptions}>
        SortBy
        <span className={`sort-arrow ${isSortOpen ? 'sort-arrow-up' : ''}`}>▼</span>
      </button>
      {isSortOpen && (
        <ul className={`sort-options open`}>
          <li onClick={() => handleSortOptionClick('asc')}>Price: Low to High</li>
          <li onClick={() => handleSortOptionClick('desc')}>Price: High to Low</li>
          <li onClick={() => handleSortOptionClick('name-asc')}>Name: A to Z</li>
          <li onClick={() => handleSortOptionClick('name-desc')}>Name: Z to A</li>
        </ul>
      )}
    </div>
  );
};

export default Sort;
