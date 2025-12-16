import React from 'react';
import '../styles/PeriodFilter.css';

const PeriodFilter = ({ period, setPeriod, selectedDate, setSelectedDate, onReset }) => {
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="period-filter">
      <div className="filter-group">
        <label>Vue :</label>
        <select value={period} onChange={(e) => setPeriod(e.target. value)}>
          <option value="">Tous</option>
          <option value="day">Jour</option>
          <option value="month">Mois</option>
          <option value="year">Année</option>
        </select>
      </div>
      
      {period && (
        <div className="filter-group">
          <label>Date :</label>
          <input
            type={period === 'year' ? 'number' : period === 'month' ? 'month' : 'date'}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={period === 'year' ? new Date().getFullYear() : today}
          />
        </div>
      )}
      
      <button className="reset-button" onClick={onReset}>
        Réinitialiser
      </button>
    </div>
  );
};

export default PeriodFilter;