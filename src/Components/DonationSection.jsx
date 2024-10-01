import DonationOption from './DonationOption'

function DonationSection() {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <h3 className="text-2xl font-semibold mb-4 text-green-600">Support Future Projects</h3>
        <p className="mb-4">If you'd like to donate to support our future projects, you can use any of the following methods:</p>
        <p className="mb-2 text-sm text-gray-600">Click a button to copy the donation address.</p>
        <div className="grid grid-cols-2 gap-4">
          <DonationOption name="Bitcoin" icon="₿" address="32Mxo5roTgaziKJ755tudo2LnhnwrLpGbb" />
          <DonationOption name="Ethereum" icon="Ξ" address="0x5929e28adcd3a244ac1c369a17e3fc31b84cff6a" />
          <DonationOption name="BNB" icon="BNB" address="0x5929e28adcd3a244ac1c369a17e3fc31b84cff6a" />
          <DonationOption name="Moxie" icon="M" address="0x0686534cE8Ef7766Ef4100cbf00277cEE39d91C9" />
        </div>
      </div>
    );
}
  
export default DonationSection;