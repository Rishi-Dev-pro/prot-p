export interface ElementMeasurements {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
  centerX: number;
  centerY: number;
  viewportTop: number;
  viewportLeft: number;
}

export function measureElement(el: HTMLElement | null): ElementMeasurements | null {
  if (!el || typeof window === 'undefined') return null;

  const rect = el.getBoundingClientRect();
  const scrollY = window.scrollY || window.pageYOffset;
  const scrollX = window.scrollX || window.pageXOffset;

  return {
    width: Math.round(rect.width),
    height: Math.round(rect.height),
    top: Math.round(rect.top + scrollY),
    left: Math.round(rect.left + scrollX),
    right: Math.round(rect.right + scrollX),
    bottom: Math.round(rect.bottom + scrollY),
    centerX: Math.round(rect.left + rect.width / 2),
    centerY: Math.round(rect.top + rect.height / 2),
    viewportTop: Math.round(rect.top),
    viewportLeft: Math.round(rect.left),
  };
}

export function getCornerAnchors(measurements: ElementMeasurements) {
  const { viewportLeft, viewportTop, width, height } = measurements;
  return {
    topLeft: { x: viewportLeft, y: viewportTop },
    topRight: { x: viewportLeft + width, y: viewportTop },
    bottomLeft: { x: viewportLeft, y: viewportTop + height },
    bottomRight: { x: viewportLeft + width, y: viewportTop + height },
  };
}

