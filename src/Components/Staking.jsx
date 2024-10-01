import FloofCalculator from "./FloofCalculator"

const Staking = () => {
  return (
    <div className="mt-6">
      <h4 className="text-xl font-semibold mb-3 text-blue-600">🐱 Kibble Staking</h4>
      <p className="mb-2">Minimum Stake: 1 KIBBLE (10,000 KIBBLE for 0.1% floof bonus)</p>
      <p className="mb-4">Stake at the Bank in Town Square for extra rewards!</p>
      <h5 className="text-lg font-semibold mb-2">Lock Durations & Multipliers:</h5>
      <div className="space-y-2">
        {['noLock', '3days', '7days', '30days'].map((duration) => (
          <label key={duration} className="flex items-center space-x-2">
            <input
              type="radio"
              name="lockDuration"
              value={duration}
              checked={lockDuration === duration}
              onChange={() => handleLockDurationChange(duration)}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span>{duration === 'noLock' ? 'No Lock (1.0x)' : `${getLockDurationText(duration)} (${duration === '3days' ? '1.25x' : duration === '7days' ? '2.0x' : '3.5x'})`}</span>
          </label>
        ))}
      </div>
      {lockDuration !== 'noLock' && (
        <p className="mt-4 font-bold text-green-600">
          Estimated earnings with {getLockDurationText(lockDuration)} lock: {calculateEstimatedEarnings(lockDuration)}
        </p>
      )}
    </div>
  )
}

export default Staking