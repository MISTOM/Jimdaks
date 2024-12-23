export const formatDate = (date: Date) => {
	return new Date(date).toLocaleDateString('en-KE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
};
