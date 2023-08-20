import { NavigateFunction } from 'react-router-dom';

export interface AuthStore {
  isLoggedIn: boolean;
  accessToken: string;
  isRefreshTokenIntervalOn: boolean;
  navigate: NavigateFunction | null;
  setAccessToken: (accessToken: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setIsRefreshTokenIntervalOn: (isRefreshTokenIntervalOn: boolean) => void;
  setNavigateFunction: (navigate: NavigateFunction) => void;
}
