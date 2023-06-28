import { ShowNotification } from 'App';
import { createContext } from 'react';

export const NotificationContext = createContext<NotificationContextType | null>(null);

export interface NotificationContextType {
  showNotification: ShowNotification;
}
