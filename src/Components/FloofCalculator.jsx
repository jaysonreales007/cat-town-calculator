import { useState } from 'react';
import FloofDisplay from './FloofDisplay';

function FloofCalculator() {
  const [cats, setCats] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setCats(value);
    }
  };

  const numericCats = parseFloat(cats) || 0;

  const floofsPerDay = numericCats * 8640000 / 100;
  const floofsPerHour = floofsPerDay / 24;
  const floofsPerMinute = floofsPerHour / 60;
  const floofsPerSecond = floofsPerMinute / 60 / 100;

  const catsPerSecond = floofsPerSecond / 8640000;
  const catsPerMinute = floofsPerMinute / 8640000;
  const catsPerHour = floofsPerHour / 8640000;
  const catsPerDay = floofsPerDay / 8640000;
  const catsPerWeek = catsPerDay * 7;
  const catsPerMonth = catsPerDay * 30;

  const floofData = {
    floofsPerSecond,
    floofsPerMinute,
    floofsPerHour,
    floofsPerDay,
    catsPerSecond,
    catsPerMinute,
    catsPerHour,
    catsPerDay,
    catsPerWeek,
    catsPerMonth
  };

  return (
    <FloofDisplay
      cats={cats}
      handleInputChange={handleInputChange}
      floofData={floofData}
    />
  );
}

export default FloofCalculator;