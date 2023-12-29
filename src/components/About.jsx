import React, { useEffect, useState } from "react";
import "./About.css";
import Search from "./Search";

function About() {
  const itemsPerPageOptions = [10, 20, 50];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [displayData, setDisplayData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterInStock, setFilterInStock] = useState(true);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    let newData = displayData.slice(startIndex, endIndex);

    // Применение фильтрации по наличию, если чекбокс включен
    if (filterInStock) {
      newData = newData.filter((item) => item.product_in_stock !== 0);
    }

    setDisplayData(newData);
  }, [currentPage, itemsPerPage, filterInStock]);

  const handleSearchData = (data) => {
    setDisplayData(data);
    setCurrentPage(1);
  };

  const handleSort = (property) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedData = [...displayData].sort((a, b) => {
      if (a[property] < b[property]) {
        return newSortOrder === "asc" ? -1 : 1;
      }
      if (a[property] > b[property]) {
        return newSortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    setDisplayData(sortedData);
  };

  const handleToggleStockFilter = () => {
    setFilterInStock((prev) => !prev);
  };

  return (
    <div className="about-table">
      <div className="pagin">
        <div className="">
          <label htmlFor="itemsPerPage">Элементов на странице: </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value, 10));
              setCurrentPage(1);
            }}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <Search onSearchData={handleSearchData} />
      </div>
      <div id="line"></div>
      <div className="">
        <table>
          <thead>
            <tr id="table-nav">
              <th>
                <h1>Магазин</h1>
              </th>
              <th>
                <h1>Наименование</h1>
              </th>
              <th>
                <h1>Артикул</h1>
              </th>
              <th>
                <input
                  type="checkbox"
                  id="stock"
                  checked={filterInStock}
                  onChange={handleToggleStockFilter}
                />
                <button onClick={() => handleSort("product_in_stock")}>
                  <h1>В наличии</h1>
                </button>
              </th>
              <th id="Prise">
                <button onClick={() => handleSort("product_price")}>
                  <h1>Цена</h1>
                </button>
              </th>
              <th id="link">
                <h1>Ссылка</h1>
              </th>
              <th id="Foto">
                <h1>Фото</h1>
              </th>
            </tr>
          </thead>
          <tbody id="search-results">
            {displayData.map((item) => (
              <tr key={item.product_article}>
                <td>
                  <p>{item.product_store}</p>
                </td>
                <td>
                  <p>{item.product_name}</p>
                </td>
                <td>
                  <p>{item.product_article}</p>
                </td>
                <td>
                  <p>{item.product_in_stock}</p>
                </td>
                <td id="Prise">
                  <h1>{item.product_price} ₽</h1>
                </td>
                <td id="link">
                  <a href={item.product_link}>
                    <h1>Перейти</h1>
                  </a>
                </td>
                <td id="Foto">
                  <img className="img" src={item.product_image} alt="" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default About;
