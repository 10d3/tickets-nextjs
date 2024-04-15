export function formatDateFrench(dateTimeString) {
    // Parse the date string
    const dateTime = new Date(dateTimeString);

    // Get month index (0-indexed)
    const month = dateTime.getMonth(); // January is 0, December is 11

    // Month names in French (an array)
    const frenchMonths = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];

    // Format the date as "day mois year" (French uses "mois" instead of "month")
    const formattedDate = `${dateTime.getDate()} ${frenchMonths[month]}`;

    // Format the time as "hour:minutes"
    const formattedTime = `${('0' + dateTime.getHours()).slice(-2)}:${('0' + dateTime.getMinutes()).slice(-2)}`;

    // Return both the formatted date and time
    return {
      dateFormat: formattedDate,
      time: formattedTime
    };
  }
