import React, { useEffect, useState } from "react";
import "./About.css";
import Search from "./Search";
import { FaAngleDown } from "react-icons/fa";

function About() {
  const itemsPerPageOptions = [10, 20, 50];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [originalData, setOriginalData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterInStock, setFilterInStock] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [showPriceFilters, setShowPriceFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [excludeTerm, setExcludeTerm] = useState("");

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleExcludeTermChange = (e) => {
    setExcludeTerm(e.target.value);
  };

  useEffect(() => {
    // Фильтрация данных по введенному поисковому запросу
    const filteredData = originalData.filter((item) => {
      const searchFields = [
        item.product_store,
        item.product_name,
        item.product_article,
        item.product_in_stock.toString(),
        item.product_price.toString(),
        item.product_link,
        // Добавьте другие поля, если необходимо
      ];

      // Проверка наличия совпадений в любом из полей
      return searchFields.some((field) => {
        if (typeof field === "string") {
          return field.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false; // Если не является строкой, пропустить это поле
      });
    });

    setDisplayData(filteredData);
  }, [searchTerm, originalData]);

  useEffect(() => {
    // Исключение данных по введенному запросу
    const excludedData = originalData.filter((item) => {
      const searchFields = [
        item.product_store,
        item.product_name,
        item.product_article,
        item.product_in_stock.toString(),
        item.product_price.toString(),
        item.product_link,
        // Добавьте другие поля, если необходимо
      ];

      // Проверка наличия совпадений в любом из полей
      return !searchFields.some((field) => {
        if (typeof field === "string") {
          return field.toLowerCase().includes(excludeTerm.toLowerCase());
        }
        return false; // Если не является строкой, пропустить это поле
      });
    });

    setDisplayData(excludedData);
  }, [excludeTerm, originalData]);

  useEffect(() => {
    const filteredData = originalData.filter(
      (item) => (filterInStock ? item.product_in_stock !== 0 : true)
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newData = filteredData.slice(startIndex, endIndex);

    const priceFilteredData = newData.filter(
      (item) => item.product_price >= minPrice && item.product_price <= maxPrice
    );

    const sortedData = priceFilteredData.sort((a, b) => {
      if (a.product_price < b.product_price) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a.product_price > b.product_price) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    setDisplayData(sortedData);
  }, [
    currentPage,
    itemsPerPage,
    filterInStock,
    sortOrder,
    originalData,
    minPrice,
    maxPrice,
  ]);

  const handleSearchData = (data) => {
    setOriginalData(data);
    setCurrentPage(1);

    const maxProductPrice = Math.max(
      ...data.map((item) => item.product_price)
    );
    setMaxPrice(maxProductPrice);

    const minProductPrice = Math.min(
      ...data.map((item) => item.product_price)
    );
    setMinPrice(minProductPrice);
  };

  const handleSort = (property) => {
    // Если сортируем по цене, то всегда в порядке возрастания
    const newSortOrder =
      property === "product_price" ? "asc" : sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedData = [...originalData].sort((a, b) => {
      if (a[property] < b[property]) {
        return newSortOrder === "asc" ? -1 : 1;
      }
      if (a[property] > b[property]) {
        return newSortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    setOriginalData(sortedData);
  };

  const handleToggleStockFilter = () => {
    setFilterInStock((prev) => !prev);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(originalData.length / itemsPerPage);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(parseInt(e.target.value, 10));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(parseInt(e.target.value, 10));
  };

  const handleTogglePriceFilters = () => {
    setShowPriceFilters((prev) => !prev);
  };

  return (
    <div className="about-table">
      <div className="pagin">
          <div className="about-paginathions">
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
          <div className="about-pagin-search">
            <Search onSearchData={handleSearchData} />
          </div>
        <div className="about-search">

          <input
            type="text"
            placeholder="Уточнить"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <input
            type="text"
            placeholder="Исключить"
            value={excludeTerm}
            onChange={handleExcludeTermChange}
          />
        </div>
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
                <div className="availability">
                  <input
                    type="checkbox"
                    id="stock"
                    checked={filterInStock}
                    onChange={handleToggleStockFilter}
                  />

                  <h1>В наличии</h1>
                  <FaAngleDown onClick={() => handleSort("product_in_stock")} />
                </div>
              </th>
              {/* Цена */}
              <th id="Prise">
                <button onClick={() => handleSort("product_price")}>
                  <h1>Цена</h1>
                </button>
                <FaAngleDown onClick={handleTogglePriceFilters} />
                <div className="Prise">
                  {showPriceFilters && (
                    <div className="label-prise">
                      <label htmlFor="minPrice">Мин:</label>
                      <input
                        type="number"
                        id="minPrice"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                      />
                    </div>
                  )}
                  {showPriceFilters && (
                    <div className="label-prise">
                      <label htmlFor="maxPrice">Макс:</label>
                      <input
                        type="number"
                        id="maxPrice"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                      />
                    </div>
                  )}
                </div>
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
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Предыдущая
          </button>
          <span>{currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(originalData.length / itemsPerPage)}
          >
            Следующая
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
