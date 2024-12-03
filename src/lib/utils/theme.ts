import { writable } from 'svelte/store';

export const isDarkMode = writable(false);

// Function to toggle theme
export const toggleTheme = () => {
	isDarkMode.update((value) => {
		const newTheme = !value;
		document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
		localStorage.setItem('theme', newTheme ? 'dark' : 'light');
		return newTheme;
	});
};

// On mount, set the saved theme
export const applySavedTheme = () => {
	const savedTheme = localStorage.getItem('theme') || 'light';
	const darkMode = savedTheme === 'dark';
	document.documentElement.setAttribute('data-theme', savedTheme);
	isDarkMode.set(darkMode);
};
