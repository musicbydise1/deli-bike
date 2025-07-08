'use client';

import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import AccessoriesTable from './AccessoriesTable';
import AccessoryForm from './AccessoryForm';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useGetBikesQuery } from '@/store/services/bikesApi';

export default function AccessoriesTab() {
  const [accessories, setAccessories] = useState([]);
  const { data: bikesData, error: bikesError } = useGetBikesQuery();
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [currentAccessory, setCurrentAccessory] = useState({
    id: null,
    bikeId: [],
    name: '',
    description: '',
    price: '',
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchAccessories();
  }, []);

  useEffect(() => {
    if (bikesData?.data) {
      setBikes(Array.isArray(bikesData.data) ? bikesData.data : []);
    }
    if (bikesError) console.error('Ошибка загрузки велосипедов:', bikesError);
  }, [bikesData, bikesError]);

  async function fetchAccessories() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/accessories`);
      if (!response.ok) throw new Error('Ошибка при получении аксессуаров');
      const result = await response.json();
      if (!result.isSuccess) throw new Error(result.message || 'Не удалось загрузить аксессуары');
      setAccessories(result.data || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }


  const handleAddAccessory = () => {
    setIsEditMode(false);
    setCurrentAccessory({ id: null, bikeId: [], name: '', description: '', price: '' });
    setShowModal(true);
  };

  const handleEditAccessory = accessory => {
    setIsEditMode(true);
    setCurrentAccessory({
      id: accessory.id,
      bikeId: accessory.bikeId || [],
      name: accessory.name,
      description: accessory.description,
      price: accessory.price,
    });
    setShowModal(true);
  };

  const handleDeleteAccessory = async id => {
    if (!window.confirm('Вы действительно хотите удалить этот аксессуар?')) return;
    try {
      const response = await fetch(`${API_URL}/accessories/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Ошибка при удалении аксессуара');
      setAccessories(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleSaveAccessory = async e => {
    e.preventDefault();
    const accessoryData = {
      bikeId: currentAccessory.bikeId,
      name: currentAccessory.name,
      description: currentAccessory.description,
      price: Number(currentAccessory.price),
    };
    let url = `${API_URL}/accessories`;
    let method = 'POST';
    if (isEditMode && currentAccessory.id) {
      url = `${API_URL}/accessories/${currentAccessory.id}`;
      method = 'PUT';
    }
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accessoryData),
      });
      if (!response.ok)
        throw new Error(
          isEditMode ? 'Ошибка при обновлении аксессуара' : 'Ошибка при создании аксессуара',
        );
      const result = await response.json();
      if (!result.isSuccess) throw new Error(result.message || 'Операция не удалась');
      setShowModal(false);
      if (isEditMode) {
        setAccessories(prev => prev.map(a => (a.id === currentAccessory.id ? result.data : a)));
      } else {
        setAccessories(prev => [...prev, result.data]);
      }
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
          Загрузка аксессуаров...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Управление аксессуарами
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="success" onClick={handleAddAccessory}>
          Добавить аксессуар
        </Button>
      </Box>
      {accessories.length > 0 ? (
        <AccessoriesTable
          accessories={accessories}
          onEdit={handleEditAccessory}
          onDelete={handleDeleteAccessory}
        />
      ) : (
        <Typography variant="body2" color="text.secondary">
          Пока нет аксессуаров.
        </Typography>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={isEditMode ? 'Редактировать аксессуар' : 'Добавить аксессуар'}
      >
        <AccessoryForm
          currentAccessory={currentAccessory}
          onChange={(field, value) => setCurrentAccessory(prev => ({ ...prev, [field]: value }))}
          onSave={handleSaveAccessory}
          onCancel={() => setShowModal(false)}
          bikes={bikes}
        />
      </Modal>
    </Box>
  );
}
