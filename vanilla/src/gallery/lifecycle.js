const cleanups = [];
export function registerDemoCleanup(cleanup) {
  cleanups.push(cleanup);
}
export function disposeDemo() {
  cleanups.splice(0).forEach((cleanup) => cleanup());
}
export function trackDemoElement(element) {
  registerDemoCleanup(() => element.destroy());
  return element;
}
