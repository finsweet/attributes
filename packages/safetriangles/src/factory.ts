type Point = {
  x: number;
  y: number;
};

type Direction = 'left' | 'right' | 'up' | 'down';

type SafeTriangleOptions = {
  delay: number;
  debug: boolean;
};

const SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * Inits a safe triangle between a trigger and target element.
 * @param trigger The trigger element.
 * @param target The target element.
 * @param options Triangle options.
 * @returns A cleanup callback.
 */
export const initSafeTriangle = (trigger: HTMLElement, target: HTMLElement, { delay, debug }: SafeTriangleOptions) => {
  const previousInlinePosition = trigger.style.position;

  if (window.getComputedStyle(trigger).position === 'static') {
    trigger.style.position = 'relative';
  }

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.position = 'absolute';
  svg.style.pointerEvents = 'none';
  svg.style.inset = 'auto';
  svg.style.overflow = 'visible';
  svg.style.visibility = 'hidden';
  svg.dataset.fsSafeTriangles = 'svg';

  const path = document.createElementNS(SVG_NS, 'path');
  path.style.pointerEvents = 'auto';
  path.dataset.fsSafeTriangles = 'path';

  applyPathStyles(path, debug);

  svg.appendChild(path);
  trigger.appendChild(svg);

  let rects = getRects(trigger, target);

  const showTriangle = () => {
    svg.style.visibility = 'visible';
  };

  const hideTriangle = () => {
    svg.style.visibility = 'hidden';
    path.removeAttribute('d');
  };

  const updateBounds = () => {
    rects = getRects(trigger, target);
    applySvgBounds(svg, rects);
  };

  const updateTriangle = (cursor: Point) => {
    const { triggerRect, targetRect, unionRect } = rects;
    const direction = getDirection(triggerRect, targetRect);
    const [edgeA, edgeB] = getTargetEdge(targetRect, direction);

    const cursorLocal = toLocalPoint(cursor, unionRect);
    const edgeALocal = toLocalPoint(edgeA, unionRect);
    const edgeBLocal = toLocalPoint(edgeB, unionRect);

    path.setAttribute(
      'd',
      `M ${cursorLocal.x} ${cursorLocal.y} L ${edgeALocal.x} ${edgeALocal.y} L ${edgeBLocal.x} ${edgeBLocal.y} Z`
    );
  };

  const handleMouseEnter = () => {
    updateBounds();
    showTriangle();

    if (delay <= 0) {
      const { triggerRect } = rects;
      updateTriangle({ x: triggerRect.left + triggerRect.width / 2, y: triggerRect.top + triggerRect.height / 2 });
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    showTriangle();

    window.setTimeout(
      () => {
        updateTriangle({ x: event.clientX, y: event.clientY });
      },
      Math.max(0, delay)
    );
  };

  const handleTriggerMouseLeave = (event: MouseEvent) => {
    const nextHoveredElement = event.relatedTarget;

    if (
      nextHoveredElement instanceof Node &&
      (trigger.contains(nextHoveredElement) || target.contains(nextHoveredElement))
    ) {
      return;
    }

    hideTriangle();
  };

  const handleTargetMouseEnter = () => {
    hideTriangle();
  };

  const handleTargetMouseLeave = (event: MouseEvent) => {
    const nextHoveredElement = event.relatedTarget;

    if (
      nextHoveredElement instanceof Node &&
      (trigger.contains(nextHoveredElement) || target.contains(nextHoveredElement))
    ) {
      return;
    }

    hideTriangle();
  };

  const handleWindowResize = () => {
    updateBounds();
  };

  trigger.addEventListener('mouseenter', handleMouseEnter);
  trigger.addEventListener('mousemove', handleMouseMove);
  trigger.addEventListener('mouseleave', handleTriggerMouseLeave);
  target.addEventListener('mouseenter', handleTargetMouseEnter);
  target.addEventListener('mouseleave', handleTargetMouseLeave);
  window.addEventListener('resize', handleWindowResize);

  updateBounds();
  hideTriangle();

  return () => {
    trigger.removeEventListener('mouseenter', handleMouseEnter);
    trigger.removeEventListener('mousemove', handleMouseMove);
    trigger.removeEventListener('mouseleave', handleTriggerMouseLeave);
    target.removeEventListener('mouseenter', handleTargetMouseEnter);
    target.removeEventListener('mouseleave', handleTargetMouseLeave);
    window.removeEventListener('resize', handleWindowResize);

    svg.remove();

    if (previousInlinePosition) {
      trigger.style.position = previousInlinePosition;
    } else {
      trigger.style.removeProperty('position');
    }
  };
};

const applyPathStyles = (path: SVGPathElement, debug: boolean) => {
  if (debug) {
    path.setAttribute('fill', 'rgb(0 255 0 / 0.1)');
    path.setAttribute('stroke', 'green');
    path.setAttribute('stroke-width', '1');
    return;
  }

  path.setAttribute('fill', 'transparent');
  path.removeAttribute('stroke');
  path.removeAttribute('stroke-width');
};

const getRects = (trigger: HTMLElement, target: HTMLElement) => {
  const triggerRect = trigger.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const unionRect = getUnionRect(triggerRect, targetRect);

  return {
    triggerRect,
    targetRect,
    unionRect,
  };
};

const applySvgBounds = (
  svg: SVGSVGElement,
  { triggerRect, unionRect }: { triggerRect: DOMRect; unionRect: DOMRect }
) => {
  const width = Math.max(1, unionRect.width);
  const height = Math.max(1, unionRect.height);

  svg.style.left = `${unionRect.left - triggerRect.left}px`;
  svg.style.top = `${unionRect.top - triggerRect.top}px`;
  svg.style.width = `${width}px`;
  svg.style.height = `${height}px`;
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
};

const getUnionRect = (a: DOMRect, b: DOMRect) => {
  const left = Math.min(a.left, b.left);
  const top = Math.min(a.top, b.top);
  const right = Math.max(a.right, b.right);
  const bottom = Math.max(a.bottom, b.bottom);

  return new DOMRect(left, top, right - left, bottom - top);
};

const getDirection = (triggerRect: DOMRect, targetRect: DOMRect): Direction => {
  const triggerCenterX = triggerRect.left + triggerRect.width / 2;
  const triggerCenterY = triggerRect.top + triggerRect.height / 2;
  const targetCenterX = targetRect.left + targetRect.width / 2;
  const targetCenterY = targetRect.top + targetRect.height / 2;

  const dx = targetCenterX - triggerCenterX;
  const dy = targetCenterY - triggerCenterY;

  if (Math.abs(dx) > Math.abs(dy)) {
    return dx >= 0 ? 'right' : 'left';
  }

  return dy >= 0 ? 'down' : 'up';
};

const getTargetEdge = (targetRect: DOMRect, direction: Direction): [Point, Point] => {
  if (direction === 'right') {
    return [
      { x: targetRect.left, y: targetRect.top },
      { x: targetRect.left, y: targetRect.bottom },
    ];
  }

  if (direction === 'left') {
    return [
      { x: targetRect.right, y: targetRect.top },
      { x: targetRect.right, y: targetRect.bottom },
    ];
  }

  if (direction === 'down') {
    return [
      { x: targetRect.left, y: targetRect.top },
      { x: targetRect.right, y: targetRect.top },
    ];
  }

  return [
    { x: targetRect.left, y: targetRect.bottom },
    { x: targetRect.right, y: targetRect.bottom },
  ];
};

const toLocalPoint = (point: Point, rect: DOMRect): Point => ({
  x: point.x - rect.left,
  y: point.y - rect.top,
});
