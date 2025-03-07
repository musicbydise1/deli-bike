import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export function PhotoUploader({ onFilesChange, existingUrls = [] }) {
    const onDrop = useCallback((acceptedFiles) => {
        // Передаём выбранные файлы родительскому компоненту
        onFilesChange(acceptedFiles);
    }, [onFilesChange]);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png, image/jpg',
        multiple: true,
    });

    // Для предпросмотра файлов (это временные URL)
    const filePreviews = acceptedFiles.map((file) =>
        Object.assign(file, {
            preview: URL.createObjectURL(file),
        })
    );

    return (
        <div>
            <div
                {...getRootProps()}
                className="border-dashed border-2 p-4 text-center cursor-pointer"
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Отпустите файлы, чтобы загрузить их</p>
                ) : (
                    <p>Перетащите файлы сюда или кликните для выбора</p>
                )}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
                {existingUrls.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Uploaded ${index}`}
                        className="w-20 h-20 object-cover rounded"
                    />
                ))}
                {filePreviews.map((file, index) => (
                    <img
                        key={index}
                        src={file.preview}
                        alt={`Preview ${index}`}
                        className="w-20 h-20 object-cover rounded"
                    />
                ))}
            </div>
        </div>
    );
}