import { useState } from 'react';
import ImageUpload from './ImageUpload';

interface ProductImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
  onImagesUploaded?: () => void;
}

export default function ProductImageModal({
  isOpen,
  onClose,
  productId,
  productName,
  onImagesUploaded,
}: ProductImageModalProps) {
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleUpload = async (urls: string[]) => {
    setUploading(true);
    try {
      // Create records for each uploaded image
      const promises = urls.map(url =>
        fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, productId }),
        })
      );
      
      await Promise.all(promises);
      onImagesUploaded?.();
      onClose();
    } catch (error) {
      console.error('Failed to associate images with product:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Upload Images</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Upload additional images for {productName}
        </p>

        <ImageUpload 
          onUpload={handleUpload}
          productId={productId}
        />

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
