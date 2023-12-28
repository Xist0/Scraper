import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Search = () => {
  const { register, handleSubmit } = useForm();
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:5005/query', {
        method: 'POST',
        body: JSON.stringify({
          search_query: data.name,
          stores_to_scrape: ['marko', 'polo'],
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      // Проверка статуса ответа
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Ответ от сервера:', result);

      // Очистка текста в input
      setInputValue('');
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
