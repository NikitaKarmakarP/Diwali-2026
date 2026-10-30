import React, { useState } from 'react';
import { Download, Loader2, Check, AlertCircle } from 'lucide-react';
import { exportCardAsPng } from '../utils/downloadCard';

interface DownloadCardButtonProps {
  cardRef: React.RefObject<HTMLDivElement>;
  fileName?: string;
}

export const DownloadCardButton: React.FC<DownloadCardButtonProps> = ({ cardRef, fileName }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadState, setDownloadState] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDownload = async () => {
    if (!cardRef.current || downloading) return;

    setDownloading(true);
    setDownloadState('idle');

    try {
      const result = await exportCardAsPng(cardRef.current, {
        fileName: fileName || 'Diwali-Galaxy-Wish.png',
        pixelRatio: 2.5, // Crisp PNG export
      });

      if (result.success) {
        setDownloadState('success');
        setTimeout(() => setDownloadState('idle'), 3500);
      } else {
        setDownloadState('error');
        setTimeout(() => setDownloadState('idle'), 4000);
      }
    } catch {
      setDownloadState('error');
      setTimeout(() => setDownloadState('idle'), 4000);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={downloading}
      className={`inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl font-semibold text-sm transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold ${
        downloadState === 'success'
          ? 'bg-emerald-600 text-white'
          : downloadState === 'error'
          ? 'bg-rose-700 text-white'
          : 'bg-galaxy-royal/90 hover:bg-galaxy-royal text-galaxy-ivory border border-galaxy-gold/30 hover:border-galaxy-gold/60 shadow-md'
      }`}
    >
      {downloading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-galaxy-gold" />
          <span>Generating High-Res PNG...</span>
        </>
      ) : downloadState === 'success' ? (
        <>
          <Check className="w-4 h-4 text-white" />
          <span>Card Downloaded!</span>
        </>
      ) : downloadState === 'error' ? (
        <>
          <AlertCircle className="w-4 h-4 text-white" />
          <span>Download Failed (Retry)</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4 text-galaxy-gold" />
          <span>Download Greeting Card (PNG)</span>
        </>
      )}
    </button>
  );
};
