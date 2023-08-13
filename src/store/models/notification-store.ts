export interface NotificationStore {
  open: boolean;
  message: string;
  severity: SeverityType;
  showNotification: (message: string, severity?: SeverityType) => void;
  setOpen: (isOpen: boolean) => void;
}

export type SeverityType = 'success' | 'error' | 'warning' | 'info';
