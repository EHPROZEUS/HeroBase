import React, { useState, useMemo } from 'react';
import {
  calculateInterventionStats,
  groupStatsByCategory,
  getDisplayableInterventions,
  getCarrosserieStats,
  filterByQuickPeriod,
} from '../services/statsService';
import '../styles/InterventionStats.css';

const InterventionStats = ({ quotes }) => {
  const [quickPeriod, setQuickPeriod] = useState('all');

  // Filtrer les quotes selon la période rapide sélectionnée
  const filteredQuotes = useMemo(() => {
    return filterByQuickPeriod(quotes, quickPeriod);
  }, [quotes, quickPeriod]);

  // Calculer les statistiques
  const stats = useMemo(() => {
    return calculateInterventionStats(filteredQuotes);
  }, [filteredQuotes]);

  // Obtenir les interventions à afficher
  const interventions = useMemo(() => {
    return getDisplayableInterventions(stats);
  }, [stats]);

  // Obtenir les statistiques de carrosserie
  const carrosserieStats = useMemo(() => {
    return getCarrosserieStats(stats);
  }, [stats]);

  // Calculer les catégories agrégées
  const categories = useMemo(() => {
    return groupStatsByCategory(stats);
  }, [stats]);

  const quickPeriodButtons = [
    { value: 'all', label: 'Tout', icon: '📅' },
    { value: 'today', label: "Aujourd'hui", icon: '📆' },
    { value: 'month', label: 'Ce mois', icon: '📊' },
    { value: 'year', label: 'Cette année', icon: '📈' },
  ];

  return (
    <div className="intervention-stats">
      {/* Filtres rapides */}
      <div className="quick-filters">
        {quickPeriodButtons.map(button => (
          <button
            key={button.value}
            className={`quick-filter-btn ${quickPeriod === button.value ? 'active' : ''}`}
            onClick={() => setQuickPeriod(button.value)}
          >
            <span className="filter-icon">{button.icon}</span>
            {button.label}
          </button>
        ))}
      </div>

      {/* Info période */}
      <div className="period-info">
        <p>📋 <strong>{filteredQuotes.length}</strong> devis analysés</p>
      </div>

      {/* Statistiques globales par catégorie */}
      <div className="category-summary">
        <h2>📊 Vue d'ensemble</h2>
        <div className="category-cards">
          {categories.filtres > 0 && (
            <div className="category-card" style={{ borderLeftColor: '#FFB74D' }}>
              <div className="category-icon">🛢️</div>
              <div className="category-info">
                <h3>Filtres</h3>
                <p className="category-count">{categories.filtres}</p>
              </div>
            </div>
          )}
          {categories.freinage > 0 && (
            <div className="category-card" style={{ borderLeftColor: '#E57373' }}>
              <div className="category-icon">🔴</div>
              <div className="category-info">
                <h3>Freinage</h3>
                <p className="category-count">{categories.freinage}</p>
              </div>
            </div>
          )}
          {categories.pneus > 0 && (
            <div className="category-card" style={{ borderLeftColor: '#9575CD' }}>
              <div className="category-icon">🛞</div>
              <div className="category-info">
                <h3>Pneus</h3>
                <p className="category-count">{categories.pneus}</p>
              </div>
            </div>
          )}
          {categories.balais > 0 && (
            <div className="category-card" style={{ borderLeftColor: '#4FC3F7' }}>
              <div className="category-icon">🧹</div>
              <div className="category-info">
                <h3>Balais</h3>
                <p className="category-count">{categories.balais}</p>
              </div>
            </div>
          )}
          {categories.courroies > 0 && (
            <div className="category-card" style={{ borderLeftColor: '#90A4AE' }}>
              <div className="category-icon">🔗</div>
              <div className="category-info">
                <h3>Courroies</h3>
                <p className="category-count">{categories.courroies}</p>
              </div>
            </div>
          )}
          {categories.liquides > 0 && (
            <div className="category-card" style={{ borderLeftColor: '#64B5F6' }}>
              <div className="category-icon">💧</div>
              <div className="category-info">
                <h3>Liquides</h3>
                <p className="category-count">{categories.liquides}</p>
              </div>
            </div>
          )}
          {categories.amortisseurs > 0 && (
            <div className="category-card" style={{ borderLeftColor: '#4DB6AC' }}>
              <div className="category-icon">🔧</div>
              <div className="category-info">
                <h3>Amortisseurs</h3>
                <p className="category-count">{categories.amortisseurs}</p>
              </div>
            </div>
          )}
          {categories.mecanique > 0 && (
            <div className="category-card" style={{ borderLeftColor: '#AED581' }}>
              <div className="category-icon">⚙️</div>
              <div className="category-info">
                <h3>Mécanique</h3>
                <p className="category-count">{categories.mecanique}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interventions détaillées */}
      {interventions.length > 0 && (
        <div className="interventions-section">
          <h2>🔧 Détail des interventions</h2>
          <div className="interventions-grid">
            {interventions.map(intervention => (
              <div
                key={intervention.key}
                className="intervention-card"
                style={{ borderLeftColor: intervention.color }}
              >
                <div className="intervention-icon">{intervention.icon}</div>
                <div className="intervention-info">
                  <h3>{intervention.name}</h3>
                  <p className="intervention-count">{intervention.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section Carrosserie */}
      {carrosserieStats.length > 0 && (
        <div className="carrosserie-section">
          <h2>🚗 Carrosserie</h2>
          <div className="carrosserie-grid">
            {carrosserieStats.map(item => (
              <div key={item.key} className="carrosserie-card">
                <div className="carrosserie-icon">{item.icon}</div>
                <div className="carrosserie-info">
                  <h3>{item.name}</h3>
                  <p className="carrosserie-count">{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message si aucune donnée */}
      {interventions.length === 0 && carrosserieStats.length === 0 && (
        <div className="no-stats">
          <p>📊 Aucune intervention trouvée pour cette période.</p>
        </div>
      )}
    </div>
  );
};

export default InterventionStats;
