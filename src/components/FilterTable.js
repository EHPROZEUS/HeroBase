import React, { useState, useMemo } from 'react';
import { formatDateFr } from '../utils/dateUtils';
import '../styles/FilterTable.css';

const FilterTable = ({ quotes }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Extraire tous les types de filtres disponibles
  const filterTypes = useMemo(() => {
    const types = new Set();
    quotes.forEach(quote => {
      Object.keys(quote).forEach(key => {
        if ((key.startsWith('LP') || key.startsWith('LM')) && typeof quote[key] === 'number') {
          types.add(key);
        }
      });
    });
    return Array.from(types).sort();
  }, [quotes]);

  // Calculer les totaux par colonne
  const totals = useMemo(() => {
    const sums = {};
    filterTypes. forEach(type => {
      sums[type] = quotes.reduce((sum, quote) => sum + (quote[type] || 0), 0);
    });
    return sums;
  }, [quotes, filterTypes]);

  // Tri des données
  const sortedQuotes = useMemo(() => {
    if (!sortConfig.key) return quotes;

    return [...quotes].sort((a, b) => {
      const aValue = a[sortConfig. key] || 0;
      const bValue = b[sortConfig.key] || 0;

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [quotes, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '⇅';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  if (quotes.length === 0) {
    return <div className="no-data">Aucun devis trouvé pour cette période.</div>;
  }

  return (
    <div className="filter-table-container">
      <div className="table-wrapper">
        <table className="filter-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('dateVehicule')}>
                Date {getSortIcon('dateVehicule')}
              </th>
              <th>N° Devis</th>
              <th>Marque</th>
              <th>Modèle</th>
              {filterTypes.map(type => (
                <th key={type} onClick={() => handleSort(type)}>
                  {type} {getSortIcon(type)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedQuotes.map((quote) => (
              <tr key={quote.id}>
                <td>{formatDateFr(quote.dateVehicule)}</td>
                <td>{quote.lead || quote.id}</td>
                <td>{quote.marque || 'N/A'}</td>
                <td>{quote.modele || 'N/A'}</td>
                {filterTypes.map(type => (
                  <td key={type} className={quote[type] > 0 ? 'has-value' : ''}>
                    {quote[type] || 0}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="totals-row">
              <td colSpan="4"><strong>TOTAUX</strong></td>
              {filterTypes.map(type => (
                <td key={type}><strong>{totals[type]}</strong></td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default FilterTable;