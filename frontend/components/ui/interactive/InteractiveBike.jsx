'use client';

import React, { useState } from 'react';
import './InteractiveBike.css';
import Image from 'next/image';

export default function InteractiveBike() {
  // Хранит состояние для каждой из трёх частей: открыта/закрыта
  const [activeParts, setActiveParts] = useState({
    frame: false,
    battery: false,
    termoBox: false,
  });

  /**
   * При клике на кнопку (1,2 или 3) —
   *     -> переключаем соответствующую часть
   *        (если была закрыта — откроется, если была открыта — закроется)
   */
  const handlePartClick = part => {
    setActiveParts(prev => ({
      ...prev,
      [part]: !prev[part],
    }));
  };

  /**
   * При клике на сам блок описания (если хотим его закрывать тем же кликом):
   *     -> закрываем конкретное описание, не трогая другие части
   */
  const handleBlockClick = part => {
    setActiveParts(prev => ({
      ...prev,
      [part]: false,
    }));
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Основное изображение в ЧБ */}
      <Image
        src="/images/int-bike.png"
        width={30}
        height={30}
        alt="Bike"
        style={{
          width: '100%',
          height: 'auto',
          filter: 'grayscale(100%)',
          display: 'block',
        }}
      />

      {/* Подсветка для РАМЫ, если активна */}
      {activeParts.frame && (
        <Image
          src="/images/int-bike.png"
          alt="Bike-frame"
          width={30}
          height={30}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 'auto',
            clipPath: 'inset(45% 54% 24% 18%)',
          }}
        />
      )}
      {/* Подсветка для АКБ */}
      {activeParts.battery && (
        <Image
          src="/images/int-bike.png"
          alt="Bike-battery"
          width={30}
          height={30}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 'auto',
            clipPath: 'inset(30% 40% 19% 46%)',
          }}
        />
      )}
      {/* Подсветка для ТЕРМОКОНТЕЙНЕРА */}
      {activeParts.termoBox && (
        <Image
          src="/images/int-bike.png"
          alt="Bike-termoBox"
          width={30}
          height={30}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 'auto',
            clipPath: 'inset(10% 0% 45% 60%)',
          }}
        />
      )}

      {/* КНОПКИ ВСЕГДА ВИДНЫ */}
      <div onClick={() => handlePartClick('frame')} className="int-button frame">
        <span>1</span>
      </div>
      <div onClick={() => handlePartClick('battery')} className="int-button battery">
        <span>2</span>
      </div>
      <div onClick={() => handlePartClick('termoBox')} className="int-button termoBox">
        <span>3</span>
      </div>

      {/**
       * Три независимых блока описания, каждый появляется,
       * если соответствующий activeParts[часть] === true.
       */}
      {/* Описание для РАМЫ */}
      <div
        className={`description-block frame${activeParts.frame ? ' active' : ''}`}
        onClick={() => handleBlockClick('frame')}
      >
        <p>1. Рама</p>
      </div>

      {/* Описание для АКБ */}
      <div
        className={`description-block battery${activeParts.battery ? ' active' : ''}`}
        onClick={() => handleBlockClick('battery')}
      >
        <p>2. Аккумулятор (АКБ)</p>
      </div>

      {/* Описание для ТЕРМОКОНТЕЙНЕРА */}
      <div
        className={`description-block termoBox${activeParts.termoBox ? ' active' : ''}`}
        onClick={() => handleBlockClick('termoBox')}
      >
        <p>3. Термоконтейнер</p>
      </div>
    </div>
  );
}
