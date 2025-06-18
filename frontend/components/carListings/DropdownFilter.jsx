'use client';
import React from 'react';
import Image from 'next/image';
import SelectComponent from '../common/SelectComponent';
export default function DropdownFilter() {
  return (
    <section className="inventory-pager style-1">
      <div className="boxcar-container">
        <form onSubmit={e => e.preventDefault()} className="inventory-form">
          <div className="form_boxes line-r">
            <SelectComponent options={['Велосипеды', 'DeliBike', 'DeliBike']} />
          </div>
          <div className="form_boxes line-r">
            <SelectComponent options={['DeliBike', 'DeliBike', 'DeliBike']} />
          </div>
          <div className="form_boxes line-r">
            <SelectComponent options={['Модели', 'DeliBike', 'DeliBike']} />
          </div>
          <div className="form_boxes line-r">
            <SelectComponent options={['Цена', '200$', '300$']} />
          </div>
          <div className="form_boxes">
            <a href="#" title="" className="filter-popup">
              <Image alt="" src="/images/icons/filter.svg" width={24} height={24} />
              Поиск
            </a>
          </div>
          <div className="form-submit" style={{ width: '16%' }}>
            <button type="submit" className="theme-btn" style={{ width: '100%' }}>
              <i className="flaticon-search" />
              Искать
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
