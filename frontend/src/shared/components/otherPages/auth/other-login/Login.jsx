'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button/Button';
import Link from 'next/link';
import { AiOutlineLoading } from 'react-icons/ai';
import '../../../../public/css/pages/login/Login.css';
import { useOtherLoginMutation, useLazyGetProfileQuery } from '@/store/services/authApi';

export default function CorporateLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [login] = useOtherLoginMutation();
  const [getProfile] = useLazyGetProfileQuery();

  const handleCorporateLogin = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await login({ email, password }).unwrap();

      localStorage.setItem('accessToken', data.data.accessToken);

      const userData = await getProfile().unwrap();
      localStorage.setItem('userData', JSON.stringify(userData.data));

      const userRoleName = userData.data.roles[0].name;
      document.cookie = `userRole=${userRoleName}; path=/; max-age=31536000`;

      router.push('/dashboard');
    } catch (error) {
      console.error('Ошибка авторизации:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login-section layout-radius" style={{ background: 'transparent' }}>
      <div className="inner-container">
        <div className="right-box">
          <div className="form-sec">
            <div className="login-text mb-4">
              <h2>Вход для корпоративных клиентов</h2>
            </div>
            <form onSubmit={handleCorporateLogin}>
              <div className="form_boxes">
                <label>Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="form_boxes">
                <label>Пароль</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="form-submit">
                <Button
                  className="w-full !ml-0"
                  variant="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <AiOutlineLoading className="animate-spin" /> : 'Войти'}
                </Button>
              </div>
            </form>
            <div className="politic-privacy">
              <p>
                Вводя данные, вы соглашаетесь с{' '}
                <Link href="/terms">
                  <span>Политикой Конфиденциальности</span>
                </Link>{' '}
                и{' '}
                <Link href="/terms">
                  <span>Согласием на обработку персональных данных</span>
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
