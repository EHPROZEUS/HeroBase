// Formater une date au format français
export const formatDateFr = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
};

// Obtenir le début et la fin d'une période
export const getPeriodRange = (period, date) => {
  const targetDate = new Date(date);
  
  switch (period) {
    case 'day':
      const startOfDay = new Date(targetDate. setHours(0, 0, 0, 0));
      const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));
      return {
        start: startOfDay.toISOString().split('T')[0],
        end: endOfDay.toISOString().split('T')[0]
      };
      
    case 'month':
      const startOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
      const endOfMonth = new Date(targetDate. getFullYear(), targetDate.getMonth() + 1, 0);
      return {
        start: startOfMonth.toISOString().split('T')[0],
        end: endOfMonth. toISOString().split('T')[0]
      };
      
    case 'year': 
      const startOfYear = new Date(targetDate.getFullYear(), 0, 1);
      const endOfYear = new Date(targetDate.getFullYear(), 11, 31);
      return {
        start: startOfYear.toISOString().split('T')[0],
        end: endOfYear.toISOString().split('T')[0]
      };
      
    default:
      return null;
  }
};

// Filtrer les devis par période
export const filterQuotesByPeriod = (quotes, period, date) => {
  if (!period || ! date) return quotes;
  
  const range = getPeriodRange(period, date);
  if (!range) return quotes;
  
  return quotes.filter(quote => {
    if (! quote.dateVehicule) return false;
    return quote.dateVehicule >= range.start && quote.dateVehicule <= range.end;
  });
};
