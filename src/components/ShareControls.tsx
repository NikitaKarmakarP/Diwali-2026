import React, { useState } from 'react';
import { WishData } from '../types/wish';
import { copyToClipboard, shareToWhatsApp, shareViaWebShare } from '../utils/shareUtils';
import { Share2, Check, Copy, MessageCircle, AlertCircle, QrCode, X, Sparkles } from 'lucide-react';

interface ShareControlsProps {
  wish: WishData;
  shareUrl: string;
}

export const ShareControls: React.FC<ShareControlsProps> = ({ wish, shareUrl }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [showQrModal, setShowQrModal] = useState(false);
  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  const handleCopy = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 3000);
    } else {
      setCopyStatus('failed');
      setTimeout(() => setCopyStatus('idle'), 4000);
    }
  };

  const handleWhatsApp = () => {
    shareToWhatsApp(wish, shareUrl);
  };

  const handleNativeShare = async () => {
    const shared = await shareViaWebShare(wish, shareUrl);
    if (!shared) {
      handleCopy();
    }
  };

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
    shareUrl
  )}&color=080F27&bgcolor=FFF1D0&margin=12`;

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {/* WhatsApp Button */}
        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex items-center justify-center space-x-2.5 px-5 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-semibold text-sm shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>Share on WhatsApp</span>
        </button>

        {/* Copy Link Button */}
        <button
          type="button"
          onClick={handleCopy}
          className={`flex items-center justify-center space-x-2.5 px-5 py-3.5 rounded-2xl font-semibold text-sm transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-galaxy-gold ${
            copyStatus === 'copied'
              ? 'bg-emerald-600 text-white shadow-[0_4px_16px_rgba(16,185,129,0.3)]'
              : copyStatus === 'failed'
              ? 'bg-rose-700 text-white'
              : 'bg-galaxy-royal/80 hover:bg-galaxy-royal text-galaxy-ivory border border-galaxy-gold/30 hover:border-galaxy-gold/60'
          }`}
        >
          {copyStatus === 'copied' ? (
            <>
              <Check className="w-5 h-5 text-white" />
              <span>Link Copied!</span>
            </>
          ) : copyStatus === 'failed' ? (
            <>
              <AlertCircle className="w-5 h-5 text-white" />
              <span>Copy Failed (Select Below)</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5 text-galaxy-gold" />
              <span>Copy Greeting Link</span>
            </>
          )}
        </button>

        {/* QR Code and Web Share */}
        <button
          type="button"
          onClick={() => setShowQrModal(true)}
          className="flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl bg-galaxy-midnight/80 hover:bg-galaxy-royal text-galaxy-gold border border-galaxy-gold/30 text-xs sm:text-sm font-medium transition-colors"
        >
          <QrCode className="w-4 h-4 text-galaxy-gold" />
          <span>Show Scanable QR Code</span>
        </button>

        {hasNativeShare ? (
          <button
            type="button"
            onClick={handleNativeShare}
            className="flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl bg-galaxy-midnight/80 hover:bg-galaxy-royal text-galaxy-lavender border border-galaxy-lavender/30 text-xs sm:text-sm font-medium transition-colors"
          >
            <Share2 className="w-4 h-4 text-galaxy-lavender" />
            <span>Device Share Sheet</span>
          </button>
        ) : (
          <div className="flex items-center justify-center px-4 py-3 rounded-2xl bg-galaxy-midnight/40 border border-white/5 text-[11px] text-galaxy-lavender/60">
            <span>Scan or copy link to share</span>
          </div>
        )}
      </div>

      {/* Share URL Box for visual verification */}
      <div className="w-full bg-galaxy-midnight/70 border border-galaxy-gold/20 rounded-xl p-2.5 flex items-center space-x-2">
        <input
          type="text"
          readOnly
          value={shareUrl}
          aria-label="Greeting shareable link URL"
          className="flex-1 bg-transparent text-xs text-galaxy-lavender/80 font-mono focus:outline-none truncate select-all px-1"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="text-xs px-2.5 py-1 rounded-lg bg-galaxy-gold/20 text-galaxy-gold hover:bg-galaxy-gold/30 font-medium transition-colors"
        >
          {copyStatus === 'copied' ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-galaxy-midnight/85 backdrop-blur-md">
          <div className="relative w-full max-w-sm glass-panel-gold rounded-3xl p-6 sm:p-8 border border-galaxy-gold/40 text-center shadow-2xl">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-galaxy-ivory/70 hover:text-galaxy-gold"
              aria-label="Close QR dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-galaxy-gold bg-galaxy-gold/15 border border-galaxy-gold/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Mobile Scan</span>
            </div>

            <h3 className="font-serif font-bold text-xl text-galaxy-ivory mb-1">
              Diwali Wish for {wish.recipient}
            </h3>
            <p className="text-xs text-galaxy-lavender/80 mb-5">
              Point any smartphone camera at this QR code to unlock the magical floating envelope instantly!
            </p>

            {/* QR Code Graphic Frame */}
            <div className="p-4 rounded-2xl bg-[#FFF1D0] inline-block shadow-xl border-2 border-galaxy-gold/50 mx-auto mb-4">
              <img
                src={qrImageUrl}
                alt={`QR code for Diwali greeting to ${wish.recipient}`}
                width={220}
                height={220}
                className="w-48 h-48 sm:w-52 sm:h-52 object-contain block"
              />
            </div>

            <p className="text-[11px] text-galaxy-lavender/70 font-mono break-all truncate max-w-xs mx-auto mb-4">
              {shareUrl}
            </p>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-galaxy-royal/80 hover:bg-galaxy-royal border border-galaxy-gold/30 text-galaxy-ivory text-xs font-semibold transition-colors"
            >
              Close QR View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
