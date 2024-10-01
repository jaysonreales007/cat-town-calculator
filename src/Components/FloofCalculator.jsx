import { useState, useEffect } from 'react';
import FloofDisplay from './FloofDisplay';

function FloofCalculator() {
  const [cats, setCats] = useState('');
  const [boosts, setBoosts] = useState({
    founderPFP: false,
    stake: false,
    gachaCollections: false,
  });
  const [boostPercentage, setBoostPercentage] = useState(0);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setCats(value);
    }
  };

  const handleBoostChange = (boost) => {
    setBoosts(prevBoosts => ({
      ...prevBoosts,
      [boost]: !prevBoosts[boost]
    }));
  };

  useEffect(() => {
    let totalBoost = 0;
    if (boosts.founderPFP) totalBoost += 5;
    if (boosts.stake) totalBoost += 5;
    if (boosts.gachaCollections) totalBoost += 1;

    setBoostPercentage(totalBoost);
  }, [boosts]);

  const applyBoost = (value) => {
    return value * (1 + boostPercentage / 100);
  };

  const numericCats = parseFloat(cats) || 0;

  const baseFloofsPerDay = numericCats * 8640000 / 100;
  const floofsPerDay = applyBoost(baseFloofsPerDay);
  const floofsPerHour = floofsPerDay / 24;
  const floofsPerMinute = floofsPerHour / 60;
  const floofsPerSecond = floofsPerMinute / 60;

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
      boosts={boosts}
      handleBoostChange={handleBoostChange}
      boostPercentage={boostPercentage}
    />
  );
}

export default FloofCalculator;