'use client';
import React from 'react';
import { PriceField } from './PriceField';
import { PhotoUploader } from './PhotoUploader';
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  Paper,
  Autocomplete,
  Chip,
} from '@mui/material';

export function BikeForm({
  currentBike,
  onChange,
  onFileChange,
  onSave,
  onCancel,
  availableStatuses,
  isEditMode,
  priceCategories,
}) {
  const handlePriceChange = (index, field, value) => {
    const newPrices = [...(currentBike.prices || [])];
    newPrices[index] = { ...newPrices[index], [field]: value };
    onChange('prices', newPrices);
  };

  const addPriceField = () => {
    const newPrices = currentBike.prices ? [...currentBike.prices] : [];
    newPrices.push({ categoryId: '', price: '' });
    onChange('prices', newPrices);
  };

  const removePriceField = index => {
    const newPrices = [...(currentBike.prices || [])];
    newPrices.splice(index, 1);
    onChange('prices', newPrices);
  };

  return (
    <Box
      component="form"
      onSubmit={onSave}
      sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 2 }}
    >
      <Typography variant="h6">Информация о велосипеде</Typography>
      <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Название"
              value={currentBike.name}
              onChange={e => onChange('name', e.target.value)}
              required
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Модель"
              value={currentBike.model}
              onChange={e => onChange('model', e.target.value)}
              required
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Описание"
              value={currentBike.description}
              onChange={e => onChange('description', e.target.value)}
              multiline
              rows={3}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="availability-status-label">Статус доступности</InputLabel>
              <Select
                labelId="availability-status-label"
                label="Статус доступности"
                value={currentBike.availability_status}
                onChange={e => onChange('availability_status', e.target.value)}
              >
                {availableStatuses.map(status => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h6">Технические характеристики</Typography>
      <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Grid container spacing={2}>
          {[
            { label: 'Макс. скорость (км/ч)', field: 'maxSpeed', type: 'number', step: 0.1 },
            { label: 'Пробег на заряде (км)', field: 'rangePerCharge', type: 'number', step: 0.1 },
            { label: 'Время зарядки', field: 'chargeTime', type: 'text' },
            { label: 'Макс. нагрузка (кг)', field: 'maxLoad', type: 'number', step: 0.1 },
            { label: 'Вес (кг)', field: 'weight', type: 'number', step: 0.1 },
            { label: 'Мощность (Вт)', field: 'power', type: 'text' },
            { label: 'Подвеска', field: 'suspension', type: 'text' },
          ].map(({ label, field, type, step }, idx) => (
            <Grid item xs={12} sm={idx < 2 ? 6 : 12} md={idx < 4 ? 6 : 4} key={field}>
              <TextField
                label={label}
                type={type}
                inputProps={step ? { step } : undefined}
                value={currentBike[field]}
                onChange={e => onChange(field, e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Typography variant="h6">Фото и теги</Typography>
      <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Box sx={{ mb: 2 }}>
          <PhotoUploader onFilesChange={onFileChange} existingUrls={currentBike.imageUrls} />
        </Box>
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={Array.isArray(currentBike.tags) ? currentBike.tags : []}
          onChange={(_, value) => onChange('tags', value)}
          renderTags={(value, getTagProps) =>
            value.map((option, idx) => {
              // достаем key отдельно, остальные свойства передаём через spread
              const { key, ...chipProps } = getTagProps({ index: idx });

              return (
                <Chip
                  key={key} // <- явный key для React
                  variant="outlined"
                  label={option}
                  size="small"
                  {...chipProps} // остальные пропсы (onDelete и т.д.)
                />
              );
            })
          }
          renderInput={params => (
            <TextField {...params} label="Теги" placeholder="Добавить тег" size="small" />
          )}
        />
      </Paper>

      <Typography variant="h6">Цены</Typography>
      <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.paper' }}>
        {currentBike.prices && currentBike.prices.length > 0 ? (
          currentBike.prices.map((price, index) => (
            <PriceField
              key={index}
              index={index}
              price={price}
              priceCategories={priceCategories}
              onPriceChange={handlePriceChange}
              onRemove={removePriceField}
            />
          ))
        ) : (
          <Typography color="textSecondary">Нет добавленных цен</Typography>
        )}
        <Box sx={{ mt: 1 }}>
          <Button variant="contained" onClick={addPriceField} size="small">
            Добавить цену
          </Button>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          {isEditMode ? 'Сохранить' : 'Добавить'}
        </Button>
        <Button variant="outlined" onClick={onCancel} size="small">
          Отмена
        </Button>
      </Box>
    </Box>
  );
}
