import React, { useState, useRef } from 'react';
import { X, Upload, Share2 } from 'lucide-react';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
}

const MediaModal: React.FC<MediaModalProps> = ({ isOpen, onClose, selectedDate }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const mediaFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    setUploadedFiles(prev => [...prev, ...mediaFiles]);
  };

  const handleShare = () => {
    if (uploadedFiles.length === 0) {
      alert('Please upload some media files first!');
      return;
    }
    // Here we would normally handle the actual upload to a backend service
    alert('Sharing feature coming soon! Files selected: ' + uploadedFiles.map(f => f.name).join(', '));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            {selectedDate?.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          className="hidden"
          multiple
          accept="image/*,video/*"
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-xl p-8 mb-6 text-center cursor-pointer
            ${dragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}
          `}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            Drag and drop your photos & videos here
          </p>
          <p className="text-sm text-gray-500">
            or click to select files
          </p>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h4>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="text-sm text-gray-600 flex items-center">
                  <span className="truncate">{file.name}</span>
                  <span className="ml-2 text-gray-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleShare}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share to Social Media
          </button>
        </div>
      </div>
    </div>
  );
}

export default MediaModal;