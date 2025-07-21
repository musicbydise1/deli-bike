import { useState } from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaTelegramPlane, FaPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  visible: {
    transition: { staggerChildren: 0.2 },
  },
  exit: {
    transition: { staggerChildren: 0.2, staggerDirection: -1 },
  },
};

const iconVariants = {
  // В скрытом состоянии иконки находятся в центре (y: 0)
  hidden: custom => ({
    opacity: 0,
    scale: 0.5,
    y: 0,
  }),
  // При появлении иконка поднимается вверх на значение custom (относительно центра кнопки)
  visible: custom => ({
    opacity: 1,
    scale: 1,
    y: -custom,
    transition: { type: 'spring', bounce: 0.5, duration: 0.6 },
  }),
  // При исчезновении возвращается обратно в центр
  exit: custom => ({
    opacity: 0,
    scale: 0.5,
    y: 0,
    transition: { type: 'spring', bounce: 0.5, duration: 0.6 },
  }),
};

const SocialWidget = () => {
  const [open, setOpen] = useState(false);
  const toggleWidget = () => setOpen(!open);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
      }}
    >
      {/* Обёртка с relative позиционированием для кнопки и иконок */}
      <div style={{ position: 'relative', width: '60px', height: '60px' }}>
        <AnimatePresence>
          {open && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ position: 'absolute', inset: 0 }}
            >
              {/* Иконка WhatsApp. В скрытом состоянии она находится в центре, а затем поднимается на 60px */}
              <motion.div
                custom={130}
                variants={iconVariants}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '7%',
                  transform: 'translateX(-50%)',
                }}
              >
                <Link
                  href="https://wa.me/+77088892879"
                  target="_blank"
                  style={{
                    background: '#25D366',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                  }}
                >
                  <FaWhatsapp size={24} />
                </Link>
              </motion.div>
              {/* Иконка Telegram. Поднимается на 120px */}
              <motion.div
                custom={70}
                variants={iconVariants}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '7%',
                  transform: 'translateX(-50%)',
                }}
              >
                <Link
                  href="https://t.me/+77088892879"
                  target="_blank"
                  style={{
                    background: '#0088cc',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                  }}
                >
                  <FaTelegramPlane size={24} />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Кнопка, из которой «выходят» иконки */}
        <button
          onClick={toggleWidget}
          style={{
            background: '#ff5500',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}
        >
          <FaPlus
            size={24}
            style={{
              transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default SocialWidget;
