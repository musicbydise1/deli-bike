'use client';
import React from 'react';
import Image from 'next/image';
import SelectComponent from '../common/SelectComponent';
import { useTranslation } from 'react-i18next';
export default function DropdownFilter() {
  const { t } = useTranslation();
  return (
    <section className="inventory-pager style-1">
      <div className="boxcar-container">
        <form onSubmit={e => e.preventDefault()} className="inventory-form">
          <div className="form_boxes line-r">
            <SelectComponent options={[t('filters.bikes'), 'DeliBike', 'DeliBike']} />
          </div>
          <div className="form_boxes line-r">
            <SelectComponent options={['DeliBike', 'DeliBike', 'DeliBike']} />
          </div>
          <div className="form_boxes line-r">
            <SelectComponent options={[t('filters.models'), 'DeliBike', 'DeliBike']} />
          </div>
          <div className="form_boxes line-r">
            <SelectComponent options={[t('filters.price'), '200$', '300$']} />
          </div>
          <div className="form_boxes">
            <a href="#" title="" className="filter-popup">
              <Image alt="" src="/images/icons/filter.svg" width={24} height={24} />
              {t('filters.search')}
            </a>
          </div>
          <div className="form-submit" style={{ width: '16%' }}>
            <button type="submit" className="theme-btn" style={{ width: '100%' }}>
              <i className="flaticon-search" />
              {t('filters.submit')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
