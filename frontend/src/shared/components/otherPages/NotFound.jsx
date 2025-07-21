import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/button/Button';
import { useTranslation } from 'react-i18next';
export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="error-section layout-radius">
      <div className="boxcar-container">
        <div className="right-box">
          <div className="image-box">
            <Image width={1401} height={708} src="/images/resource/error.png" alt="" />
            <div className="content-box">
              <h2>{t('notFound.title')}</h2>
              <div className="text">{t('notFound.description')}</div>
              <Link href={`/`} className="">
                <Button>{t('notFound.back_home')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
