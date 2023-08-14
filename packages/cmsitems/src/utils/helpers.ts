type Breakpoints = {
  [width: number]: string | undefined;
};

export const applyResponsiveLayout = (breakpoints: Breakpoints, listElement: HTMLElement) => {
  for (const breakpointWidth in breakpoints) {
    if (window.innerWidth <= breakpointWidth) {
      const itemsPerRowValue = breakpoints[breakpointWidth];
      listElement.style.gridTemplateColumns = `repeat(${itemsPerRowValue}, 1fr)`;
      break;
    }
  }
};
