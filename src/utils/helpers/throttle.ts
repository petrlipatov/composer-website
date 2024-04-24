type ThrottleFunction = (...args: any[]) => void;

export function throttle(callee: ThrottleFunction, timeout: number) {
  let timer = null;

  return function perform(...args) {
    if (timer) return;

    timer = setTimeout(() => {
      callee(...args);

      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}
