import { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { useRouter } from 'next/router';

export default function QRScanner() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to hold error messages
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function startCamera() {
      try {
        console.log('Starting camera...');
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error('Error accessing the camera: ', err);
        setErrorMessage('Camera access was denied or is not supported on this device.');
      }
    }

    startCamera();
  }, []);

  useEffect(() => {
    function scanQRCode() {
      if (videoRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (context && videoRef.current) {
          // Set the canvas dimensions to match the video
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;

          // Draw the video frame onto the canvas
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

          // Get the image data from the canvas
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

          // Use jsQR to detect and decode the QR code
          const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

          if (qrCode) {
            console.log('QR Code detected:', qrCode.data); // Log the detected QR code
            const uuid = qrCode.data; // Assuming the QR code directly contains the UUID as its data
            router.replace({
              pathname: router.pathname,
              query: { ...router.query, uuid: uuid },
            });
          } else {
            requestAnimationFrame(scanQRCode); // Continue scanning if no QR code is found
          }
        }
      }
    }

    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', scanQRCode);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', scanQRCode);
      }
    };
  }, [router]);

  if (errorMessage) {
    // If there's an error, show the error message
    return <div className="error-message">{errorMessage}</div>;
  }

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%', height: 'auto' }} playsInline></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
}
