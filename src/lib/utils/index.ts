export const formatTimestamp = (epochSeconds: number) => {
	return new Date(epochSeconds * 1000).toLocaleDateString([], {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
};
