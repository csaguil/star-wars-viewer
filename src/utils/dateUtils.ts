export function displayDate(dateString: string) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    } as Intl.DateTimeFormatOptions;

    const formattedDate = new Date(dateString).toLocaleDateString(
        undefined,
        options
    );
    return formattedDate;
}
