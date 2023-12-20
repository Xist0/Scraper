import React from 'react'
import {useState} from 'react';

const Seach = () => {
    const [message, setMessage] = useState('');

    const handleChange = event => {
      setMessage(event.target.value);
  
      console.log('value is:', event.target.value);
    };
  
    return (
      <div>
        <input
          type="text"
          id="message"
          name="message"
          onChange={handleChange}
          value={message}
        />
  
        <h2>Message: {message}</h2>
        <button>213123          </button>
      </div>
    );
}

export default Seach