"use client";
import React from "react";
import {
    Paper,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    IconButton,
    Tooltip,
    InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export function PriceField({ index, price, priceCategories, onPriceChange, onRemove }) {
    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2,
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                bgcolor: 'background.paper',
            }}
        >
            <FormControl size="small" variant="outlined" sx={{ minWidth: 150 }}>
                <InputLabel id={`price-category-label-${index}`}>Категория</InputLabel>
                <Select
                    labelId={`price-category-label-${index}`}
                    label="Категория"
                    value={price.categoryId || ''}
                    onChange={(e) => onPriceChange(index, 'categoryId', e.target.value)}
                >
                    <MenuItem value="">
                        <em>Выберите категорию</em>
                    </MenuItem>
                    {priceCategories.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                size="small"
                variant="outlined"
                label="Цена"
                type="number"
                placeholder="0.00"
                value={price.price || ''}
                onChange={(e) => onPriceChange(index, 'price', e.target.value)}
                inputProps={{
                    step: 0.01,
                    style: { textAlign: 'right' },
                }}
                InputProps={{
                    endAdornment: <InputAdornment position="end">₸</InputAdornment>,
                }}
                sx={{ width: 120 }}
            />

            <Box sx={{ flexGrow: 1 }} />

            <Tooltip title="Удалить цену">
                <IconButton size="small" onClick={() => onRemove(index)} color="error">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Paper>
    );
}