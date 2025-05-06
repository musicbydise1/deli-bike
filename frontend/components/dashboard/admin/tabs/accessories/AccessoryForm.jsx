"use client";

import React from "react";
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Chip,
    Button,
    InputAdornment,
    Typography,
} from "@mui/material";

export default function AccessoryForm({ currentAccessory, onChange, onSave, onCancel, bikes }) {
    const handleBikesChange = (event) => {
        const {
            target: { value },
        } = event;
        const selected = typeof value === "string" ? value.split(",") : value;
        const selectedIds = selected.map((id) => Number(id));
        onChange("bikeId", selectedIds);
    };

    return (
        <Box component="form" onSubmit={onSave} sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
            <Typography variant="h6">Информация об аксессуаре</Typography>

            <FormControl fullWidth size="small">
                <InputLabel id="bike-select-label">Велосипеды</InputLabel>
                <Select
                    labelId="bike-select-label"
                    multiple
                    value={currentAccessory.bikeId || []}
                    onChange={handleBikesChange}
                    input={<OutlinedInput label="Велосипеды" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((id) => {
                                const bike = bikes.find((b) => b.id === id);
                                const label = bike
                                    ? bike.name && bike.model
                                        ? `${bike.name} ${bike.model}`
                                        : bike.name || bike.model
                                    : id;
                                return <Chip key={id} label={label} size="small" />;
                            })}
                        </Box>
                    )}
                >
                    {bikes.map((bike) => (
                        <MenuItem key={bike.id} value={bike.id}>
                            {bike.name && bike.model ? `${bike.name} ${bike.model}` : bike.name || bike.model}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                label="Название"
                value={currentAccessory.name}
                onChange={(e) => onChange('name', e.target.value)}
                required
                fullWidth
                size="small"
            />

            <TextField
                label="Описание"
                value={currentAccessory.description}
                onChange={(e) => onChange('description', e.target.value)}
                multiline
                rows={3}
                fullWidth
                size="small"
            />

            <TextField
                label="Цена"
                value={currentAccessory.price}
                onChange={(e) => onChange('price', e.target.value)}
                type="number"
                required
                fullWidth
                size="small"
                InputProps={{
                    inputProps: { step: 0.01, style: { textAlign: 'right' } },
                    endAdornment: <InputAdornment position="end">₸</InputAdornment>,
                }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, pt: 1 }}>
                <Button variant="outlined" size="small" onClick={onCancel}>
                    Отмена
                </Button>
                <Button type="submit" variant="contained" size="small">
                    Сохранить
                </Button>
            </Box>
        </Box>
    );
}
