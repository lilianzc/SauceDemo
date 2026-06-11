export function generateDates() {
    const today = new Date(); // generate today's date and time
    const checkinDate = today.toISOString().split('T')[0]; // today's date is divided into date and time and splitted(array)

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1); // Todays date is modified
    const checkoutDate = tomorrow.toISOString().split('T')[0]; // Get tomorrow's date in YYYY-MM-DD format

    return { checkinDate, checkoutDate };
}