'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../../../public/css/pages/login/Login.css';
import {
  useSendCodeMutation,
  useLoginMutation,
  useRegisterMutation,
  useLazyGetProfileQuery,
} from '@/store/services/authApi';

// Компоненты шагов
import PhoneStep from './PhoneStep';
import CodeStep from './CodeStep';
import RegisterStep from './RegisterStep';
import ErrorMessage from './ErrorMessage';

export default function Login() {
  const router = useRouter();
  const [sendCode] = useSendCodeMutation();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [getProfile] = useLazyGetProfileQuery();

  // При загрузке страницы читаем userRole из cookies
  useEffect(() => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const roleCookie = cookies.find(cookie => cookie.startsWith('userRole='));
    const userRoleFromCookie = roleCookie ? roleCookie.split('=')[1] : null;
    if (userRoleFromCookie === 'admin' || userRoleFromCookie === 'corporate') {
      router.push('/other-login');
    }
  }, [router]);

  // Шаги авторизации: phone -> code -> register
  const [step, setStep] = useState('phone');

  // Вводимые данные
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');

  // Данные для регистрации
  const [registerData, setRegisterData] = useState({
    phoneNumber: '', // Предзаполним при переходе к регистрации
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    role: 'courier', // Значение по умолчанию
  });

  const [errorMessage, setErrorMessage] = useState('');

  // 1. Отправка телефона для получения кода
  const handlePhoneSubmit = async e => {
    e.preventDefault();
    setErrorMessage('');

    const formattedPhone = phone.replace(/\D/g, '');

    try {
      await sendCode(formattedPhone).unwrap();
      setStep('code');
    } catch (error) {
      console.error('Ошибка при отправке телефона:', error);
      setErrorMessage(error.message);
    }
  };

  // 2. Проверка кода и авторизация
  const handleCodeSubmit = async codeStr => {
    setErrorMessage('');
    // Обновляем состояние кода
    setCode(codeStr);
    const formattedPhone = phone.replace(/\D/g, '');
    try {
      const data = await login({
        phoneNumber: formattedPhone,
        code: codeStr,
      }).unwrap();

      if (data.isSuccess) {
        if (data.data.registrationRequired) {
          // Сохраняем код и номер телефона в registerData,
          // чтобы при регистрации они были переданы в body
          setRegisterData(prev => ({
            ...prev,
            phoneNumber: formattedPhone,
            code: codeStr,
          }));
          setStep('register');
        } else {
          localStorage.setItem('accessToken', data.data.accessToken);

          const userData = await getProfile().unwrap();

          localStorage.setItem('userData', JSON.stringify(userData.data));
          // Сохраняем userRole в cookies вместо localStorage
          const userRoleName = userData.data.roles[0].name;
          document.cookie = `userRole=${userRoleName}; path=/; max-age=31536000`;

          router.push('/dashboard');
        }
      } else {
        throw new Error('Ошибка авторизации');
      }
    } catch (error) {
      console.error('Ошибка при проверке кода:', error.message);
      setErrorMessage(error.message);
    }
  };

  const handleResendCode = async () => {
    setErrorMessage('');

    const formattedPhone = phone.replace(/\D/g, '');

    try {
      await sendCode(formattedPhone).unwrap();
      // Можно добавить уведомление об успешной отправке кода
    } catch (error) {
      console.error('Ошибка при отправке телефона:', error);
      setErrorMessage(error.message);
    }
  };

  // 3. Регистрация (если пользователь не найден)
  const handleRegisterSubmit = async e => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const frontImageUrl = registerData.idCardFrontImage
        ? URL.createObjectURL(registerData.idCardFrontImage)
        : '';
      const backImageUrl = registerData.idCardBackImage
        ? URL.createObjectURL(registerData.idCardBackImage)
        : '';

      // Извлекаем ненужные поля, оставляя остальные (в том числе code)
      const { password, confirmPassword, ...rest } = registerData;

      const body = {
        ...rest,
        idCardFrontImage: frontImageUrl,
        idCardBackImage: backImageUrl,
      };

      console.log(body);

      const data = await register(body).unwrap();
      localStorage.setItem('accessToken', data.data.accessToken);

      const userData = await getProfile().unwrap();

      localStorage.setItem('userData', JSON.stringify(userData.data));
      // Сохраняем userRole в cookies вместо localStorage
      const userRoleName = userData.data.roles[0].name;
      document.cookie = `userRole=${userRoleName}; path=/; max-age=31536000`;

      router.push('/dashboard');
    } catch (error) {
      console.error('Ошибка регистрации:', error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <section className="login-section layout-radius" style={{ background: 'transparent' }}>
      <div className="inner-container">
        <div className="right-box">
          <div className="form-sec">
            {/* Сообщение об ошибке (если есть) */}
            <ErrorMessage errorMessage={errorMessage} />

            {/* Отображаем нужный шаг */}
            {step === 'phone' && (
              <PhoneStep phone={phone} setPhone={setPhone} handlePhoneSubmit={handlePhoneSubmit} />
            )}

            {step === 'code' && (
              <CodeStep
                code={code}
                setCode={setCode}
                handleCodeSubmit={handleCodeSubmit}
                handleResendCode={handleResendCode}
              />
            )}

            {step === 'register' && (
              <RegisterStep
                registerData={registerData}
                setRegisterData={setRegisterData}
                handleRegisterSubmit={handleRegisterSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
