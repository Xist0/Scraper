import React from 'react'
import {useState} from 'react';

const Seach = () => {
    const [text, setText] = useState('');
    const [displayText, setDisplayText] = useState('');
  
    const handleSubmit = e => {
      e.preventDefault();
      setDisplayText(text)
      
    };
  
    const handleChange = e => {
      setText(e.target.value);
      
    };
  
    return (
      <>
        <form onSubmit={e => handleSubmit(e)}>
          <label>Text: </label>
          <input type="text" value={text} onChange={e => handleChange(e)} />
          <button type="submit" onClick={handleSubmit}>
            Show
          </button>
          {displayText && <p>{displayText}</p>}
        </form>
      </>
    );
}

export default Seach