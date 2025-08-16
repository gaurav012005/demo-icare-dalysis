import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DocumentUpload = ({ onUpload, category, isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [annotation, setAnnotation] = useState('');
  const fileInputRef = useRef(null);

  const allowedTypes = {
    'treatment-history': ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
    'test-reports': ['.pdf', '.jpg', '.jpeg', '.png'],
    'prescriptions': ['.pdf', '.jpg', '.jpeg', '.png'],
    'insurance': ['.pdf', '.doc', '.docx']
  };

  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files?.filter(file => {
      const fileExtension = '.' + file?.name?.split('.')?.pop()?.toLowerCase();
      const isValidType = allowedTypes?.[category]?.includes(fileExtension);
      const isValidSize = file?.size <= maxFileSize;
      
      if (!isValidType) {
        alert(`File type not allowed for ${category}. Allowed types: ${allowedTypes?.[category]?.join(', ')}`);
        return false;
      }
      
      if (!isValidSize) {
        alert(`File size must be less than ${maxFileSize / (1024 * 1024)}MB`);
        return false;
      }
      
      return true;
    });

    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev?.filter((_, i) => i !== index));
  };

  const simulateUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Simulate AES encryption process
    await new Promise(resolve => setTimeout(resolve, 500));

    const uploadedDocuments = selectedFiles?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      type: file?.name?.split('.')?.pop(),
      size: file?.size,
      uploadDate: new Date()?.toLocaleDateString('en-IN'),
      category,
      annotation,
      status: 'verified',
      encrypted: true
    }));

    onUpload(uploadedDocuments);
    
    // Reset form
    setSelectedFiles([]);
    setAnnotation('');
    setUploadProgress(0);
    setIsUploading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg clinical-shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            Upload Documents - {category?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Drop files here or click to browse
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Supported formats: {allowedTypes?.[category]?.join(', ')}
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Maximum file size: 10MB per file
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef?.current?.click()}
              iconName="FolderOpen"
              iconPosition="left"
            >
              Browse Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={allowedTypes?.[category]?.join(',')}
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Selected Files */}
          {selectedFiles?.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Selected Files:</h4>
              {selectedFiles?.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="File" size={20} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{file?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file?.size / 1024 / 1024)?.toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    iconName="X"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Annotation */}
          <Input
            label="Add Note (Optional)"
            type="text"
            placeholder="Add any relevant notes about these documents..."
            value={annotation}
            onChange={(e) => setAnnotation(e?.target?.value)}
            description="This note will be visible to your healthcare providers"
          />

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Encrypting and uploading...</span>
                <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-success mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-success">Secure Upload</h4>
                <p className="text-xs text-success/80 mt-1">
                  All documents are encrypted with AES-256 encryption before storage and can only be accessed by authorized personnel.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose} disabled={isUploading}>
              Cancel
            </Button>
            <Button
              onClick={simulateUpload}
              disabled={selectedFiles?.length === 0 || isUploading}
              loading={isUploading}
              iconName="Upload"
              iconPosition="left"
            >
              Upload Documents
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;