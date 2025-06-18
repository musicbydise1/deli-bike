'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const Counter = ({ parentClass, min = 0, max }) => {
  const targetElement = useRef(null);
  const [counted, setCounted] = useState(min);

  // делаем функцию мемоизированной, чтобы ее можно было безопасно добавить в deps
  const startCountup = useCallback(() => {
    const step = Math.ceil(max / 20);
    const intervalId = setInterval(() => {
      setCounted(prev => {
        const next = prev + step;
        if (next >= max) {
          clearInterval(intervalId);
          return max;
        }
        return next;
      });
    }, 50);
  }, [max]);

  useEffect(() => {
    const element = targetElement.current; // сохраняем «снимок» ref

    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startCountup();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element); // используем сохранённый element
      observer.disconnect();
    };
  }, [startCountup]); // effect перезапустится только если изменится startCountup (=> max)

  return (
    <span ref={targetElement} className={parentClass}>
      {counted}
    </span>
  );
};

export default Counter;
