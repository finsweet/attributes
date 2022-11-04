/**
 * Animates a number element.
 * @param numberElement
 * @param start
 * @param end
 * @param duration
 */
export const animateNumberCount = (numberElement: Element, start: number, end: number, duration: number) => {
  const increment = (end - start) / duration;

  let value = start;

  const animate = () => {
    if (value < end) {
      const newValue = value + increment;

      numberElement.textContent = Math.floor(newValue).toString();
      value = newValue;
    } else {
      numberElement.textContent = end.toString();
    }
  };

  for (let i = 0; i <= duration; i++) {
    setTimeout(animate, i);
  }
};
