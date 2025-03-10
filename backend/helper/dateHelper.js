const formatDate = isoDate => {
  if (!isoDate || isNaN(new Date(isoDate))) return null; // Cek validitas input

  const date = new Date(isoDate);

  const pad = num => String(num).padStart(2, "0"); // Helper untuk padding nol

  const day = pad(date.getDate()); // Hari dengan padding nol
  const month = pad(date.getMonth() + 1); // Bulan dengan padding nol
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

module.exports = {
  formatDate
};
