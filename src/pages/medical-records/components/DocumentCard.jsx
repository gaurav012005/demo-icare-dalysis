import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DocumentCard = ({ document, onDownload, onShare, onPreview }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getFileTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf': return 'FileText';
      case 'jpg': case'jpeg': case'png': return 'Image';
      case 'doc': case'docx': return 'FileText';
      default: return 'File';
    }
  };

  const getFileTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf': return 'text-red-600';
      case 'jpg': case'jpeg': case'png': return 'text-blue-600';
      case 'doc': case'docx': return 'text-blue-800';
      default: return 'text-gray-600';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const handleAction = async (action) => {
    setIsLoading(true);
    try {
      await action();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 clinical-shadow hover:clinical-shadow-md transition-all duration-200">
      <div className="flex items-start space-x-3">
        {/* File Icon/Thumbnail */}
        <div className="flex-shrink-0">
          {document?.thumbnail ? (
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-border">
              <Image 
                src={document?.thumbnail} 
                alt={document?.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${getFileTypeColor(document?.type)}`}>
              <Icon name={getFileTypeIcon(document?.type)} size={24} />
            </div>
          )}
        </div>

        {/* Document Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground truncate">
                {document?.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  {formatFileSize(document?.size)}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {document?.uploadDate}
                </span>
              </div>
              {document?.doctor && (
                <p className="text-xs text-muted-foreground mt-1">
                  Dr. {document?.doctor}
                </p>
              )}
              {document?.annotation && (
                <p className="text-xs text-primary mt-1 line-clamp-2">
                  {document?.annotation}
                </p>
              )}
            </div>

            {/* Status Badge */}
            {document?.status && (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                document?.status === 'verified' 
                  ? 'bg-success/10 text-success'
                  : document?.status === 'pending' ?'bg-warning/10 text-warning' :'bg-muted text-muted-foreground'
              }`}>
                {document?.status}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1 mt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAction(() => onPreview(document))}
              iconName="Eye"
              iconPosition="left"
              disabled={isLoading}
            >
              View
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAction(() => onDownload(document))}
              iconName="Download"
              iconPosition="left"
              disabled={isLoading}
            >
              Download
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAction(() => onShare(document))}
              iconName="Share2"
              iconPosition="left"
              disabled={isLoading}
            >
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;