import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Search = () => {
  const [text, setText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const { register, handleSubmit } = useForm();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://192.168.1.76:5005/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          search_query: data.name,
          stores_to_scrape: ["marko", "polo"],
        }),
        
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setDisplayText(result); // handle the response as needed
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error('Unprocessable Entity. Подробности:', await error.response.json());
      } else {
        console.error('Error during fetch:', error.message);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body w-full lg:w-96"
      >
        <label>Text: </label>
        <input
          {...register('name', { required: true })}
          type="text"
          placeholder="name"
          className="input input-bordered"
          value={text}
          onChange={handleChange}
        />

        <button type="submit">Show</button>
        {displayText && <p>{displayText}</p>}
      </form>
    </>
  );
};

export default Search;
