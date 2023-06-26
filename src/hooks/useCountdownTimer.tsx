import { useEffect, useRef, useState } from 'react';

const useCountdownTimer = (initialTimerValue: number) => {
  const [isCountdownTimerOn, setIsCountdownTimerOn] = useState(false);
  const [timer, setTimer] = useState(initialTimerValue);
  const intervalRef = useRef<number>();

  useEffect(() => {
    if (isCountdownTimerOn) {
      intervalRef.current = setInterval(() => {
        setTimer((prevValue) => prevValue - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef?.current);
    };
  }, [isCountdownTimerOn]);

  if (timer === 0 && isCountdownTimerOn) {
    setTimer(initialTimerValue);
    setIsCountdownTimerOn(false);
  }

  const countdownTimer = `00:${timer.toString()?.padStart(2, '0')}`;

  return { countdownTimer, isCountdownTimerOn, setIsCountdownTimerOn };
};

export default useCountdownTimer;
