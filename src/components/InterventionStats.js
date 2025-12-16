import React, { useMemo } from 'react';
import { calculateInterventionStats, groupStatsByCategory } from '../services/statsService';
import '../styles/InterventionStats.css';

const InterventionStats = ({ quotes }) => {
  // Calculer les statistiques
  const { stats, categories } = useMemo(() => {
    return calculateInterventionStats(quotes);
  }, [quotes]);

  // Grouper par catégorie
  const groupedStats = useMemo(() => {
    return groupStatsByCategory(stats);
  }, [stats]);

  // Labels de catégories en français
  const categoryLabels = {
    filtres: '🔧 Filtres',
    mecanique: '⚙️ Mécanique',
    freinage:  '🔴 Freinage',
    pneus: '🛞 Pneumatiques',
    liquides:  '💧 Liquides',
    carrosserie: '🚗 Carrosserie',
    autres: '📦 Autres'
  };

  if (quotes.length === 0) {
    return <div className="no-data">Aucune donnée disponible pour cette période.</div>;
  }

  return (
    <div className="intervention-stats">
      {/* Résumé global */}
      <div className="stats-summary">
        <div className="summary-card">
          <h3>Total Devis</h3>
          <p className="summary-value">{quotes.length}</p>
        </div>
        <div className="summary-card">
          <h3>Total Interventions</h3>
          <p className="summary-value">
            {Object.values(categories).reduce((sum, val) => sum + val, 0)}
          </p>
        </div>
      </div>

      {/* Stats par catégorie */}
      {Object.entries(categoryLabels).map(([category, label]) => {
        const categoryStats = groupedStats[category];
        
        if (! categoryStats || categoryStats.length === 0) return null;

        return (
          <div key={category} className="stats-category">
            <h2 className="category-title">{label}</h2>
            <div className="stats-grid">
              {categoryStats.map(stat => (
                <div key={stat.key} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-info">
                    <h3 className="stat-label">{stat.label}</h3>
                    <p className="stat-value">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Message si aucune stat */}
      {Object.values(categories).every(val => val === 0) && (
        <div className="no-data">Aucune intervention trouvée pour cette période.</div>
      )}
    </div>
  );
};

export default InterventionStats;
