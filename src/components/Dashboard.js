import React, { useState, useEffect, useMemo } from 'react';
import { getAllQuotes } from '../services/firebaseService';
import { filterQuotesByPeriod } from '../utils/dateUtils';
import PeriodFilter from './PeriodFilter';
import FilterTable from './FilterTable';
import InterventionStats from './InterventionStats';
import LoadingSpinner from './LoadingSpinner';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [view, setView] = useState('stats'); // 'stats' ou 'table'

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
          (key. startsWith('LP') || key.startsWith('LM')) && typeof quote[key] === 'number'
        );
        return sum + filterKeys.reduce((s, key) => s + (quote[key] || 0), 0);
      }, 0)
    };
  }, [filteredQuotes]);

  const handleReset = () => {
    setPeriod('');
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  // Filtres rapides
  const handleQuickFilter = (filterType) => {
    const today = new Date();
    
    switch (filterType) {
      case 'today':
        setPeriod('day');
        setSelectedDate(today.toISOString().split('T')[0]);
        break;
      case 'month':
        setPeriod('month');
        setSelectedDate(today.toISOString().slice(0, 7)); // YYYY-MM
        break;
      case 'year':
        setPeriod('year');
        setSelectedDate(today.getFullYear().toString());
        break;
      case 'all':
      default:
        handleReset();
        break;
    }
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

      {/* Toggle entre vues */}
      <div className="view-toggle">
        <button 
          className={`toggle-btn ${view === 'stats' ? 'active' : ''}`}
          onClick={() => setView('stats')}
        >
          📊 Statistiques
        </button>
        <button 
          className={`toggle-btn ${view === 'table' ? 'active' : ''}`}
          onClick={() => setView('table')}
        >
          📋 Tableau détaillé
        </button>
      </div>

      {/* Filtres rapides */}
      <div className="quick-filters">
        <button 
          className={`quick-filter-btn ${period === '' ? 'active' : ''}`}
          onClick={() => handleQuickFilter('all')}
        >
          Tout
        </button>
        <button 
          className={`quick-filter-btn ${period === 'day' ? 'active' : ''}`}
          onClick={() => handleQuickFilter('today')}
        >
          Aujourd'hui
        </button>
        <button 
          className={`quick-filter-btn ${period === 'month' ? 'active' : ''}`}
          onClick={() => handleQuickFilter('month')}
        >
          Ce mois
        </button>
        <button 
          className={`quick-filter-btn ${period === 'year' ? 'active' : ''}`}
          onClick={() => handleQuickFilter('year')}
        >
          Cette année
        </button>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>Devis</h3>
          <p className="stat-value">{stats.total}</p>
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

      {/* Affichage conditionnel selon la vue */}
      {view === 'stats' ?  (
        <InterventionStats quotes={filteredQuotes} />
      ) : (
        <FilterTable quotes={filteredQuotes} />
      )}
    </div>
  );
};

export default Dashboard;
