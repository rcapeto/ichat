import {
  formatDateDifference,
  getDiffByDate,
} from "@/utils/format-date-difference";
import { useEffect, useRef, useState } from "react";

const oneSecondInterval = 1000;
const oneMinuteInterval = oneSecondInterval * 60;
const oneHourInterval = oneMinuteInterval * 60;

function getDiff(createdAt: string) {
  const diff = getDiffByDate(createdAt);
  const isAfter1Hour = diff.asMinutes() > 60 || diff.asHours() > 1;
  const isBefore1Minute = diff.asSeconds() < 60;
  const isAfter1Day = diff.asDays() > 1;

  return { isAfter1Hour, isBefore1Minute, isAfter1Day };
}

export function useUpdateTimer(createdAt: string) {
  const [timeDifference, setTimeDifference] = useState(
    formatDateDifference(createdAt)
  );
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

  function clearTimeInterval() {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  }

  function startTimer() {
    const { isAfter1Hour, isAfter1Day } = getDiff(createdAt);
    const interval = isAfter1Hour ? oneHourInterval : oneMinuteInterval;

    if (isAfter1Day) {
      return;
    }

    intervalId.current = setInterval(() => {
      setTimeDifference(formatDateDifference(createdAt));
    }, interval);
  }

  function onFocus() {
    startTimer();
  }

  function onBlur() {
    clearTimeInterval();
  }

  const events = {
    focus: onFocus,
    blur: onBlur,
  };

  useEffect(() => {
    onFocus();

    Object.entries(events).forEach(([event, callback]) => {
      window.addEventListener(event, callback);
    });

    return () => {
      Object.entries(events).forEach(([event, callback]) => {
        window.removeEventListener(event, callback);
      });

      onBlur();
    };
  }, []);

  return { timeDifference };
}
