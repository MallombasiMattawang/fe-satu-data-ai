// dateTimeFormat.jsx

export default function dateTimeFormat(dateString) {
    const formattedDate = new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  
    return formattedDate;
  }
  