// Button.js
import React from 'react';
import { Button as MantineButton } from '@mantine/core';
import './Button.css'; // Подключаем ваш CSS

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'filled',
  disabled = false,
  className = '',
}) => {
  const baseStyles = 'button-base';
  const disabledStyles = 'button-disabled';

  return (
    <MantineButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${disabled ? disabledStyles : ''} ${className}`}
      variant={variant}
      color="#ff5500"
    >
      {children}
    </MantineButton>
  );
};

export default Button;
