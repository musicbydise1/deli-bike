import React, { useState } from 'react';
import Button from '@/components/ui/button/Button';
import Link from 'next/link';
import { AiOutlineCheckCircle } from 'react-icons/ai';

export default function RegisterStep({ registerData, setRegisterData, handleRegisterSubmit }) {
  const [step, setStep] = useState(1);

  // Функция для обрезки длинного названия файла
  const truncateFileName = (fileName, maxLength = 7) => {
    if (!fileName) return '';
    return fileName.length > maxLength ? fileName.substring(0, maxLength) + '...' : fileName;
  };

  const handleNext = e => {
    e.preventDefault();
    // Дополнительная валидация первого этапа (если требуется)
    setStep(2);
  };

  const handleBack = e => {
    e.preventDefault();
    setStep(1);
  };

  // Проверка заполненности обязательных полей для каждого этапа
  const isStep1Valid =
    registerData.firstName?.trim() !== '' &&
    registerData.lastName?.trim() !== '' &&
    registerData.email?.trim() !== '';
  const isStep2Valid =
    Boolean(registerData.idCardFrontImage) && Boolean(registerData.idCardBackImage);

  return (
    <div className="form-box two">
      {/* Progress stepper с разделителем */}
      <div className="progress-stepper">
        <div className={`step ${step === 1 ? 'active' : ''}`}>1</div>
        <div className="separator">-</div>
        <div className={`step ${step === 2 ? 'active' : ''}`}>2</div>
      </div>

      <div className="login-text">
        <h2>Регистрация | {step} этап</h2>
        <p>
          {step === 1
            ? 'Введите личные данные.'
            : 'Прикрепите фото удостоверения с двух сторон для подтверждения личности.'}
        </p>
      </div>
      <form onSubmit={step === 1 ? handleNext : handleRegisterSubmit}>
        {step === 1 && (
          <>
            {/* Поле "Имя" */}
            <div className="form_boxes" style={{ position: 'relative' }}>
              <label>
                Имя <span className="text-red-600">*</span>
              </label>
              <input
                required
                type="text"
                name="firstName"
                value={registerData.firstName}
                onChange={e => setRegisterData({ ...registerData, firstName: e.target.value })}
              />
              {registerData.firstName?.trim() !== '' && (
                <AiOutlineCheckCircle
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'green',
                    fontSize: '22px',
                  }}
                />
              )}
            </div>

            {/* Поле "Фамилия" */}
            <div className="form_boxes" style={{ position: 'relative' }}>
              <label>
                Фамилия <span className="text-red-600">*</span>
              </label>
              <input
                required
                type="text"
                name="lastName"
                value={registerData.lastName}
                onChange={e => setRegisterData({ ...registerData, lastName: e.target.value })}
              />
              {registerData.lastName?.trim() !== '' && (
                <AiOutlineCheckCircle
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'green',
                    fontSize: '22px',
                  }}
                />
              )}
            </div>

            {/* Поле "Отчество" (опционально) */}
            <div className="form_boxes" style={{ position: 'relative' }}>
              <label>Отчество (необязательно)</label>
              <input
                type="text"
                name="patronymic"
                value={registerData.patronymic || ''}
                onChange={e => setRegisterData({ ...registerData, patronymic: e.target.value })}
              />
              {registerData.patronymic && registerData.patronymic.trim() !== '' && (
                <AiOutlineCheckCircle
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'green',
                    fontSize: '22px',
                  }}
                />
              )}
            </div>

            {/* Поле "Email" */}
            <div className="form_boxes" style={{ position: 'relative' }}>
              <label>
                Email <span className="text-red-600">*</span>
              </label>
              <input
                required
                type="email"
                name="email"
                value={registerData.email}
                onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
              />
              {registerData.email?.trim() !== '' && (
                <AiOutlineCheckCircle
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'green',
                    fontSize: '22px',
                  }}
                />
              )}
            </div>

            <div className="form-submit">
              <Button
                className="w-full !ml-0"
                variant="primary"
                type="submit"
                disabled={!isStep1Valid}
              >
                Далее
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* Обёртка для двух полей загрузки в одну строку */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              {/* Поле "Лицевая сторона удостоверения" */}
              <div className="form_boxes upload-box" style={{ position: 'relative', flex: 1 }}>
                <label className="mb-4">
                  Лицевая сторона <span className="text-red-600">*</span>
                </label>
                <div
                  className="custom-file-upload"
                  style={{
                    border: '1px solid #f1f3f6',
                    padding: '10px 25px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: registerData.idCardFrontImage ? '#f1f3f6' : '#f1f3f6',
                  }}
                  onClick={() => document.getElementById('idCardFrontImage').click()}
                >
                  {registerData.idCardFrontImage
                    ? truncateFileName(registerData.idCardFrontImage.name)
                    : '+ Загрузить'}
                </div>
                <input
                  required
                  type="file"
                  name="idCardFrontImage"
                  id="idCardFrontImage"
                  style={{ display: 'none' }}
                  onChange={e => {
                    setRegisterData({
                      ...registerData,
                      idCardFrontImage: e.target.files[0],
                    });
                  }}
                />
                {registerData.idCardFrontImage && (
                  <AiOutlineCheckCircle
                    style={{
                      position: 'absolute',
                      right: '-10px',
                      top: '70%',
                      transform: 'translateY(-50%)',
                      color: 'green',
                      fontSize: '22px',
                    }}
                  />
                )}
              </div>

              {/* Поле "Обратная сторона удостоверения" */}
              <div className="form_boxes upload-box" style={{ position: 'relative', flex: 1 }}>
                <label className="mb-4">
                  Обратная сторона <span className="text-red-600">*</span>
                </label>
                <div
                  className="custom-file-upload"
                  style={{
                    border: '1px solid #f1f3f6',
                    padding: '10px 25px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: registerData.idCardBackImage ? '#f1f3f6' : '#f1f3f6',
                  }}
                  onClick={() => document.getElementById('idCardBackImage').click()}
                >
                  {registerData.idCardBackImage
                    ? truncateFileName(registerData.idCardBackImage.name)
                    : '+ Загрузить'}
                </div>
                <input
                  required
                  type="file"
                  name="idCardBackImage"
                  id="idCardBackImage"
                  style={{ display: 'none' }}
                  onChange={e => {
                    setRegisterData({
                      ...registerData,
                      idCardBackImage: e.target.files[0],
                    });
                  }}
                />
                {registerData.idCardBackImage && (
                  <AiOutlineCheckCircle
                    style={{
                      position: 'absolute',
                      right: '-10px',
                      top: '70%',
                      transform: 'translateY(-50%)',
                      color: 'green',
                      fontSize: '22px',
                    }}
                  />
                )}
              </div>
            </div>

            <div className="form_submit_buttons" style={{ display: 'flex', gap: '1rem' }}>
              <Button className="w-full !ml-0" variant="secondary" onClick={handleBack}>
                Назад
              </Button>
              <Button
                className="w-full !ml-0"
                variant="primary"
                type="submit"
                disabled={!isStep2Valid}
              >
                Зарегистрироваться
              </Button>
            </div>
          </>
        )}
      </form>
      <div className="politic-privacy">
        <p>
          Вводя персональные данные, вы соглашаетесь с{' '}
          <Link href={`/terms`}>
            <span>Политикой Конфиденциальности</span>
          </Link>{' '}
          и даёте{' '}
          <Link href={`/`}>
            <span>Согласие на обработку персональных данных</span>
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
