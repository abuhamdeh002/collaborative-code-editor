import React from 'react';

const Textarea = ({ value, onChange, placeholder, rows = 5 }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
      }}
    />
  );
};

export default Textarea;
