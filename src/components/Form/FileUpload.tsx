'use client';

// modules
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

// components
import { motion } from 'framer-motion';
import {
  ProgressBar,
} from '@/components';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';

// css
import styles from './form.module.css';

const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!;
const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL!;

interface FileUploadProps {
  label?: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  accept?: string;
  minSize?: number;
  maxSize?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  accept = 'image/*',
  minSize,
  maxSize,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = useCallback((file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    setUploading(true);
    setProgress(0);
    setUploadError(null);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', CLOUDINARY_URL);

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded * 100) / event.total);
        setProgress(percent);
      }
    });

    xhr.onload = () => {
      const response = JSON.parse(xhr.responseText);
      if (xhr.status === 200) {
        onChange(name, response.secure_url);
      } else {
        setUploadError('Upload failed. Try again.');
      }
      setUploading(false);
    };

    xhr.onerror = () => {
      setUploadError('An error occurred. Please try again.');
      setUploading(false);
    };

    xhr.send(formData);
  }, [name, onChange]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (minSize && file.size < minSize) return;
    if (maxSize && file.size > maxSize) return;
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    maxSize, // ✅ added
    minSize, // ✅ added
  });

  return (
    <div className={styles.uploadContainer}>
      {label && <label htmlFor={name}>{label}</label>}
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.active : ''}`}
      >
        <input {...getInputProps()} id={name} />
          <p>
            {isDragActive ? 'Drop your files here...' : `Click or drag to upload`}
          </p>
          <p className={styles.fileTypeInfo}>
            Allowed file type: <strong>{accept}</strong>
          </p>
          {(maxSize || minSize) && (
            <p className={styles.sizeInfo}>
              {minSize && <span>Minimum file size: {(minSize / 1024).toFixed(0)} KB.</span>}
              {' '}
              {maxSize && <span>Maximum file size: {(maxSize / 1024).toFixed(0)} KB.</span>}
            </p>
          )}
        </div>

        {uploading && progress < 100 && <ProgressBar progress={progress} />}
        {value && !uploading && accept.startsWith('image/') && (
          <motion.div
            key={value}
            className={styles.preview}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className={styles.previewImg}>
              <button
                type="button"
                onClick={() => onChange(name, '')}
                className={styles.removeButton}
                aria-label="Remove image"
              >
                <FiX />
              </button>
              <Image
                src={value}
                alt="Uploaded preview"
                width={100}
                height={100}
              />
            </div>
          </motion.div>
        )}

        {(error || uploadError) && (
          <motion.p 
            className={styles.errorText} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
          >
            {error || uploadError}
          </motion.p>
        )}
    </div>
  );
};

export default FileUpload;
