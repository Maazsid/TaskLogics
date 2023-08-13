import { NotificationStore } from './models/notification-store';
import { createWithEqualityFn } from 'zustand/traditional';

export const useNotificationStore = createWithEqualityFn<NotificationStore>(
  (set) => ({
    open: false,
    message: '',
    severity: 'error',
    showNotification: (message = '', severity = 'error') =>
      set(() => {
        return {
          open: true,
          message: message,
          severity: severity,
        };
      }),
    setOpen: (isOpen) =>
      set(() => {
        return {
          open: isOpen,
        };
      }),
  }),
  Object.is
);
