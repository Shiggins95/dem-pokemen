import React, { useState } from 'react';
import { TextInputProps } from '../types/component-props';
import { FaTrash } from 'react-icons/all';

const TextInput = ({
    value,
    id,
    onChange,
    label,
    placeholder,
}: TextInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleClear = () => {
        setIsFocused(false);
        onChange('');
    };
    return (
        <div className={`input-container ${isFocused ? 'active' : ''}`}>
            <label htmlFor={id}>{label}</label>
            <input
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(!!value)}
                type="text"
                id={id}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
            />
            <button type="button" onClick={handleClear}>
                <FaTrash />
            </button>
        </div>
    );
};

export default TextInput;
