import { useState, useEffect, useLayoutEffect } from "react";
import useWindowSize from "./useWindowSize";

function useTimer() {
  const [time, setTime] = useState({
    third: 0,
    second: 0,
    first: 0,
  });

  const size = useWindowSize();
  const [decider, setDecider] = useState(false);
  function restartFunc() {
    setTime({ third: 0, second: 0, first: 0 });
  }
  useLayoutEffect(() => {
    if (size[0] < 768) {
      setDecider(true);
    } else {
      setDecider(false);
    }

    return () => {};
  }, [size]);

  useEffect(() => {
    const interval = setInterval(function () {
      setTime((prev) => {
        if (decider) {
          return {
            third: 0,
            second: 0,
            first: 0,
          };
        } else if (prev.second === 5 && prev.first === 9) {
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
  }, [decider]);

  return { restartFunc, time };
}

export default useTimer;
