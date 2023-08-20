import { AuthStore } from './models/auth-store';
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

export const useAuthStore = createWithEqualityFn<AuthStore>(
  (set) => ({
    isLoggedIn: false,
    accessToken: '',
    isRefreshTokenIntervalOn: false,
    setAccessToken: (accessToken) => set(() => ({ accessToken })),
    setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
    setIsRefreshTokenIntervalOn: (isRefreshTokenIntervalOn) => set(() => ({ isRefreshTokenIntervalOn })),
  }),
  Object.is
);
