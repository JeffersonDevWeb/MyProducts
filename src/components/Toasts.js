import { toast } from 'react-toastify';

const options = {
  position: 'bottom-right',
  autoClose: 1800,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export const sucess = (message) => toast.success(message, options);

export const error = (message) => toast.error(message, options);
