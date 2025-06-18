'use client';

import React from 'react';
import { Alert } from '@mui/material';

export default function ErrorMessage({ errorMessage }) {
  if (!errorMessage) return null;

  return (
    <Alert severity="error" variant="filled" sx={{ mb: 2, fontWeight: 600 }}>
      {errorMessage}
    </Alert>
  );
}
