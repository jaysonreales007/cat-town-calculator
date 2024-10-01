import Swal from "sweetalert2";

function DonationOption({ name, icon, address }) {
    const isMobile = window.innerWidth <= 768;
    const getButtonColor = () => {
      switch (name) {
        case 'Bitcoin': return 'bg-transparent hover:bg-orange-400';
        case 'Ethereum': return 'bg-transparent hover:bg-blue-400';
        case 'BNB': return 'bg-transparent hover:bg-yellow-400';
        case 'Moxie': return 'bg-transparent hover:bg-purple-400';
        default: return 'bg-transparent hover:bg-gray-400';
      }
    };
    const handleClick = () => {
      navigator.clipboard.writeText(address).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Address Copied!',
          text: `${name} address has been copied to your clipboard.`,
          timer: 2000,
          showConfirmButton: false,
          position: isMobile ? 'top' : 'top-end',
          toast: true
        });
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to copy address. Please try again.',
          position: isMobile ? 'top' : 'top-end',
          toast: true
        });
      });
    };
    return (
      <button 
        onClick={handleClick}
        className={`flex items-center justify-center p-2 rounded-lg transition-all duration-300 ${getButtonColor()}`}
      >
        <span className="mr-2 font-bold">{icon}</span>
        <span>{name}</span>
      </button>
    );
}
  
export default DonationOption;