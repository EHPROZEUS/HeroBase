// Service pour calculer les statistiques des interventions

/**
 * Extrait et compte les interventions depuis itemStates
 * @param {Array} quotes - Liste des devis
 * @returns {Object} - Statistiques par type d'intervention
 */
export const calculateInterventionStats = (quotes) => {
  const stats = {
    // Filtres
    filtreHuile: 0,
    filtreAir: 0,
    filtreCarburant: 0,
    filtrePollen: 0,
    
    // Bougies
    bougies: 0,
    
    // Balais
    balaisAv: 0,
    balaiAr: 0,
    
    // Freinage
    plaquettesAv: 0,
    plaquettesAr: 0,
    disquesPlaquettesAv: 0,
    disquesPlaquettesAr: 0,
    
    // Courroies
    courroieDistribution: 0,
    courroieAccessoire: 0,
    
    // Amortisseurs
    amortisseursAvant: 0,
    amortisseursArriere: 0,
    
    // Pneus
    pneusAvant: 0,
    pneusArriere: 0,
    pneus4: 0,
    
    // Divers
    vidangeBoite: 0,
    liquideFrein: 0,
    liquideRefroidissement: 0,
    miseANiveau: 0,
    geometriePara: 0,
    triangles: 0,
    
    // Carrosserie - Portes
    LPCAR: 0,
    LPCAV: 0,
    LPD: 0,
    LPG: 0,
    
    // Carrosserie - Ailes
    LAAR: 0,
    LAAV: 0,
    
    // Carrosserie - Pare-chocs
    LCP: 0,
    LCPAR: 0,
    
    // Carrosserie - Montants
    LMAV: 0,
    LMAR: 0,
    
    // Carrosserie - Autres
    PLU: 0,
    DSP: 0,
  };

  quotes.forEach(quote => {
    // Vérifier si itemStates existe
    if (quote.itemStates && typeof quote.itemStates === 'object') {
      // Compter chaque intervention (valeur = 1 signifie intervention effectuée)
      Object.keys(stats).forEach(key => {
        if (quote.itemStates[key] === 1) {
          stats[key]++;
        }
      });
    }
  });

  return stats;
};

/**
 * Regroupe les statistiques par catégories
 * @param {Object} stats - Statistiques brutes
 * @returns {Object} - Statistiques groupées par catégorie
 */
export const groupStatsByCategory = (stats) => {
  return {
    filtres: stats.filtreHuile + stats.filtreAir + stats.filtreCarburant + stats.filtrePollen,
    freinage: stats.plaquettesAv + stats.plaquettesAr + stats.disquesPlaquettesAv + stats.disquesPlaquettesAr,
    pneus: stats.pneusAvant + stats.pneusArriere + stats.pneus4,
    balais: stats.balaisAv + stats.balaiAr,
    courroies: stats.courroieDistribution + stats.courroieAccessoire,
    amortisseurs: stats.amortisseursAvant + stats.amortisseursArriere,
    liquides: stats.liquideFrein + stats.liquideRefroidissement + stats.vidangeBoite,
    carrosserie: {
      portes: stats.LPCAR + stats.LPCAV + stats.LPD + stats.LPG,
      ailes: stats.LAAR + stats.LAAV,
      pareChocs: stats.LCP + stats.LCPAR,
      montants: stats.LMAV + stats.LMAR,
      autres: stats.PLU + stats.DSP,
    },
    mecanique: stats.bougies + stats.geometriePara + stats.triangles + stats.miseANiveau,
  };
};

/**
 * Définit les interventions à afficher avec leurs métadonnées
 * @param {Object} stats - Statistiques brutes
 * @returns {Array} - Liste des interventions avec icônes et couleurs
 */
