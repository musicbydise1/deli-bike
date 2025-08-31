// components/Modal.js
'use client';
import { useEffect } from 'react';
import { Button } from '@mantine/core';
import styles from '../../../../public/css/pages/home/Modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Если isOpen = false, не рендерим ничего
  if (!isOpen) return null;

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.show : ''}`} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <Button className={styles.closeButton} onClick={onClose} variant="subtle" color="#ff5500">
          &times;
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
