<!-- <script lang="ts">
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
  
    // Create a writable store for dark mode state
    export const isDarkMode = writable(false);
  
    // On mount, apply the saved theme from localStorage
    onMount(() => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      isDarkMode.set(savedTheme === 'dark');
    });
  
    // Automatically update theme whenever `isDarkMode` changes
    $: $isDarkMode, {
    const theme = $isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
</script> -->
