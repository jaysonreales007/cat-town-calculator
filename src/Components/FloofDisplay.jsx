import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaCopy } from 'react-icons/fa';

import Footer from './Footer';
import DonationSection from './DonationSection';
import copyToClipboard from './copyToClipboard';
import Changelog from './Changelog';

function EthExchangeRate() {
  const [ethAmount, setEthAmount] = useState('');
  const [usdAmount, setUsdAmount] = useState('');
  const [phpAmount, setPhpAmount] = useState('');
  const [ethPrice, setEthPrice] = useState({ usd: null, php: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,php');
        setEthPrice({
          usd: response.data.ethereum.usd,
          php: response.data.ethereum.php
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch ETH price:', err);
        setError('Failed to fetch current ETH price. Please try again later.');
        setLoading(false);
      }
    };

    fetchEthPrice();
    const intervalId = setInterval(fetchEthPrice, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleEthChange = (e) => {
    const value = e.target.value;
    if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
      setEthAmount(value);
      setUsdAmount(value && ethPrice.usd ? (parseFloat(value) * ethPrice.usd).toFixed(2) : '');
      setPhpAmount(value && ethPrice.php ? (parseFloat(value) * ethPrice.php).toFixed(2) : '');
    }
  };

  if (loading) return <div className="bg-white p-4 rounded-lg shadow-md mt-6">Loading $ETH exchange rate...</div>;
  if (error) return <div className="bg-white p-4 rounded-lg shadow-md mt-6 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h3 className="text-2xl font-semibold mb-4 text-blue-600">ETH Exchange Rate</h3>
      <p className="mb-4">Current $ETH Price: ${ethPrice.usd.toFixed(2)} USD / ₱{ethPrice.php.toFixed(2)} PHP</p>
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="ethInput" className="block text-sm font-medium text-gray-700 mb-1">Enter ETH amount:</label>
          <input
            id="ethInput"
            type="number"
            value={ethAmount}
            min="0"
            onChange={handleEthChange}
            className="w-full p-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
            placeholder="0.00"
          />
        </div>
        <div className="relative">
          <label htmlFor="usdOutput" className="block text-sm font-medium text-gray-700 mb-1">USD</label>
          <input
            id="usdOutput"
            type="text"
            value={usdAmount ? `$${usdAmount}` : ''}
            disabled
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md pr-10"
            placeholder="$0.00"
          />
          <button 
            onClick={() => copyToClipboard(usdAmount)}
            className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
            aria-label="Copy USD value"
          >
            <FaCopy />
          </button>
        </div>
        <div className="relative">
          <label htmlFor="phpOutput" className="block text-sm font-medium text-gray-700 mb-1">PHP</label>
          <input
            id="phpOutput"
            type="text"
            value={phpAmount ? `₱${phpAmount}` : ''}
            disabled
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md pr-10"
            placeholder="₱0.00"
          />
          <button 
            onClick={() => copyToClipboard(phpAmount)}
            className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
            aria-label="Copy PHP value"
          >
            <FaCopy />
          </button>
        </div>
      </div>
    </div>
  );
}

function KibbleExchangeRate() {
  const [kibbleAmount, setKibbleAmount] = useState('');
  const [usdAmount, setUsdAmount] = useState('');
  const [phpAmount, setPhpAmount] = useState('');
  const [kibblePrice, setKibblePrice] = useState({ usd: null, php: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKibblePrice = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=kibble&vs_currencies=usd,php');
        setKibblePrice({
          usd: response.data.kibble.usd,
          php: response.data.kibble.php
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch KIBBLE price:', err);
        setError('Failed to fetch current KIBBLE price. Please try again later.');
        setLoading(false);
      }
    };

    fetchKibblePrice();
    const intervalId = setInterval(fetchKibblePrice, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleKibbleChange = (e) => {
    const value = e.target.value;
    if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
      setKibbleAmount(value);
      setUsdAmount(value && kibblePrice.usd ? (parseFloat(value) * kibblePrice.usd).toFixed(6) : '');
      setPhpAmount(value && kibblePrice.php ? (parseFloat(value) * kibblePrice.php).toFixed(6) : '');
    }
  };

  if (loading) return <div className="bg-white p-4 rounded-lg shadow-md mt-6">Loading $KIBBLE exchange rate...</div>;
  if (error) return <div className="bg-white p-4 rounded-lg shadow-md mt-6 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h3 className="text-2xl font-semibold mb-4 text-orange-600">KIBBLE Exchange Rate</h3>
      <p className="mb-4">Current $KIBBLE Price: ${kibblePrice.usd.toFixed(6)} USD / ₱{kibblePrice.php.toFixed(6)} PHP</p>
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="kibbleInput" className="block text-sm font-medium text-gray-700 mb-1">Enter $KIBBLE amount:</label>
          <input
            id="kibbleInput"
            type="number"
            value={kibbleAmount}
            min="0"
            onChange={handleKibbleChange}
            className="w-full p-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 text-lg"
            placeholder="0.00"
          />
        </div>
        <div className="relative">
          <label htmlFor="usdOutput" className="block text-sm font-medium text-gray-700 mb-1">USD</label>
          <input
            id="usdOutput"
            type="text"
            value={usdAmount ? `$${usdAmount}` : ''}
            disabled
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md pr-10"
            placeholder="$0.00"
          />
          <button 
            onClick={() => copyToClipboard(usdAmount)}
            className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
            aria-label="Copy USD value"
          >
            <FaCopy />
          </button>
        </div>
        <div className="relative">
          <label htmlFor="phpOutput" className="block text-sm font-medium text-gray-700 mb-1">PHP</label>
          <input
            id="phpOutput"
            type="text"
            value={phpAmount ? `₱${phpAmount}` : ''}
            disabled
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md pr-10"
            placeholder="₱0.00"
          />
          <button 
            onClick={() => copyToClipboard(phpAmount)}
            className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
            aria-label="Copy PHP value"
          >
            <FaCopy />
          </button>
        </div>
      </div>
    </div>
  );
}

function CatsExchangeRate() {
  const [catsAmount, setCatsAmount] = useState('');
  const [ethAmount, setEthAmount] = useState('');
  const [usdAmount, setUsdAmount] = useState('');
  const [phpAmount, setPhpAmount] = useState('');
  const [catsPrice, setCatsPrice] = useState(null);
  const [ethPrice, setEthPrice] = useState({ usd: null, php: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const [catsResponse, ethResponse] = await Promise.all([
          axios.get('https://api.cat.town/v1/town_square'),
          axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,php')
        ]);

        const catsData = catsResponse.data;
        const ethBalance = parseFloat(catsData.find(item => item.data_name === "eth_balance").data_value) / 1e18;
        const floofSupply = parseFloat(catsData.find(item => item.data_name === "market_furballs").data_value);
        const catSupply = parseFloat(catsData.find(item => item.data_name === "total_cats").data_value);

        /* const price = (30225 * catSupply) / (5000 + ((10000 * floofSupply + 5000 * ethBalance) / ethBalance)); */
        const price = 30225 * catSupply / (5e3 + (1e4 * floofSupply + 5e3 * ethBalance) / ethBalance);
        setCatsPrice(price);

        setEthPrice({
          usd: ethResponse.data.ethereum.usd,
          php: ethResponse.data.ethereum.php
        });

        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch prices:', err);
        setError('Failed to fetch current prices. Please try again later.');
        setLoading(false);
      }
    };

    fetchPrices();
    const intervalId = setInterval(fetchPrices, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleCatsChange = (e) => {
    const value = e.target.value;
    if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
      setCatsAmount(value);
      const ethValue = value && catsPrice ? parseFloat(value) * catsPrice : 0;
      setEthAmount(ethValue.toFixed(6));
      setUsdAmount(ethValue && ethPrice.usd ? (ethValue * ethPrice.usd).toFixed(2) : '');
      setPhpAmount(ethValue && ethPrice.php ? (ethValue * ethPrice.php).toFixed(2) : '');
    }
  };

  if (loading) return <div className="bg-white p-4 rounded-lg shadow-md mt-6">Loading $CATS exchange rate...</div>;
  if (error) return <div className="bg-white p-4 rounded-lg shadow-md mt-6 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h3 className="text-2xl font-semibold mb-4 text-purple-600">CATS Exchange Rate</h3>
      <p className="mb-4">Current $CATS Price: {catsPrice.toFixed(6)} ETH (${(catsPrice * ethPrice.usd).toFixed(2)} USD / ₱{(catsPrice * ethPrice.php).toFixed(2)} PHP)</p>
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="catsInput" className="block text-sm font-medium text-gray-700 mb-1">Enter $CATS amount:</label>
          <input
            id="catsInput"
            type="number"
            value={catsAmount}
            min="0"
            onChange={handleCatsChange}
            className="w-full p-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-lg"
            placeholder="0.00"
          />
        </div>
        <div className="relative">
          <label htmlFor="ethOutput" className="block text-sm font-medium text-gray-700 mb-1">ETH</label>
          <input
            id="ethOutput"
            type="text"
            value={ethAmount ? `${ethAmount} ETH` : ''}
            disabled
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md pr-10"
            placeholder="0.00 ETH"
          />
          <button 
            onClick={() => copyToClipboard(ethAmount)}
            className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
            aria-label="Copy ETH value"
          >
            <FaCopy />
          </button>
        </div>
        <div className="relative">
          <label htmlFor="usdOutput" className="block text-sm font-medium text-gray-700 mb-1">USD</label>
          <input
            id="usdOutput"
            type="text"
            value={usdAmount ? `$${usdAmount}` : ''}
            disabled
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md pr-10"
            placeholder="$0.00"
          />
          <button 
            onClick={() => copyToClipboard(usdAmount)}
            className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
            aria-label="Copy USD value"
          >
            <FaCopy />
          </button>
        </div>
        <div className="relative">
          <label htmlFor="phpOutput" className="block text-sm font-medium text-gray-700 mb-1">PHP</label>
          <input
            id="phpOutput"
            type="text"
            value={phpAmount ? `₱${phpAmount}` : ''}
            disabled
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md pr-10"
            placeholder="₱0.00"
          />
          <button 
            onClick={() => copyToClipboard(phpAmount)}
            className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
            aria-label="Copy PHP value"
          >
            <FaCopy />
          </button>
        </div>
      </div>
    </div>
  );
}

function FloofDisplay({ cats, handleInputChange, floofData, boosts, handleBoostChange, boostPercentage }) {


  const applyBoost = (value) => {
    return value * (1 + boostPercentage / 100);
  };

  const formatCatsPerTime = (value) => {
    if (value === 0) return '0.0';
    const [, decimal] = value.toFixed(20).split('.');
    const significantDigit = decimal.match(/[1-9]/);
    if (!significantDigit) return '0.0';
    const zeroCount = significantDigit.index;
    return <span>0.0<sub>{zeroCount}</sub>{significantDigit[0]}</span>;
  };
  
  const handleCatsInputChange = (e) => {
    const value = e.target.value;
    // Only allow non-negative numbers
    if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
      handleInputChange(e);
    }
  };
  return (
    <div className="p-6 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-xl shadow-lg relative overflow-hidden">
      
      <span className="absolute inset-x-0 top-0 h-[2px] bg-cyan-400 opacity-0 animate-[neon-flow-h_4s_infinite]"></span>
      <span className="absolute inset-y-0 right-0 w-[2px] bg-cyan-400 opacity-0 animate-[neon-flow-v_4s_infinite_1s]"></span>
      <span className="absolute inset-x-0 bottom-0 h-[2px] bg-cyan-400 opacity-0 animate-[neon-flow-h_4s_infinite_2s]"></span>
      <span className="absolute inset-y-0 left-0 w-[2px] bg-cyan-400 opacity-0 animate-[neon-flow-v_4s_infinite_3s]"></span>
      
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6 text-white text-center">Cat Town FLOOF Calculator</h1>
        <div className="mb-6 flex justify-center items-center bg-white p-1 rounded-full">
          <img 
            src="/img/kibble.png" 
            alt="Cat Town Logo" 
            className="w-32 h-32 rounded-full animate-flip"
          />
        </div>
      </div>
      <input  
        type="text"
        value={cats}
        onChange={handleInputChange}
        min="0"
        className="w-full p-3 mb-6 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-lg"
        placeholder="How many cats do you have?"
      />

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-green-600">😸FLOOF Boosts</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={boosts.founderPFP}
              onChange={() => handleBoostChange('founderPFP')}
              className="form-checkbox h-5 w-5 text-green-600"
            />
            <span>Own Founder Collection Profile Picture (+5%)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={boosts.stake}
              onChange={() => handleBoostChange('stake')}
              className="form-checkbox h-5 w-5 text-green-600"
            />
            <span>Stake up to 500,000 (+5%)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={boosts.fanTokenHolder}
              onChange={() => handleBoostChange('fanTokenHolder')}
              className="form-checkbox h-5 w-5 text-green-600"
            />
            <span>Fan Token Holder (+1%)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={boosts.gachaCollections}
              onChange={() => handleBoostChange('gachaCollections')}
              className="form-checkbox h-5 w-5 text-green-600"
            />
            <span>Complete and hand in Gacha Collections (+1%)</span>
          </label>
        </div>
        <p className="mt-4 font-bold">Total Boost: {boostPercentage}%</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-purple-600">😺FLOOFS Generation:</h3>
          <p className="mb-2">FLOOFS per second: <span className="font-bold">{floofData.floofsPerSecond.toFixed(2)}</span></p>
          <p className="mb-2">FLOOFS per minute: <span className="font-bold">{floofData.floofsPerMinute.toFixed(2)}</span></p>
          <p className="mb-2">FLOOFS per hour: <span className="font-bold">{floofData.floofsPerHour.toFixed(2)}</span></p>
          <p>FLOOFS per day: <span className="font-bold">{floofData.floofsPerDay.toFixed(2)}</span></p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-pink-600">🐈CATS Generation:</h3>
          <p className="mb-2">CATS per second: <span className="font-bold">{formatCatsPerTime(floofData.catsPerSecond)}</span></p>
          <p className="mb-2">CATS per minute: <span className="font-bold">{formatCatsPerTime(floofData.catsPerMinute)}</span></p>
          <p className="mb-2">CATS per hour: <span className="font-bold">{formatCatsPerTime(floofData.catsPerHour)}</span></p>
          <p className="mb-2">CATS per day: <span className="font-bold">{floofData.catsPerDay.toFixed(2)}</span></p>
          <p className="mb-2">CATS per week: <span className="font-bold">{floofData.catsPerWeek.toFixed(2)}</span></p>
          <p>CATS per month: <span className="font-bold">{floofData.catsPerMonth.toFixed(2)}</span></p>
        </div>
      </div>
      <EthExchangeRate />
      <KibbleExchangeRate />
      <CatsExchangeRate />
      <DonationSection />
      <Changelog />
      <Footer />
    </div>
  );
}
  
  export default FloofDisplay;
