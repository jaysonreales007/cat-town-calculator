import axios from 'axios';
import React, { useState, useEffect } from 'react';

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

        const price = (10000 * catSupply) / (5000 + ((10000 * floofSupply + 5000 * ethBalance) / ethBalance));
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

export default CatsExchangeRate;