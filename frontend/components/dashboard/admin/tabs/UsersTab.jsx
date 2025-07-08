'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import UsersTable from './users/UsersTable';
import UserModal from './users/UserModal';
import ErrorMessage from './users/ErrorMessage';

const AVAILABLE_ROLES = ['corporate', 'admin', 'courier'];

export default function UsersTab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    role: 'corporate',
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/admin/users`);
      if (!response.ok) throw new Error('Ошибка при получении списка пользователей');
      const result = await response.json();
      if (!result.isSuccess)
        throw new Error(result.message || 'Не удалось загрузить пользователей');
      setUsers(result.data || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleAddUser = () => {
    setIsEditMode(false);
    setCurrentUser({
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      companyName: '',
      role: 'corporate',
    });
    setShowModal(true);
  };

  const handleEditUser = user => {
    setIsEditMode(true);
    setCurrentUser({
      id: user.id,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      companyName: user.companyName || '',
      role: user.role || 'corporate',
    });
    setShowModal(true);
  };

  const handleDeleteUser = async id => {
    if (!window.confirm('Вы действительно хотите удалить пользователя?')) return;
    try {
      const response = await fetch(`${API_URL}/admin/users/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Ошибка при удалении пользователя');
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleSaveUser = async payload => {
    try {
      let url = `${API_URL}/admin/users`;
      let method = 'POST';
      if (isEditMode && currentUser.id) {
        url = `${API_URL}/admin/users/${currentUser.id}`;
        method = 'PUT';
      }
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok)
        throw new Error(
          isEditMode ? 'Ошибка при обновлении пользователя' : 'Ошибка при создании пользователя',
        );
      const result = await response.json();
      if (!result.isSuccess) throw new Error(result.message || 'Операция не удалась');

      if (isEditMode) {
        setUsers(prev => prev.map(u => (u.id === currentUser.id ? result.data : u)));
      } else {
        setUsers(prev => [...prev, result.data]);
      }
      setShowModal(false);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ ml: 2 }}>
          Загрузка пользователей...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Управление пользователями
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Здесь вы можете просматривать, добавлять, редактировать и удалять пользователей.
      </Typography>
      {error && <ErrorMessage errorMessage={error} />}

      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Добавить пользователя
        </Button>
      </Box>

      {users.length > 0 ? (
        <UsersTable users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
      ) : (
        <Alert severity="info">Пользователей пока нет.</Alert>
      )}

      {showModal && (
        <UserModal
          isEditMode={isEditMode}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          onSave={handleSaveUser}
          onClose={() => setShowModal(false)}
          availableRoles={AVAILABLE_ROLES}
        />
      )}
    </Box>
  );
}
