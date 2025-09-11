import { useState } from 'react';

interface ImageUploadProps {
  onUpload: (urls: string[]) => void;
  productId?: number;
}

export default function ImageUpload({ onUpload, productId }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        if (productId) {
          formData.append('productId', productId.toString());
        }

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const data = await response.json();
        uploadedUrls.push(data.url);
      }

      onUpload(uploadedUrls);
    } catch (err: any) {
      setError(err.message || 'Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="block">
          <span className="sr-only">Choose images</span>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            disabled={uploading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-gray-50 file:text-gray-700
              hover:file:bg-gray-100"
          />
        </label>
        {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
