import type { Action } from "svelte/action";

interface ClickOutsideOptions {
  enabled?: boolean;
  callback?: () => void;
  extraNodes?: HTMLElement[];
}

export const useClickOutside: Action<HTMLElement, ClickOutsideOptions> = (
  node,
  options = {}
) => {
  const { enabled = true, callback, extraNodes = [] } = options;

  const handleClick = (event: MouseEvent) => {
    if (!enabled) return;
    const target = event.target as Node;
    // Kiểm tra nếu click vào node chính hoặc bất kỳ extraNode nào thì không gọi callback
    if (
      node.contains(target) ||
      extraNodes.some((n) => n && n.contains(target))
    ) {
      return;
    }
    callback?.();
  };

  document.addEventListener("click", handleClick, true);

  return {
    update(newOptions: ClickOutsideOptions) {
      // Không cần update extraNodes ở đây vì không reactive, chỉ dùng khi mount
    },
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
};
