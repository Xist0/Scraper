import React, { useEffect, useState } from "react";
import "./About.css";
import Search from "./Search";

function About() {
  const itemsPerPageOptions = [10, 20, 50];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newData = displayData.slice(startIndex, endIndex);
    setDisplayData(newData);
  }, [currentPage, itemsPerPage]);

  const handleSearchData = (data) => {
    setDisplayData(data);
    setCurrentPage(1);
  };

  const handleSortByQuantity = () => {
    const sortedData = [...displayData].sort(
      (a, b) => b.product_in_stock - a.product_in_stock
    );
    setDisplayData(sortedData);
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

        <div className="sort">
          <button onClick={handleSortByQuantity}>
            <h1>Сортировать по количеству</h1>
          </button>
        </div>
        <Search onSearchData={handleSearchData} />
      </div>

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
              <h1>В наличии</h1>
            </th>
            <th id="Prise">
              <h1>Цена</h1>
            </th>
            <th id="link">
              <h1>Ссылка</h1>
            </th>
            <th id="Foto">
              <h1>Фото</h1>
            </th>
          </tr>
        </thead>
        <tbody>
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
