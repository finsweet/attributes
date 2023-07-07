import { getTimezoneOffset, setInnerHTML } from '../utils/helpers';
import { getAttribute, queryElement } from '../utils/selectors';

export const initCountDown = (countdownElement: Element) => {
  let countdownInterval = 0;
  const dateString = getAttribute(countdownElement, 'date');
  if (!dateString) return;
  const timeZone = getAttribute(countdownElement, 'timezone');

  const monthsElement = queryElement('months', { scope: countdownElement });
  const daysElement = queryElement('days', { scope: countdownElement });
  const hoursElement = queryElement('hours', { scope: countdownElement });
  const minutesElement = queryElement('minutes', { scope: countdownElement });
  const secondsElement = queryElement('seconds', { scope: countdownElement });

  const futureDate = new Date(dateString);
  const futureOffset = getTimezoneOffset(timeZone);
  const futureTime = futureDate.getTime() + futureOffset;

  const updateCountdown = () => {
    const currentDate = new Date();
    const currentOffset = getTimezoneOffset(timeZone);
    const currentTime = currentDate.getTime() + currentOffset;
    const timeDifference = futureTime - currentTime;

    const months = futureDate.getMonth() - currentDate.getMonth();
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    setInnerHTML(monthsElement, months.toString());
    setInnerHTML(daysElement, days.toString());
    setInnerHTML(hoursElement, hours.toString());
    setInnerHTML(minutesElement, minutes.toString());
    setInnerHTML(secondsElement, seconds.toString());
  };

  function startCountdown() {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  function stopCountdown() {
    clearInterval(countdownInterval);
  }

  // Start the countdown initially
  startCountdown();

  return {
    stop: stopCountdown,
  };
};
