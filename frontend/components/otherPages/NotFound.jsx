import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/button/Button';
export default function NotFound() {
  return (
    <div className="error-section layout-radius">
      <div className="boxcar-container">
        <div className="right-box">
          <div className="image-box">
            <Image width={1401} height={708} src="/images/resource/error.png" alt="" />
            <div className="content-box">
              <h2>Упс! Кажется, вы заблудились.</h2>
              <div className="text">
                Страница, которую вы ищете, недоступна. Попробуйте поискать еще раз .
              </div>
              <Link href={`/`} className="">
                <Button>Вернуться домой</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
