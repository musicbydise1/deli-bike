'use client';
import React from 'react';
import Image from 'next/image';
import { FiEdit } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';

export function BillingDetails({
  isEditing,
  formData,
  onEdit,
  onChange,
  onFileChange,
  onDeleteImage,
}) {
  if (!isEditing && formData.firstName) {
    return (
      <div className="user-data" style={{ position: 'relative' }}>
        <div
          className="edit-icon"
          onClick={onEdit}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            right: 0,
            fontSize: '1.5rem',
          }}
          title="Редактировать"
        >
          <FiEdit color="#777" />
        </div>
        <p>
          <strong>First Name: </strong>
          {formData.firstName}
        </p>
        <p>
          <strong>Last Name: </strong>
          {formData.lastName}
        </p>
        <p>
          <strong>Address: </strong>
          {formData.address}
        </p>
        <p>
          <strong>Phone: </strong>
          {formData.phoneNumber}
        </p>
        <p>
          <strong>Email: </strong>
          {formData.email}
        </p>
        <p style={{ position: 'relative' }}>
          <strong>ID (Лицевая сторона): </strong>
          {formData.idCardFrontImage && (
            <div style={{ display: 'inline-block', marginLeft: '20px' }}>
              <Image
                src={formData.idCardFrontImage}
                alt="Фото ID (Лицевая сторона)"
                width={100}
                height={100}
              />
            </div>
          )}
        </p>
        <p style={{ position: 'relative' }}>
          <strong>ID (Обратная сторона): </strong>
          {formData.idCardBackImage && (
            <div style={{ display: 'inline-block', marginLeft: '20px' }}>
              <Image
                src={formData.idCardBackImage}
                alt="Фото ID (Обратная сторона)"
                width={100}
                height={100}
              />
            </div>
          )}
        </p>
      </div>
    );
  } else {
    return (
      <form onSubmit={e => e.preventDefault()} className="row g-0">
        <div className="form-column col-lg-6">
          <div className="form_boxes">
            <label>First Name</label>
            <input
              required
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-column col-lg-6">
          <div className="form_boxes">
            <label>Last Name</label>
            <input
              required
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-column col-lg-12">
          <div className="form_boxes">
            <label>Address</label>
            <input
              required
              type="text"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-column col-lg-12">
          <div className="form_boxes">
            <label>Phone</label>
            <input
              required
              type="number"
              name="phoneNumber"
              placeholder="+70 ..."
              value={formData.phoneNumber}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-column col-lg-12">
          <div className="form_boxes">
            <label>Email</label>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-column col-lg-12 mb-8 mt-8">
          <label>ID (Лицевая сторона)</label>
          <input type="file" accept="image/*" name="idCardFrontImage" onChange={onFileChange} />
          {formData.idCardFrontImage && (
            <div
              style={{
                marginTop: '0.5rem',
                position: 'relative',
                display: 'inline-block',
                marginLeft: '20px',
              }}
            >
              <Image
                src={formData.idCardFrontImage}
                alt="Фото ID (Лицевая сторона)"
                width={100}
                height={100}
              />
              <button type="button" onClick={() => onDeleteImage('idCardFrontImage')}>
                <FaTimes title="Удалить фото" />
              </button>
            </div>
          )}
        </div>
        <div className="form-column col-lg-12 mb-8">
          <label>ID (Обратная сторона)</label>
          <input type="file" accept="image/*" name="idCardBackImage" onChange={onFileChange} />
          {formData.idCardBackImage && (
            <div
              style={{
                marginTop: '0.5rem',
                position: 'relative',
                display: 'inline-block',
                marginLeft: '20px',
              }}
            >
              <Image
                src={formData.idCardBackImage}
                alt="Фото ID (Обратная сторона)"
                width={100}
                height={100}
              />
              <button type="button" onClick={() => onDeleteImage('idCardBackImage')}>
                <FaTimes title="Удалить фото" />
              </button>
            </div>
          )}
        </div>
      </form>
    );
  }
}
