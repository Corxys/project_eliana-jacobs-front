const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function formatDate(date: string): string {
	const y = new Date(date).getFullYear();
	const m = new Date(date).getMonth();
	const d = new Date(date).getDate();

	return `${months[m]} ${d}, ${y}`;
}
