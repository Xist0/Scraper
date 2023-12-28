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
      const jsonData = JSON.stringify({ data: data.name });
      console.log('JSON данных:', jsonData);
    } catch (error) {
      console.error('Ошибка при преобразовании в JSON:', error);
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
