import React, { useEffect, useState } from 'react';
import './About.css';
import { data } from './data.js';

function About() {
  const itemsPerPageOptions = [10, 20, 50];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Обновляем filteredData при изменении currentPage или itemsPerPage
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newData = data.slice(startIndex, endIndex);
    setFilteredData(newData);
  }, [currentPage, itemsPerPage]);

  const listItem = filteredData.map((item) => (
    <tr key={item.product_article}>
      <td><p>{item.product_store}</p></td>
      <td><p>{item.product_name}</p></td>
      <td><p>{item.product_article}</p></td>
      <td><p>{item.product_in_stock}</p></td>
      <td id='Prise'><h1>{item.product_price} ₽</h1></td>
      <td id='link'><a href={item.product_link}><h1>Перейти</h1></a></td>
      <td id='Foto'><img className='img' src={item.product_image} alt="" /></td>
    </tr>
  ));

  return (
    <div className="about-table">
      <div className='pagin'>
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

      <table>
        <thead>
          <tr id='table-nav'>
            <th><h1>Магазин</h1></th>
            <th><h1>Наименование</h1></th>
            <th><h1>Артикул</h1></th>
            <th><h1>В наличии</h1></th>
            <th id='Prise'><h1>Цена</h1></th>
            <th id='link'><h1>Ссылка</h1></th>
            <th id='Foto'><h1>Фото</h1></th>
          </tr>
        </thead>
        <tbody>{listItem}</tbody>
      </table>

      <div>
        {data.length > itemsPerPage && (
          <div>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Предыдущая
            </button>
            Страница {currentPage} из {Math.ceil(data.length / itemsPerPage)}
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(data.length / itemsPerPage))
                )
              }
              disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            >
              Следующая
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default About;
