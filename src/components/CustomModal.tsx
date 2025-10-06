import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function CustomModal({ isOpen, onClose, title, description, children }: CustomModalProps) {
  // Empêcher le scroll du body quand la modal est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          width: '60vw',
          maxWidth: '60vw',
          height: '70vh',
          maxHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          fontFamily: 'var(--font-family-sidebar)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            fontFamily: 'var(--font-family-sidebar)'
          }}
        >
          <div>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              color: '#1A202C',
              margin: 0,
              marginBottom: description ? '8px' : 0,
              fontFamily: 'var(--font-family-sidebar)'
            }}>
              {title}
            </h2>
            {description && (
              <p style={{ 
                color: '#6B7280',
                margin: 0,
                fontSize: '16px',
                fontFamily: 'var(--font-family-sidebar)'
              }}>
                {description}
              </p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #E5E7EB',
              color: '#6B7280',
              padding: '8px',
              fontFamily: 'var(--font-family-sidebar)'
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            backgroundColor: '#FFFFFF',
            fontFamily: 'var(--font-family-sidebar)'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}