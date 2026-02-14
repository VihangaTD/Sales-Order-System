import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-200",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
