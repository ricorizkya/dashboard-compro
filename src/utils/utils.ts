export const backendToFrontendDate = (backendDate: string): string => {
  if (!backendDate) return '';

  // Handle format ISO (2025-05-07T00:00:00Z)
  const isoDate = backendDate.split('T')[0];
  const [year, month, day] = isoDate.split('-');

  return `${day}-${month}-${year}`;
};

export const frontendToBackendDate = (frontendDate: string): string => {
  if (!frontendDate) return '';

  const [day, month, year] = frontendDate.split('-');
  return `${year}/${month}/${day}`;
};

export const isValidDate = (dateString: string): boolean => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
  if (!regex.test(dateString)) return false;

  const [day, month, year] = dateString.split('-');
  const date = new Date(`${year}-${month}-${day}`);
  return date.getDate() === Number(day);
};
