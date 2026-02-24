// SVG icons for bike categories and accessories
// Using simple pre-built SVGs with base64 encoding for reliable local icons

const svgToDataUrl = (svgString) => {
  try {
    // Use base64 encoding for SVG - more reliable than UTF-8
    return `data:image/svg+xml;base64,${btoa(svgString)}`;
  } catch (e) {
    console.error('SVG encoding error:', e);
    return 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=';
  }
};

const createSuspensionSVG = (color) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="${color}20" rx="4"/>
  <line x1="30" y1="40" x2="30" y2="70" stroke="${color}" stroke-width="2"/>
  <line x1="70" y1="40" x2="70" y2="70" stroke="${color}" stroke-width="2"/>
  <circle cx="30" cy="40" r="4" fill="${color}"/>
  <circle cx="70" cy="40" r="4" fill="${color}"/>
  <path d="M 30 70 Q 30 80 35 85" fill="none" stroke="${color}" stroke-width="2"/>
  <path d="M 70 70 Q 70 80 65 85" fill="none" stroke="${color}" stroke-width="2"/>
</svg>`;

const createBrakeSVG = (color) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="${color}20" rx="4"/>
  <circle cx="50" cy="50" r="20" fill="none" stroke="${color}" stroke-width="2"/>
  <rect x="38" y="38" width="24" height="24" fill="${color}40" stroke="${color}" stroke-width="1"/>
  <line x1="50" y1="30" x2="50" y2="20" stroke="${color}" stroke-width="2"/>
</svg>`;

const createComingSoonSVG = (color) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="${color}20" rx="4"/>
  <circle cx="50" cy="50" r="25" fill="none" stroke="${color}" stroke-width="2"/>
  <text x="50" y="60" font-size="28" font-weight="bold" fill="${color}" text-anchor="middle">?</text>
</svg>`;

// Simple bike icon SVGs
const createBikeSVG = (color, label) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="${color}20" rx="4"/>
  <circle cx="30" cy="60" r="15" fill="none" stroke="${color}" stroke-width="2"/>
  <circle cx="70" cy="60" r="15" fill="none" stroke="${color}" stroke-width="2"/>
  <path d="M 45 50 L 50 35 L 55 50" fill="none" stroke="${color}" stroke-width="1.5"/>
  <line x1="45" y1="50" x2="30" y2="60" stroke="${color}" stroke-width="1.5"/>
  <line x1="55" y1="50" x2="70" y2="60" stroke="${color}" stroke-width="1.5"/>
</svg>`;

const createWaterBottleSVG = (color) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="${color}20" rx="4"/>
  <path d="M 40 25 L 40 70 Q 40 80 50 80 Q 60 80 60 70 L 60 25 Z" fill="none" stroke="${color}" stroke-width="2"/>
  <rect x="42" y="20" width="16" height="8" fill="${color}40" stroke="${color}" stroke-width="1"/>
</svg>`;

const createHelmetSVG = (color) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="${color}20" rx="4"/>
  <path d="M 30 50 Q 30 30 50 25 Q 70 30 70 50 L 68 65 Q 50 72 32 65 Z" fill="none" stroke="${color}" stroke-width="2"/>
  <line x1="35" y1="55" x2="65" y2="55" stroke="${color}" stroke-width="1"/>
</svg>`;

const createSprocketSVG = (color) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="${color}20" rx="4"/>
  <circle cx="50" cy="50" r="20" fill="none" stroke="${color}" stroke-width="1.5"/>
  <circle cx="50" cy="50" r="10" fill="none" stroke="${color}" stroke-width="1"/>
  <rect x="48" y="30" width="4" height="6" fill="${color}"/>
  <rect x="48" y="64" width="4" height="6" fill="${color}"/>
  <rect x="30" y="48" width="6" height="4" fill="${color}"/>
  <rect x="64" y="48" width="6" height="4" fill="${color}"/>