export const getDisplayableInterventions = (stats) => {
  const interventions = [
    // Filtres (priorité 1)
    { key: 'filtreHuile', name: 'Filtres à huile', icon: '🛢️', color: '#FFB74D', category: 'filtres' },
    { key: 'filtreAir', name: 'Filtres à air', icon: '🌬️', color: '#81C784', category: 'filtres' },
    { key: 'filtreCarburant', name: 'Filtres carburant', icon: '⚡', color: '#FF8A65', category: 'filtres' },
    { key: 'filtrePollen', name: 'Filtres pollen', icon: '🍃', color: '#A5D6A7', category: 'filtres' },
    
    // Bougies (priorité 2)
    { key: 'bougies', name: 'Bougies', icon: '⚡', color: '#FFD54F', category: 'mecanique' },
    
    // Freinage (priorité 3)
    { key: 'plaquettesAv', name: 'Plaquettes avant', icon: '🔴', color: '#E57373', category: 'freinage' },
    { key: 'plaquettesAr', name: 'Plaquettes arrière', icon: '🔴', color: '#EF5350', category: 'freinage' },
    { key: 'disquesPlaquettesAv', name: 'Disques + Plaquettes AV', icon: '⚙️', color: '#FF7043', category: 'freinage' },
    { key: 'disquesPlaquettesAr', name: 'Disques + Plaquettes AR', icon: '⚙️', color: '#FF6F00', category: 'freinage' },
    
    // Pneus (priorité 4)
    { key: 'pneusAvant', name: 'Pneus avant', icon: '🛞', color: '#9575CD', category: 'pneus' },
    { key: 'pneusArriere', name: 'Pneus arrière', icon: '🛞', color: '#7E57C2', category: 'pneus' },
    { key: 'pneus4', name: '4 Pneus', icon: '🛞', color: '#673AB7', category: 'pneus' },
    
    // Balais (priorité 5)
    { key: 'balaisAv', name: 'Balais avant', icon: '🧹', color: '#4FC3F7', category: 'balais' },
    { key: 'balaiAr', name: 'Balai arrière', icon: '🧹', color: '#29B6F6', category: 'balais' },
    
    // Courroies (priorité 6)
    { key: 'courroieDistribution', name: 'Courroie distribution', icon: '🔗', color: '#90A4AE', category: 'courroies' },
    { key: 'courroieAccessoire', name: 'Courroie accessoire', icon: '🔗', color: '#78909C', category: 'courroies' },
    
    // Liquides (priorité 7)
    { key: 'liquideFrein', name: 'Liquide frein', icon: '💧', color: '#64B5F6', category: 'liquides' },
    { key: 'liquideRefroidissement', name: 'Liquide refroidissement', icon: '💧', color: '#42A5F5', category: 'liquides' },
    { key: 'vidangeBoite', name: 'Vidange boîte', icon: '💧', color: '#2196F3', category: 'liquides' },
    
    // Amortisseurs (priorité 8)
    { key: 'amortisseursAvant', name: 'Amortisseurs avant', icon: '🔧', color: '#4DB6AC', category: 'mecanique' },
    { key: 'amortisseursArriere', name: 'Amortisseurs arrière', icon: '🔧', color: '#26A69A', category: 'mecanique' },
    
    // Autres mécanique
    { key: 'miseANiveau', name: 'Mise à niveau', icon: '🔧', color: '#AED581', category: 'mecanique' },
    { key: 'geometriePara', name: 'Géométrie parallélisme', icon: '🔧', color: '#9CCC65', category: 'mecanique' },
    { key: 'triangles', name: 'Triangles', icon: '🔧', color: '#8BC34A', category: 'mecanique' },
  ];

  // Filtrer les interventions avec valeur > 0
  return interventions
    .filter(intervention => stats[intervention.key] > 0)
    .map(intervention => ({
      ...intervention,
      count: stats[intervention.key],
    }));
};

/**
 * Obtient les statistiques de carrosserie
 * @param {Object} stats - Statistiques brutes
 * @returns {Array} - Liste des éléments de carrosserie avec leurs totaux
 */
export const getCarrosserieStats = (stats) => {
  const carrosserie = [
    // Portes
    { key: 'LPCAR', name: 'Porte conducteur arrière', icon: '🚪', count: stats.LPCAR || 0 },
    { key: 'LPCAV', name: 'Porte conducteur avant', icon: '🚪', count: stats.LPCAV || 0 },
    { key: 'LPD', name: 'Porte droite', icon: '🚪', count: stats.LPD || 0 },
    { key: 'LPG', name: 'Porte gauche', icon: '🚪', count: stats.LPG || 0 },
    
    // Ailes
    { key: 'LAAR', name: 'Aile arrière', icon: '🔲', count: stats.LAAR || 0 },
    { key: 'LAAV', name: 'Aile avant', icon: '🔲', count: stats.LAAV || 0 },
    
    // Pare-chocs
    { key: 'LCP', name: 'Pare-choc', icon: '🔳', count: stats.LCP || 0 },
    { key: 'LCPAR', name: 'Pare-choc arrière', icon: '🔳', count: stats.LCPAR || 0 },
    
    // Montants
    { key: 'LMAV', name: 'Montant avant', icon: '📏', count: stats.LMAV || 0 },
    { key: 'LMAR', name: 'Montant arrière', icon: '📏', count: stats.LMAR || 0 },
    
    // Autres
    { key: 'PLU', name: 'PLU', icon: '🔧', count: stats.PLU || 0 },
    { key: 'DSP', name: 'DSP', icon: '🔧', count: stats.DSP || 0 },
  ];

  // Filtrer les éléments avec count > 0
  return carrosserie.filter(item => item.count > 0);
};

/**
 * Filtre les quotes par période rapide
 * @param {Array} quotes - Liste des devis
 * @param {string} quickPeriod - Période ('today', 'month', 'year', 'all')
 * @returns {Array} - Devis filtrés
 */
export const filterByQuickPeriod = (quotes, quickPeriod) => {
  if (quickPeriod === 'all') {
    return quotes;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return quotes.filter(quote => {
    if (!quote.dateVehicule) return false;
    
    const quoteDate = new Date(quote.dateVehicule);
    quoteDate.setHours(0, 0, 0, 0);

    switch (quickPeriod) {
      case 'today':
        return quoteDate.getTime() === today.getTime();
      
      case 'month':
        return quoteDate.getMonth() === today.getMonth() && 
               quoteDate.getFullYear() === today.getFullYear();
      
      case 'year':
        return quoteDate.getFullYear() === today.getFullYear();
      
      default:
        return true;
    }
  });
};
