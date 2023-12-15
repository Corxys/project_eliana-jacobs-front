export function formatHour(hour: string): string {
	const h = hour.split(":")[0];
	const m = hour.split(":")[1];

	return `${h}h${m}`;
}
