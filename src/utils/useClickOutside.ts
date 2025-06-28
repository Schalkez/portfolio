import type { Action } from "svelte/action";

interface ClickOutsideOptions {
  enabled?: boolean;
  callback?: () => void;
}

export const useClickOutside: Action<HTMLElement, ClickOutsideOptions> = (
  node,
  options = {}
) => {
  const { enabled = true, callback } = options;

  const handleClick = (event: MouseEvent) => {
    if (!enabled) return;

    if (node && !node.contains(event.target as Node)) {
      callback?.();
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    update(newOptions: ClickOutsideOptions) {
      // Update options if needed
    },
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
};
