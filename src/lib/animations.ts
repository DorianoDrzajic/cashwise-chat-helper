
export const animateElement = (
  element: HTMLElement | null,
  animationClass: string,
  duration: number = 300
): Promise<void> => {
  return new Promise((resolve) => {
    if (!element) {
      resolve();
      return;
    }

    element.classList.add(animationClass);

    setTimeout(() => {
      element.classList.remove(animationClass);
      resolve();
    }, duration);
  });
};

export const scrollToBottom = (element: HTMLElement | null, smooth: boolean = true): void => {
  if (!element) return;
  
  element.scrollTo({
    top: element.scrollHeight,
    behavior: smooth ? 'smooth' : 'auto',
  });
};
