import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DocumentPreview = ({ document, isOpen, onClose, onDownload, onShare, onPrint }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!isOpen || !document) return null;

  const handleAction = async (action) => {
    setIsLoading(true);
    try {
      await action();
    } finally {
      setIsLoading(false);
    }
  };

  const handleZoom = (direction) => {
    if (direction === 'in' && zoomLevel < 200) {
      setZoomLevel(prev => Math.min(prev + 25, 200));
    } else if (direction === 'out' && zoomLevel > 50) {
      setZoomLevel(prev => Math.max(prev - 25, 50));
    } else if (direction === 'reset') {
      setZoomLevel(100);
    }
  };

  const isImageFile = ['jpg', 'jpeg', 'png', 'gif']?.includes(document?.type?.toLowerCase());
  const isPdfFile = document?.type?.toLowerCase() === 'pdf';

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg clinical-shadow-lg w-full h-full max-w-6xl max-h-[95vh] m-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={20} className="text-primary" />
              <div>
                <h2 className="text-lg font-semibold text-foreground">{document?.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {document?.uploadDate} • {document?.doctor && `Dr. ${document?.doctor}`}
                </p>
              </div>
            </div>
            
            {document?.status && (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                document?.status === 'verified' 
                  ? 'bg-success/10 text-success'
                  : document?.status === 'pending' ?'bg-warning/10 text-warning' :'bg-muted text-muted-foreground'
              }`}>
                <Icon name="Shield" size={12} className="mr-1" />
                {document?.status}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* Zoom Controls for Images */}
            {isImageFile && (
              <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleZoom('out')}
                  disabled={zoomLevel <= 50}
                  iconName="ZoomOut"
                />
                <span className="text-sm text-muted-foreground px-2">
                  {zoomLevel}%
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleZoom('in')}
                  disabled={zoomLevel >= 200}
                  iconName="ZoomIn"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleZoom('reset')}
                  iconName="RotateCcw"
                />
              </div>
            )}

            {/* Action Buttons */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAction(() => onDownload(document))}
              disabled={isLoading}
              iconName="Download"
              iconPosition="left"
            >
              Download
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAction(() => onShare(document))}
              disabled={isLoading}
              iconName="Share2"
              iconPosition="left"
            >
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAction(() => onPrint(document))}
              disabled={isLoading}
              iconName="Printer"
              iconPosition="left"
            >
              Print
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {isImageFile ? (
            <div className="h-full overflow-auto bg-muted/20 flex items-center justify-center p-4">
              <div 
                className="transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel / 100})` }}
              >
                <Image
                  src={document?.thumbnail || `https://picsum.photos/800/1000?random=${document?.id}`}
                  alt={document?.name}
                  className="max-w-none clinical-shadow-md rounded-lg"
                />
              </div>
            </div>
          ) : isPdfFile ? (
            <div className="h-full bg-muted/20 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Icon name="FileText" size={64} className="mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-medium text-foreground">PDF Document</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    PDF preview is not available in this demo.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Use the download button to view the full document.
                  </p>
                </div>
                <Button
                  onClick={() => handleAction(() => onDownload(document))}
                  iconName="Download"
                  iconPosition="left"
                >
                  Download PDF
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full bg-muted/20 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Icon name="File" size={64} className="mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-medium text-foreground">Document Preview</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Preview not available for this file type.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    File type: {document?.type?.toUpperCase()}
                  </p>
                </div>
                <Button
                  onClick={() => handleAction(() => onDownload(document))}
                  iconName="Download"
                  iconPosition="left"
                >
                  Download File
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Document Info */}
        <div className="border-t border-border p-4 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>Size: {(document?.size / 1024 / 1024)?.toFixed(2)} MB</span>
              <span>Type: {document?.type?.toUpperCase()}</span>
              {document?.encrypted && (
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="Lock" size={14} />
                  <span>AES Encrypted</span>
                </div>
              )}
            </div>
            
            {document?.annotation && (
              <div className="max-w-md">
                <p className="text-sm text-foreground">
                  <span className="font-medium">Note:</span> {document?.annotation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;