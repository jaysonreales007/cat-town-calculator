import Swal from "sweetalert2";

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      if (text) {
        Swal.fire({
          icon: 'success',
          title: 'Copied!',
          text: 'Value has been copied to your clipboard.',
          timer: 2000,
          showConfirmButton: false,
          position: 'top-end',
          toast: true
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Cannot copy empty value.',
          timer: 2000,
          showConfirmButton: false,
          position: 'top-end',
          toast: true
        });
      }
    }).catch(err => {
      console.error('Failed to copy: ', err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to copy value. Please try again.',
      });
    });
};
  
export default copyToClipboard;