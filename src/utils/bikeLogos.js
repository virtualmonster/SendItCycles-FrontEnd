// Photo-realistic bike images stored locally in public/images
export const bikeLogos = {
  // XC - lightweight, nimble, racing geometry
  XC: `/images/1-xc.svg`,
  
  // Trail - balanced all-mountain capability
  Trail: `/images/2-trail.svg`,
  
  // Downcountry - big wheels, aggressive slack geometry
  Downcountry: `/images/3-downcountry.svg`,
  
  // Enduro - very slack, beefy suspension, aggressive
  Enduro: `/images/4-enduro.svg`,
  
  // Downhill - massive frame, long travel, mega slack
  Downhill: `/images/5-downhill.svg`,
};

// Fallback logo for any category
export const defaultLogo = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Cg transform='translate(100,100)'%3E%3Ccircle cx='0' cy='0' r='50' fill='none' stroke='%236366f1' stroke-width='2'/%3E%3Cline x1='-20' y1='0' x2='20' y2='0' stroke='%236366f1' stroke-width='2'/%3E%3Cline x1='0' y1='-20' x2='0' y2='20' stroke='%236366f1' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E`;

export function getCategoryLogo(category) {
  return bikeLogos[category] || defaultLogo;
}
