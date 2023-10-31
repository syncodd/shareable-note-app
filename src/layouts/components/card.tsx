"use client"

// components/DraggableGrid.js
import React, { useState } from 'react';

const Card = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('Edit me...');

    const handleMouseEnter = () => {
        setIsEditing(true);
    };

    const handleMouseLeave = () => {
        setIsEditing(true);
    };

    const handleChange = (e: any) => {
        setText(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isEditing ? (
        <input
          type="text"
          className="editableText"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span className="plainText">{text}</span> // Apply your CSS class for plain text
      )}
    </div>
  );
};

export default Card;
