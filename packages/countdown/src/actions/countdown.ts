import { getInstanceIndex, getTimezoneOffset, queryAllElements, setInnerHTML } from '../utils';
import { getAttribute, queryElement } from '../utils';

/**
 * Inits a timer countdown.
 * @param countdownElement
 */
export const initCountDown = (countdownElement: HTMLElement) => {
  let countdownInterval = 0;
  const dateString = getAttribute(countdownElement, 'date');
  if (!dateString) return;
  const timeZone = getAttribute(countdownElement, 'timezone');
  const instanceIndex = getInstanceIndex(countdownElement);

  const monthsElement = queryElement('months', { scope: countdownElement, instanceIndex: instanceIndex });
  const daysElement = queryElement('days', { scope: countdownElement, instanceIndex: instanceIndex });
  const hoursElement = queryElement('hours', { scope: countdownElement, instanceIndex: instanceIndex });
  const minutesElement = queryElement('minutes', { scope: countdownElement, instanceIndex: instanceIndex });
  const secondsElement = queryElement('seconds', { scope: countdownElement, instanceIndex: instanceIndex });
  const showElements = queryAllElements('complete-show', { instanceIndex });
  const hideElements = queryAllElements('complete-hide', { instanceIndex });

  const futureDate = new Date(dateString);
  const futureOffset = getTimezoneOffset(timeZone);
  const futureTime = futureDate.getTime() + futureOffset;

  /**
   Updates timer elements values
   */
  const updateCountdown = () => {
    const currentDate = new Date();
    const currentOffset = getTimezoneOffset(timeZone);
    const currentTime = currentDate.getTime() + currentOffset;
    const timeDifference = futureTime - currentTime;

    if (timeDifference <= 0) {
      countdownComplete();
      return;
    }

    let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    if (monthsElement) {
      days = days % 30;
    }

    setInnerHTML(monthsElement, months.toString());
    setInnerHTML(daysElement, days.toString());
    setInnerHTML(hoursElement, hours.toString());
    setInnerHTML(minutesElement, minutes.toString());
    setInnerHTML(secondsElement, seconds.toString());
  };

  const startCountdown = () => {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  };

  const stopCountdown = () => {
    clearInterval(countdownInterval);
  };

  const countdownComplete = () => {
    if (showElements?.length) {
      showElements.forEach((element) => {
        element.style.display = 'block';
      });
    }
    if (hideElements?.length) {
      hideElements.forEach((element) => {
        element.style.display = 'none';
      });
    }
    stopCountdown();
  };

  // Start the countdown initially
  startCountdown();

  return {
    stop: stopCountdown,
  };
};