</svg>`;

// Generic placeholder options for when adding new products/categories
export const genericPlaceholders = {
  General: [
    svgToDataUrl(createBikeSVG('#ec4899', 'Bike')),
    svgToDataUrl(createSuspensionSVG('#8b5cf6')),
    svgToDataUrl(createBrakeSVG('#ef4444')),
    svgToDataUrl(createSprocketSVG('#f59e0b')),
    svgToDataUrl(createWaterBottleSVG('#3b82f6')),
    svgToDataUrl(createComingSoonSVG('#9ca3af')),
  ],
  XC: [
    svgToDataUrl(createBikeSVG('#16a34a', 'XC 1')),
    svgToDataUrl(createBikeSVG('#15803d', 'XC 2')),
    svgToDataUrl(createBikeSVG('#06b6d4', 'XC 3')),
    svgToDataUrl(createBikeSVG('#0891b2', 'XC 4')),
    svgToDataUrl(createSprocketSVG('#f59e0b')),
    svgToDataUrl(createSprocketSVG('#d97706')),
  ],
  Trail: [
    svgToDataUrl(createBikeSVG('#ec4899', 'Trail 1')),
    svgToDataUrl(createBikeSVG('#db2777', 'Trail 2')),
    svgToDataUrl(createBikeSVG('#f97316', 'Trail 3')),
    svgToDataUrl(createBikeSVG('#ea580c', 'Trail 4')),
    svgToDataUrl(createSprocketSVG('#8b5cf6')),
    svgToDataUrl(createSprocketSVG('#7c3aed')),
  ],
  Downcountry: [
    svgToDataUrl(createBikeSVG('#6366f1', 'DWN 1')),
    svgToDataUrl(createBikeSVG('#4f46e5', 'DWN 2')),
    svgToDataUrl(createBikeSVG('#a855f7', 'DWN 3')),
    svgToDataUrl(createBikeSVG('#9333ea', 'DWN 4')),
    svgToDataUrl(createSprocketSVG('#14b8a6')),
    svgToDataUrl(createSprocketSVG('#0d9488')),
  ],
  Enduro: [
    svgToDataUrl(createBikeSVG('#dc2626', 'Enduro 1')),
    svgToDataUrl(createBikeSVG('#b91c1c', 'Enduro 2')),
    svgToDataUrl(createBikeSVG('#f87171', 'Enduro 3')),
    svgToDataUrl(createBikeSVG('#ef4444', 'Enduro 4')),
    svgToDataUrl(createSprocketSVG('#ef4444')),
    svgToDataUrl(createSprocketSVG('#f87171')),
  ],
  Downhill: [
    svgToDataUrl(createBikeSVG('#059669', 'DH 1')),
    svgToDataUrl(createBikeSVG('#047857', 'DH 2')),
    svgToDataUrl(createBikeSVG('#10b981', 'DH 3')),
    svgToDataUrl(createBikeSVG('#06b6d4', 'DH 4')),
    svgToDataUrl(createSprocketSVG('#34d399')),
    svgToDataUrl(createSprocketSVG('#10b981')),
  ],
  Accessories: [
    svgToDataUrl(createWaterBottleSVG('#3b82f6')),
    svgToDataUrl(createWaterBottleSVG('#1d4ed8')),
    svgToDataUrl(createHelmetSVG('#f59e0b')),
    svgToDataUrl(createHelmetSVG('#d97706')),
    svgToDataUrl(createSprocketSVG('#8b5cf6')),
    svgToDataUrl(createSprocketSVG('#7c3aed')),
  ],
};

// Category images (fallback)
export const categoryImages = {
  XC: genericPlaceholders.XC,
  Trail: genericPlaceholders.Trail,
  Downcountry: genericPlaceholders.Downcountry,
  Enduro: genericPlaceholders.Enduro,
  Downhill: genericPlaceholders.Downhill,
  Accessories: genericPlaceholders.Accessories,
};

export const defaultCategoryImages = {
  XC: 'https://images.unsplash.com/photo-1571188733066-c09fc87648d5?w=600&h=400&fit=crop',
  Trail: 'https://images.unsplash.com/photo-1569526029949-ddbe4d96dc3a?w=600&h=400&fit=crop',
  Downcountry: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
  Enduro: 'https://images.unsplash.com/photo-1544715278-ca5e9b90444b?w=600&h=400&fit=crop',
  Downhill: 'https://images.unsplash.com/photo-1579852312765-69d5be2f6f80?w=600&h=400&fit=crop',
};

export const heroImage = 'https://images.unsplash.com/photo-1571188733066-c09fc87648d5?w=1200&h=600&fit=crop&q=80';
export const brandingColors = {
  primary: 'fuchsia',
  secondary: 'cyan',
  dark: 'slate-900',
  light: 'slate-50',
};
