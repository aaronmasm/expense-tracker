// Function to format a number as a currency string in USD
export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(amount);
}

// Function to format a date string into a human-readable format
export function formatDate(dateStr: string): string {
    const dateObj: Date = new Date(dateStr); // Convert the date string to a Date object
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long', // Full name of the weekday
        year: 'numeric', // Numeric representation of the year
        month: 'long',   // Full name of the month
        day: 'numeric'   // Numeric day of the month
    };

    return new Intl.DateTimeFormat('en', options).format(dateObj); // Format the date in English
    // return new Intl.DateTimeFormat('es-ES', options).format(dateObj); // Format the date in Spanish
}
