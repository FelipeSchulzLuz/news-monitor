export function formatPubDate(raw: string): string {
    const dmyMatch = /^\d{2}\/\d{2}\/\d{4}/.test(raw);
    let date: Date;

    if (dmyMatch) {
        const [day, month, year] = raw.split('/');
        date = new Date(+year, +month - 1, +day);
    } else {
        date = new Date(raw);
    }

    return isNaN(date.getTime()) ? raw : date.toLocaleString();
}
