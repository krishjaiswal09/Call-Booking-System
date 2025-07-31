// Helper function - can be in utils/timeHelpers.js
export const convertTimeToMinutes = (timeStr) => {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  let totalHours = hours;
  
  if (period === 'PM' && hours !== 12) totalHours += 12;
  if (period === 'AM' && hours === 12) totalHours = 0;
  
  return totalHours * 60 + minutes;
};