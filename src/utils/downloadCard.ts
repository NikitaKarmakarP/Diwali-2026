import { toPng } from 'html-to-image';

export interface DownloadCardOptions {
  fileName?: string;
  pixelRatio?: number;
}

export async function exportCardAsPng(
  element: HTMLElement,
  options: DownloadCardOptions = {}
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!element) {
      return { success: false, error: 'Target card element not found.' };
    }

    // Ensure all web fonts (such as Cinzel, Outfit, Noto Sans Bengali) are fully loaded
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    // Slight delay to ensure layout and SVG filters are settled
    await new Promise((resolve) => setTimeout(resolve, 120));

    const pixelRatio = options.pixelRatio || 2; // High-DPI export

    const dataUrl = await toPng(element, {
      pixelRatio,
      cacheBust: true,
      skipFonts: false,
      style: {
        transform: 'none',
        margin: '0',
      },
      filter: (node) => {
        // Exclude elements marked as no-export
        if (node instanceof HTMLElement && node.dataset.noExport === 'true') {
          return false;
        }
        return true;
      },
    });

    // Create a virtual download link
    const link = document.createElement('a');
    link.download = options.fileName || 'Diwali-Galaxy-Wish.png';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return { success: true };
  } catch (err) {
    console.error('Error exporting card to PNG:', err);
    return {
      success: false,
      error: 'Failed to generate PNG image. Please ensure your browser supports canvas capture.',
    };
  }
}
