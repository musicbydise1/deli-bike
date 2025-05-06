"use client";

import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography,
} from "@mui/material";

export default function UserModal({
                                      isEditMode,
                                      currentUser,
                                      setCurrentUser,
                                      onSave,
                                      onClose,
                                      availableRoles,
                                  }) {
    const handleChange = (field) => (e) => {
        setCurrentUser({ ...currentUser, [field]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            id: currentUser.id,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            phoneNumber: currentUser.phoneNumber,
            password: currentUser.password,
            role: currentUser.role,
        };
        if (currentUser.role === "corporate") {
            payload.companyName = currentUser.companyName;
        }
        onSave(payload);
    };

    return (
        <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {isEditMode ? "Редактировать пользователя" : "Добавить пользователя"}
            </DialogTitle>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Имя"
                        value={currentUser.firstName}
                        onChange={handleChange('firstName')}
                        required
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="Фамилия"
                        value={currentUser.lastName}
                        onChange={handleChange('lastName')}
                        required
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={currentUser.email}
                        onChange={handleChange('email')}
                        required
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="Телефон"
                        value={currentUser.phoneNumber}
                        onChange={handleChange('phoneNumber')}
                        required
                        fullWidth
                        size="small"
                    />
                    {!isEditMode && (
                        <TextField
                            label="Пароль"
                            type="password"
                            value={currentUser.password || ''}
                            onChange={handleChange('password')}
                            required
                            fullWidth
                            size="small"
                        />
                    )}
                    <FormControl fullWidth size="small">
                        <InputLabel id="user-role-label">Роль</InputLabel>
                        <Select
                            labelId="user-role-label"
                            label="Роль"
                            value={currentUser.role}
                            onChange={handleChange('role')}
                        >
                            {availableRoles.map((role) => (
                                <MenuItem key={role} value={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {currentUser.role === 'corporate' && (
                        <TextField
                            label="Название компании"
                            value={currentUser.companyName || ''}
                            onChange={handleChange('companyName')}
                            required
                            fullWidth
                            size="small"
                        />
                    )}
                </DialogContent>
                <DialogActions sx={{ px: 3, py: 2 }}>
                    <Button onClick={onClose} variant="outlined" size="small">
                        Отмена
                    </Button>
                    <Button type="submit" variant="contained" size="small">
                        {isEditMode ? 'Сохранить' : 'Добавить'}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}