export function getPricing(grams: number) {
  let daily, weekly, monthly;
  
  if (grams <= 250) {
    daily = 250; 
    weekly = 1500; 
    monthly = 4000;
  } else if (grams >= 800) {
    daily = 400; 
    weekly = 2500; 
    monthly = 8000;
  } else if (grams < 500) {
    const p = (grams - 250) / 250;
    daily = Math.round(250 + p * 100);
    weekly = Math.round(1500 + p * 500);
    monthly = Math.round(4000 + p * 2000);
  } else {
    const p = (grams - 500) / 300;
    daily = Math.round(350 + p * 50);
    weekly = Math.round(2000 + p * 500);
    monthly = Math.round(6000 + p * 2000);
  }
  
  const full = { daily, weekly, monthly };
  const half = {
    daily: Math.round(daily * 0.6), // Slightly more than 50% for overhead
    weekly: Math.round(weekly * 0.6),
    monthly: Math.round(monthly * 0.6),
  };
  
  return { full, half };
}
