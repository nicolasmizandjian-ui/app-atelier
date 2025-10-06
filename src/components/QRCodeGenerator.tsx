import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeGeneratorProps {
  data: string;
  size?: number;
  id?: string;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  data, 
  size = 200, 
  id = 'qrcode-canvas' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const generateQRCode = async () => {
      try {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Configuration du QR Code
        const options = {
          width: size,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          },
          errorCorrectionLevel: 'M' as const
        };

        // Créer l'URL complète avec les données
        const baseUrl = window.location.origin;
        const encodedData = encodeURIComponent(data);
        const qrUrl = `${baseUrl}/stock-info?data=${encodedData}`;

        // Générer le QR code avec l'URL
        await QRCode.toCanvas(canvas, qrUrl, options);

      } catch (error) {
        console.error('Erreur lors de la génération du QR code:', error);
        
        // Fallback: créer un QR code avec les données directement
        try {
          const canvas = canvasRef.current;
          if (canvas) {
            await QRCode.toCanvas(canvas, data, {
              width: size,
              margin: 1,
              color: {
                dark: '#000000',
                light: '#FFFFFF'
              }
            });
          }
        } catch (fallbackError) {
          console.error('Erreur lors du fallback:', fallbackError);
        }
      }
    };

    generateQRCode();
  }, [data, size]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className="border border-gray-300 rounded-lg bg-white"
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};