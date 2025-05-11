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
import { FiUpload } from 'react-icons/fi';
import { FiX } from 'react-icons/fi';

// css
import styles from './form.module.css';

const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!;
const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL!;

interface FileMultipleUploadProps {
  label?: string;
  name: string;
  value: string[];
  onChange: (name: string, value: string[]) => void;
  removeFile: (name: string, url: string) => void;
  error?: string;
  accept?: string;
  minSize?: number;
  maxSize?: number;
  maxNumberOfFiles? : number;
}

const FileMultipleUpload: React.FC<FileMultipleUploadProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  accept = 'image/*',
  minSize,
  maxSize,
  removeFile,
  maxNumberOfFiles=10,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

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
          onChange(name, [response.secure_url]);
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
    if (value.length >= maxNumberOfFiles) {
      setUploadError(`You can only upload a maximum of ${maxNumberOfFiles} images.`);
      return;
    }

    const remainingSlots = maxNumberOfFiles - value.length;
    const filesToUpload = acceptedFiles.slice(0, remainingSlots);

    filesToUpload.forEach((file) => {
      if (minSize && file.size < minSize) return;
      if (maxSize && file.size > maxSize) return;
      handleFileUpload(file);
    });
  }, [handleFileUpload, minSize, maxSize]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    maxSize,
    minSize,
    multiple: true,
  });

  return (
    <div className={styles.uploadContainer}>
      {label && <label htmlFor={name}>{label}</label>}

      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.active : ''}`}
      >
        <input {...getInputProps()} id={name} />
        <div className={styles.iconContainer}>
          <FiUpload className={styles.uploadIcon} />
        </div>
        <p>
          {isDragActive ? 'Drop your files here...' : `Click or drag to upload`}
        </p>
        <p className={styles.fileTypeInfo}>
          Allowed file type: <strong>{accept}</strong>
        </p>

        {(minSize || maxSize) && (
          <p className={styles.sizeInfo}>
            {minSize && <span>Min size: {(minSize / 1024).toFixed(0)} KB. </span>}
            {maxSize && <span>Max size: {(maxSize / 1024).toFixed(0)} KB.</span>}
          </p>
        )}
      </div>

      {uploading && progress < 100 && <ProgressBar progress={progress} />}
      
      {value?.length > 0 && (
        <motion.div
          className={styles.previewGrid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {value.map((url, index) => {
            return (
            <div key={index} className={styles.previewImg}>
              <button
                type="button"
                onClick={() => removeFile(name, url)}
                className={styles.removeButton}
                aria-label="Remove image"
              >
                <FiX />
              </button>
              <Image
                src={url}
                alt="Uploaded preview"
                width={100}
                height={100}
              />
            </div>
          )
          })}
        </motion.div>
      )}

      {(error || uploadError) && (
        <motion.p className={styles.errorText} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {error || uploadError}
        </motion.p>
      )}
    </div>
  );
};

export default FileMultipleUpload;
