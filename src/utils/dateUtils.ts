export function dateToString(date: Date): string {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    return `${yyyy}-${mm}-${dd}`
}

export function getMonthName(month: number) {
    const date = new Date();
    date.setDate(1);
    date.setMonth(month);
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
    }).format(date);
}