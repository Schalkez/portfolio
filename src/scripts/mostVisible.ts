export interface MostVisibleOptions {
  offset?: number;
  percentage?: boolean;
}

type ElementInput =
  | string
  | Iterable<Element>
  | ArrayLike<Element>
  | null
  | undefined;

const resolveElements = (input: ElementInput): Element[] => {
  if (typeof document === "undefined") return [];
  if (!input) return [];
  if (typeof input === "string") {
    return Array.from(document.querySelectorAll(input));
  }

  if (Symbol.iterator in Object(input)) {
    return Array.from(input as Iterable<Element>);
  }

  return Array.from(input as ArrayLike<Element>);
};

const visibleAmount = (
  element: Element,
  offset: number,
  percentage: boolean
): number => {
  if (typeof document === "undefined") return 0;
  const viewportHeight = document.documentElement.clientHeight;
  const rect = element.getBoundingClientRect();
  const adjustedTop = rect.top - offset;
  const adjustedBottom = rect.bottom - offset;
  const elementHeight = rect.height;

  const topVisible = adjustedTop >= 0 && adjustedTop < viewportHeight;
  const bottomVisible =
    adjustedBottom > 0 && adjustedBottom < viewportHeight;

  let visiblePixels = 0;

  if (topVisible && bottomVisible) {
    visiblePixels = elementHeight;
  } else if (topVisible) {
    visiblePixels = viewportHeight - rect.top;
  } else if (bottomVisible) {
    visiblePixels = adjustedBottom;
  } else if (elementHeight > viewportHeight && adjustedTop < 0) {
    const hiddenPixels = Math.abs(adjustedTop);
    if (hiddenPixels < elementHeight) {
      visiblePixels = elementHeight - hiddenPixels;
    }
  }

  if (percentage && elementHeight > 0) {
    return (visiblePixels / elementHeight) * 100;
  }

  return visiblePixels;
};

export const mostVisible = (
  elements: ElementInput,
  options: MostVisibleOptions = {}
): Element | null => {
  const { offset = 0, percentage = false } = options;
  const resolvedElements = resolveElements(elements);

  let currentMax = -1;
  let currentElement: Element | null = null;

  for (const element of resolvedElements) {
    const amount = visibleAmount(element, offset, percentage);
    if (amount > currentMax) {
      currentMax = amount;
      currentElement = element;
    }
  }

  return currentElement;
};

export default mostVisible;
