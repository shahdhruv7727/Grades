import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toast = ({ type, message }) => {
 
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'info':
        toast.info(message);
        break;
      case 'warn':
      case 'warning':
        toast.warn(message);
        break;
      default:
        toast(message);
        break;
    }

    
};
