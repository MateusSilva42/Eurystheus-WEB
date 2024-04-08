import { toast, type ToastOptions } from 'vue3-toastify';

export function useToast() {
    
  const success = (message: string) => {
    toast(message, {
      type: 'success',
      autoClose: 2000,
      position: toast.POSITION.TOP_CENTER,
    } as ToastOptions);
  };

  const error = (message: string) => {
    toast(message, {
      type: 'error',
      autoClose: 2000,
      position: toast.POSITION.TOP_CENTER,
    } as ToastOptions);
  };

  const defaultMsg = (message: string) => {
    toast(message, {
      autoClose: 2000,
      position: toast.POSITION.TOP_CENTER,
    } as ToastOptions);
  };

  return {
    success,
    error,
    defaultMsg,
  };
}