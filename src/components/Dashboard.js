import React, { useState, useEffect, useMemo } from 'react';
import { getAllQuotes } from '../services/firebaseService';
import { filterQuotesByPeriod } from '../utils/dateUtils';
import PeriodFilter from './PeriodFilter';
import FilterTable from './FilterTable';
import LoadingSpinner from './LoadingSpinner';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Charger les devis au montage du composant
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const data = await getAllQuotes();
        setQuotes(data);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des données.  Veuillez réessayer.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  // Filtrer les devis selon la période sélectionnée
  const filteredQuotes = useMemo(() => {
    return filterQuotesByPeriod(quotes, period, selectedDate);
  }, [quotes, period, selectedDate]);

  // Statistiques globales
  const stats = useMemo(() => {
    return {
      total: filteredQuotes.length,
      totalFilters: filteredQuotes.reduce((sum, quote) => {
        const filterKeys = Object.keys(quote).filter(key => 
          (key.startsWith('LP') || key.startsWith('LM')) && typeof quote[key] === 'number'
        );
        return sum + filterKeys.reduce((s, key) => s + (quote[key] || 0), 0);
      }, 0)
    };
  }, [filteredQuotes]);

  const handleReset = () => {
    setPeriod('');
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>📊 Tableau de Filtres - HeroTool</h1>
        <p>Gestion et suivi des filtres automobiles</p>
      </header>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>Devis</h3>
          <p className="stat-value">{stats. total}</p>
        </div>
        <div className="stat-card">
          <h3>Total Filtres</h3>
          <p className="stat-value">{stats.totalFilters}</p>
        </div>
      </div>

      <PeriodFilter
        period={period}
        setPeriod={setPeriod}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        onReset={handleReset}
      />

      <FilterTable quotes={filteredQuotes} />
    </div>
  );
};

export default Dashboard;