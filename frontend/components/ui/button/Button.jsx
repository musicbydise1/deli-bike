import React from 'react';
import './Button.css'; // Подключаем CSS файл

const Button = ({
                    children,
                    onClick,
                    type = 'button',
                    variant = 'primary',
                    disabled = false,
                    className = '',
                }) => {
    const baseStyles = 'button-base';
    const variants = {
        primary: 'button-primary',
        secondary: 'button-secondary',
        danger: 'button-danger',
        'primary-outline': 'button-primary-outline',
    };

    const disabledStyles = 'button-disabled';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${
                disabled ? disabledStyles : ''
            } ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;