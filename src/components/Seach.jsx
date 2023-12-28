import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Search = () => {
  const { register, handleSubmit } = useForm();
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (data) => {
    try {
      // Преобразование введенного текста в JSON
      const jsonData = JSON.stringify({
        search_query: data.name, // используйте значение из input
        stores_to_scrape: ["marko", "polo"],
      });

      // Отправка JSON на сервер
      fetch('http://127.0.0.1:5005/query', {
        method: 'POST',
        body: jsonData,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((response) => {
          // Обработка ответа от сервера, например, изменение состояния компонента
          console.log('Ответ от сервера:', response);

          // Очистка текста в input
          setInputValue('');
        });
    } catch (error) {
      console.error('Ошибка при преобразовании в JSON или отправке на сервер:', error);
    }
  };

  return (
    <div className="card-body w-full lg:w-96">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Text: </label>
        <input
          {...register('name', { required: true })}
          type="text"
          placeholder="name"
          className="input input-bordered"
          value={inputValue}
          onChange={handleChange}
        />

        <button type="submit">Найти</button>
      </form>
    </div>
  );
};

export default Search;
