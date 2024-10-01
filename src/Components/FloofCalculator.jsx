import { useState, useEffect } from 'react';
import FloofDisplay from './FloofDisplay';

function FloofCalculator() {
  const [cats, setCats] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');

  const [boosts, setBoosts] = useState({
    founderPFP: false,
    stake: false,
    fanTokenHolder: false
  });

  const [boostPercentage, setBoostPercentage] = useState(0);
  const [lockDuration, setLockDuration] = useState('noLock');

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setCats(value);
    }
  };

  const handleStakeAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setStakeAmount(value);
    }
  };

  const handleLockDurationChange = (duration) => {
    setLockDuration(duration);
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
    if (boosts.fanTokenHolder) totalBoost += 1;

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

  const getLockDurationText = (duration) => {
    switch (duration) {
      case '3days': return '3-day';
      case '7days': return '7-day';
      case '30days': return '30-day';
      default: return '';
    }
  };

  const calculateEstimatedEarnings = (duration) => {
    let multiplier;
    switch (duration) {
      case '3days': multiplier = 1.25; break;
      case '7days': multiplier = 2.0; break;
      case '30days': multiplier = 3.5; break;
      default: multiplier = 1.0;
    }

    const numericStakeAmount = parseFloat(stakeAmount) || 0;
    const baseEarnings = (numericStakeAmount / 10000) * 0.001 * floofsPerDay;

    const result = (baseEarnings * multiplier).toFixed(2);

    return result;
  };

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
      floofData={{
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
      }}
      boosts={boosts}
      handleBoostChange={handleBoostChange}
      boostPercentage={boostPercentage}
      lockDuration={lockDuration}
      handleLockDurationChange={handleLockDurationChange}
      getLockDurationText={getLockDurationText}
      calculateEstimatedEarnings={calculateEstimatedEarnings}
      stakeAmount={stakeAmount}
      handleStakeAmountChange={handleStakeAmountChange}
    />
  );
}

export default FloofCalculator;