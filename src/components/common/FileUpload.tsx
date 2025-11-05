import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  CloudArrowUpIcon,
  XMarkIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import { cn, formatFileSize, isImageFile } from "../../utils/helpers";
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from "../../utils/constants";

export interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: string[];
  label?: string;
  hint?: string;
  error?: string;
  multiple?: boolean;
  showPreview?: boolean;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  maxFiles = 5,
  maxSize = MAX_FILE_SIZE,
  accept = ALLOWED_FILE_TYPES,
  label,
  hint,
  error,
  multiple = true,
  showPreview = true,
  className,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string }>({});

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = multiple
        ? [...files, ...acceptedFiles].slice(0, maxFiles)
        : acceptedFiles.slice(0, 1);
      setFiles(newFiles);
      onFilesSelected(newFiles);

      // Generate previews for images
      if (showPreview) {
        acceptedFiles.forEach((file) => {
          if (isImageFile(file.name)) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreviewUrls((prev) => ({
                ...prev,
                [file.name]: reader.result as string,
              }));
            };
            reader.readAsDataURL(file);
          }
        });
      }
    },
    [files, multiple, maxFiles, onFilesSelected, showPreview]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: multiple ? maxFiles : 1,
      maxSize,
      accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
      multiple,
    });

  const removeFile = (fileName: string) => {
    const newFiles = files.filter((f) => f.name !== fileName);
    setFiles(newFiles);
    onFilesSelected(newFiles);

    setPreviewUrls((prev) => {
      const newPreviews = { ...prev };
      delete newPreviews[fileName];
      return newPreviews;
    });
  };

  return (
    <div className={cn("w-full", className)}>
      {label && <label className="input-label">{label}</label>}

      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary-500 bg-primary-50"
            : "border-gray-300 hover:border-gray-400",
          error && "border-red-500"
        )}
      >
        <input {...getInputProps()} />

        <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />

        <p className="mt-4 text-sm text-gray-600">
          {isDragActive ? (
            "Drop files here..."
          ) : (
            <>
              <span className="font-semibold text-primary-600">
                Click to upload
              </span>{" "}
              or drag and drop
            </>
          )}
        </p>

        {hint && <p className="mt-2 text-xs text-gray-500">{hint}</p>}

        <p className="mt-1 text-xs text-gray-500">
          Max file size: {formatFileSize(maxSize)}
        </p>
      </div>

      {error && <p className="input-error-message">{error}</p>}

      {fileRejections.length > 0 && (
        <div className="mt-2 text-sm text-red-600">
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name}>
              {errors.map((e) => (
                <p key={e.code}>{e.message}</p>
              ))}
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              {showPreview && previewUrls[file.name] ? (
                <img
                  src={previewUrls[file.name]}
                  alt={file.name}
                  className="h-12 w-12 object-cover rounded"
                />
              ) : (
                <DocumentIcon className="h-12 w-12 text-gray-400" />
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeFile(file.name)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
