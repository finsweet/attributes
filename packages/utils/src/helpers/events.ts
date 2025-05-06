import { noop } from './guards';

/**
 * Adds an event listener to an element.
 * @returns A callback to remove the event listener from the element.
 *
 * @param target
 * @param type
 * @param listener
 * @param options
 */
export function addListener<
  TargetInterface extends EventTarget,
  Type extends TargetInterface extends Window
    ? keyof WindowEventMap | string
    : TargetInterface extends Document
      ? keyof DocumentEventMap | string
      : TargetInterface extends HTMLElement
        ? keyof HTMLElementEventMap | string
        : keyof ElementEventMap | string,
  Listener extends Type extends keyof WindowEventMap
    ? (this: Document, ev: WindowEventMap[Type]) => unknown
    : Type extends keyof DocumentEventMap
      ? (this: Document, ev: DocumentEventMap[Type]) => unknown
      : Type extends keyof HTMLElementEventMap
        ? (this: HTMLElement, ev: HTMLElementEventMap[Type]) => unknown
        : Type extends keyof ElementEventMap
          ? (this: Element, ev: ElementEventMap[Type]) => unknown
          : EventListenerOrEventListenerObject,
>(
  target: TargetInterface | TargetInterface[] | Set<TargetInterface> | null | undefined,
  type: Type,
  listener: Listener,
  options?: boolean | AddEventListenerOptions
): () => void {
  if (!target) return noop;

  const targets = Array.isArray(target) ? target : target instanceof Set ? [...target] : [target];

  targets.forEach((target) => target.addEventListener(type, listener, options));

  return () => targets.forEach((target) => target.removeEventListener(type, listener, options));
}

type AllowedEvent = keyof DocumentEventMap | 'w-close';

/**
 * Dispatches a custom event that bubbles from the target.
 * @param target The element where the event will originate.
 * @param events The event name or an array of event names.
 * @returns True if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.
 */
export const simulateEvent = (target: EventTarget, events: AllowedEvent | Array<AllowedEvent>): boolean => {
  if (!Array.isArray(events)) events = [events];

  const eventsSuccess = events.map((event) => target.dispatchEvent(new Event(event, { bubbles: true })));

  return eventsSuccess.every((success) => success);
};
