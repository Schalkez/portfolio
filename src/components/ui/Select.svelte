<script lang="ts">
  import { useClickOutside } from "../../utils/useClickOutside";

  interface SelectOption<T = string> {
    value: T;
    label: string;
    icon?: string;
    disabled?: boolean;
  }

  interface SelectProps<T = string> {
    options: SelectOption<T>[];
    value: T;
    placeholder?: string;
    width?: string;
    height?: string;
    disabled?: boolean;
    onChange: (value: T) => void;
    noArrow?: boolean;
    noBorder?: boolean;
    customClass?: string;
    isMobile?: boolean;
  }

  const props = $props<any>();

  let isOpen = $state(false);
  let selectElement: HTMLElement;
  let dropdownElement: HTMLElement;

  function toggleDropdown() {
    if (props.disabled) return;
    isOpen = !isOpen;
  }

  function closeDropdown() {
    isOpen = false;
  }

  function handleOptionClick(option: any) {
    if (option.disabled) return;
    if (option.value === props.value) {
      closeDropdown();
      return;
    }
    props.onChange(option.value);
    closeDropdown();
  }

  const selectedOption = $derived(
    props.options.find(
      (option: { value: string }) => option.value === props.value
    )
  );

  // Đóng dropdown khi click ra ngoài
  $effect(() => {
    if (!isOpen) return;
    function handleClick(event: MouseEvent) {
      const target = event.target as Node;
      if (selectElement && selectElement.contains(target)) return;
      if (dropdownElement && dropdownElement.contains(target)) return;
      closeDropdown();
    }
    document.addEventListener("mousedown", handleClick, true);
    return () => document.removeEventListener("mousedown", handleClick, true);
  });
</script>

<div class="relative {props.width || 'w-full'}" bind:this={selectElement}>
  <button
    type="button"
    onclick={toggleDropdown}
    disabled={props.disabled}
    class="w-full {props.height ||
      'h-9'} flex items-center justify-between rounded-md {props.noBorder
      ? ''
      : 'border border-base-200'} {props.customClass ||
      'bg-white px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 dark:bg-base-900 dark:border-base-700 dark:text-base-100 hover:bg-base-50 dark:hover:bg-base-800 transition-colors'} disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <span class="flex items-center gap-1 sm:gap-2 truncate">
      {#if selectedOption && selectedOption.icon}
        <img
          src={selectedOption.icon}
          alt=""
          class="w-5 h-5 sm:w-6 sm:h-6 object-contain"
        />
      {/if}
      {#if !(props.width && props.width.includes("w-12")) && selectedOption}
        <span class="text-xs sm:text-sm">{selectedOption.label}</span>
      {/if}
    </span>
    {#if !props.noArrow}
      <svg
        class="h-4 w-4 opacity-50 transition-transform flex-shrink-0 {isOpen
          ? 'rotate-180'
          : ''}"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    {/if}
  </button>

  {#if isOpen}
    <div
      bind:this={dropdownElement}
      class="absolute {props.isMobile
        ? 'bottom-full mb-1'
        : 'top-full mt-1'} left-0 right-0 z-50 bg-white dark:bg-base-900 border border-base-200 dark:border-base-700 rounded-md shadow-lg max-h-60 overflow-auto"
    >
      {#each props.options as option}
        <button
          type="button"
          onclick={() => handleOptionClick(option)}
          disabled={option.disabled}
          class="w-full flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm hover:bg-base-100 dark:hover:bg-base-800 transition-colors {props.value ===
          option.value
            ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400'
            : 'text-base-900 dark:text-base-100'} {option.disabled
            ? 'opacity-50 cursor-not-allowed'
            : ''}"
        >
          {#if option.icon}
            <img
              src={option.icon}
              alt=""
              class="w-5 h-5 sm:w-6 sm:h-6 object-contain"
            />
          {/if}
          {#if !(props.width && props.width.includes("w-12"))}
            <span>{option.label}</span>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>
