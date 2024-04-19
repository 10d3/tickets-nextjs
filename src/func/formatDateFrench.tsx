export function convertUnixTimestamp(date) {
  const dateIN = new Date(date);
  const months = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
  const monthName = months[dateIN.getMonth()];
  const day = ('0' + dateIN.getDate()).slice(-2); // Add leading zero if necessary
  const hours = ('0' + dateIN.getHours()).slice(-2); // Add leading zero if necessary
  const minutes = ('0' + dateIN.getMinutes()).slice(-2); // Add leading zero if necessary
  // const seconds = ('0' + dateIN.getSeconds()).slice(-2); // Add leading zero if necessary
  const formattedDate = `${day} ${monthName}`; // Date format: DD-Mon
  const formattedTime = `${hours}:${minutes}`; // Time format: HH:MM:SS
  return { dateFormat: formattedDate, time: formattedTime };
}

// Output: { date: '11-Mar', time: '14:49:00' }
