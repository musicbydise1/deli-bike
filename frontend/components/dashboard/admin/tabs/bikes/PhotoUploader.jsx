'use client';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Grid, Paper } from '@mui/material';

export function PhotoUploader({ onFilesChange, existingUrls = [] }) {
  const onDrop = useCallback(
    acceptedFiles => {
      onFilesChange(acceptedFiles);
    },
    [onFilesChange],
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/jpg',
    multiple: true,
  });

  const filePreviews = acceptedFiles.map(file =>
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    }),
  );

  return (
    <Box>
      <Paper
        variant="outlined"
        {...getRootProps()}
        sx={{
          borderStyle: 'dashed',
          borderWidth: 2,
          p: 2,
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>Отпустите файлы, чтобы загрузить их</Typography>
        ) : (
          <Typography>Перетащите файлы сюда или кликните для выбора</Typography>
        )}
      </Paper>

      <Grid container spacing={1} sx={{ mt: 1 }}>
        {existingUrls.map((url, index) => (
          <Grid item key={`existing-${index}`}>
            <Box
              component="img"
              src={url}
              alt={`Uploaded ${index}`}
              sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
            />
          </Grid>
        ))}

        {filePreviews.map((file, index) => (
          <Grid item key={`preview-${index}`}>
            <Box
              component="img"
              src={file.preview}
              alt={`Preview ${index}`}
              sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
