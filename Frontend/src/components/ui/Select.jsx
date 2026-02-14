import React from 'react';

const Select = ({ label, options = [], error, className = '', placeholder, ...props }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            {label && <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>}
            <select
                className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-800 bg-white ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
        </div>
    );
};

export default Select;
