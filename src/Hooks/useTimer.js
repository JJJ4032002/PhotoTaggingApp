import { useState, useEffect } from "react";

function useTimer() {
  const [time, setTime] = useState({
    third: 0,
    second: 0,
    first: 0,
  });
  useEffect(() => {
    const interval = setInterval(function () {
      setTime((prev) => {
        if (prev.second === 5 && prev.first === 9) {
          return { third: prev.third + 1, second: 0, first: 0 };
        } else if (prev.first === 9) {
          return { ...prev, second: prev.second + 1, first: 0 };
        } else {
          return { ...prev, first: prev.first + 1 };
        }
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return time;
}

export default useTimer;
