import React from 'react';
import './Input.scss'

const Input = ({type, placeholder, value, onChange}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default Input;
