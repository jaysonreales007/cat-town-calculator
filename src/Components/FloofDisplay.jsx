function FloofDisplay({ cats, handleInputChange, floofData }) {
  const formatCatsPerTime = (value) => {
    if (value === 0) return '0.0';
    const [, decimal] = value.toFixed(20).split('.');
    const significantDigit = decimal.match(/[1-9]/);
    if (!significantDigit) return '0.0';
    const zeroCount = significantDigit.index;
    return <span>0.0<sub>{zeroCount}</sub>{significantDigit[0]}</span>;
  };

  return (
    <div className="p-6 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-xl shadow-lg">
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
        className="w-full p-3 mb-6 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-lg"
        placeholder="How many cats do you have?"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-purple-600">FLOOFS Generation:</h3>
          <p className="mb-2">FLOOFS per second: <span className="font-bold">{floofData.floofsPerSecond.toFixed(2)}</span></p>
          <p className="mb-2">FLOOFS per minute: <span className="font-bold">{floofData.floofsPerMinute.toFixed(2)}</span></p>
          <p className="mb-2">FLOOFS per hour: <span className="font-bold">{floofData.floofsPerHour.toFixed(2)}</span></p>
          <p>FLOOFS per day: <span className="font-bold">{floofData.floofsPerDay.toFixed(2)}</span></p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-pink-600">CATS Generation:</h3>
          <p className="mb-2">CATS per second: <span className="font-bold">{formatCatsPerTime(floofData.catsPerSecond)}</span></p>
          <p className="mb-2">CATS per minute: <span className="font-bold">{formatCatsPerTime(floofData.catsPerMinute)}</span></p>
          <p className="mb-2">CATS per hour: <span className="font-bold">{formatCatsPerTime(floofData.catsPerHour)}</span></p>
          <p className="mb-2">CATS per day: <span className="font-bold">{floofData.catsPerDay.toFixed(2)}</span></p>
          <p className="mb-2">CATS per week: <span className="font-bold">{floofData.catsPerWeek.toFixed(2)}</span></p>
          <p>CATS per month: <span className="font-bold">{floofData.catsPerMonth.toFixed(2)}</span></p>
        </div>
      </div>
    </div>
  );
}

export default FloofDisplay;