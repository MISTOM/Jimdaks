export const formatDate = (date: Date) => {
	return new Date(date).toLocaleDateString('en-KE', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
};

export const calculateBirdAge = (startDate: Date) => {
	if (!startDate) return 0;
	const start = new Date(startDate);
	if (isNaN(start.getTime())) return 0;

	const today = new Date();
	if (start > today) return 0;

	const diffTime = today.getTime() - start.getTime();
	return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};
