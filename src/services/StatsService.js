// Service pour calculer les statistiques d'interventions

// Mapping des interventions avec leurs labels et icônes
export const INTERVENTION_TYPES = {
  // Filtres
  filtreHuile: { label: 'Filtres à huile', icon: '🛢️', category: 'filtres' },
  filtreAir: { label: 'Filtres à air', icon: '🌬️', category: 'filtres' },
  filtreCarburant: { label: 'Filtres carburant', icon: '⛽', category: 'filtres' },
  filtrePollen: { label: 'Filtres pollen', icon: '🍃', category: 'filtres' },
  
  // Mécanique
  bougies:  { label: 'Bougies', icon: '⚡', category: 'mecanique' },
  courroieDistribution: { label: 'Courroies distribution', icon: '🔗', category: 'mecanique' },
  courroieAccessoire: { label:  'Courroies accessoire', icon: '🔗', category: 'mecanique' },
  triangles: { label: 'Triangles', icon: '🔺', category: 'mecanique' },
  geometriePara: { label: 'Géométrie/Parallélisme', icon: '📐', category: 'mecanique' },
  
  // Freinage
  plaquettesAv: { label: 'Plaquettes avant', icon: '🔴', category: 'freinage' },
  plaquettesAr: { label: 'Plaquettes arrière', icon: '🔴', category:  'freinage' },
  disquesPlaquettesAv: { label: 'Disques + Plaquettes AV', icon: '⚙️', category: 'freinage' },
  disquesPlaquettesAr:  { label: 'Disques + Plaquettes AR', icon: '⚙️', category: 'freinage' },
  
  // Pneus
  pneusAvant:  { label: 'Pneus avant', icon: '🛞', category: 'pneus' },
  pneusArriere: { label: 'Pneus arrière', icon: '🛞', category: 'pneus' },
  pneus4: { label: '4 Pneus', icon: '🛞', category: 'pneus' },
  
  // Amortisseurs
  amortisseursAvant: { label:  'Amortisseurs avant', icon: '🔧', category: 'mecanique' },
  amortisseursArriere: { label: 'Amortisseurs arrière', icon: '🔧', category: 'mecanique' },
  
  // Balais
  balaisAv:  { label: 'Balais avant', icon: '🧹', category: 'autres' },
  balaiAr: { label: 'Balai arrière', icon: '🧹', category: 'autres' },
  
  // Liquides
  liquideFrein:  { label: 'Liquide de frein', icon: '💧', category: 'liquides' },
  liquideRefroidissement: { label: 'Liquide refroidissement', icon: '💧', category: 'liquides' },
  vidangeBoite: { label:  'Vidange boîte', icon: '⚙️', category: 'liquides' },
  miseANiveau: { label:  'Mise à niveau', icon: '💧', category: 'liquides' },
  
  // Carrosserie - Portes
  LPCAR: { label: 'Porte arrière droite', icon: '🚪', category: 'carrosserie' },
  LPCAV: { label: 'Porte avant droite', icon: '🚪', category: 'carrosserie' },
  LPD:  { label: 'Porte droite', icon: '🚪', category: 'carrosserie' },
  LPG:  { label: 'Porte gauche', icon: '🚪', category: 'carrosserie' },
  LPDPARD: { label: 'Demi-porte AR droite', icon: '🚪', category: 'carrosserie' },
  LPDPARG: { label: 'Demi-porte AR gauche', icon: '🚪', category: 'carrosserie' },
  LPDPAVD: { label: 'Demi-porte AV droite', icon: '🚪', category: 'carrosserie' },
  LPDPAVG: { label: 'Demi-porte AV gauche', icon: '🚪', category: 'carrosserie' },
  LPTEARD: { label: 'Porte tôle AR droite', icon: '🚪', category: 'carrosserie' },
  LPTEARG: { label: 'Porte tôle AR gauche', icon: '🚪', category: 'carrosserie' },
  LPTEAVD: { label: 'Porte tôle AV droite', icon: '🚪', category: 'carrosserie' },
  LPTEAVG: { label: 'Porte tôle AV gauche', icon: '🚪', category: 'carrosserie' },
  
  // Carrosserie - Ailes
  LAAR:  { label: 'Aile arrière', icon: '🔰', category: 'carrosserie' },
  LAARD: { label: 'Aile arrière droite', icon: '🔰', category: 'carrosserie' },
  LAARG: { label: 'Aile arrière gauche', icon: '🔰', category: 'carrosserie' },
  LAAVD: { label: 'Aile avant droite', icon: '🔰', category:  'carrosserie' },
  LAAVG: { label: 'Aile avant gauche', icon: '🔰', category: 'carrosserie' },
  
  // Carrosserie - Autres
  LPAVILLON: { label: 'Pavillon', icon: '🏠', category: 'carrosserie' },
  LCP: { label: 'Capot', icon: '🎯', category: 'carrosserie' },
  LH: { label: 'Hayon', icon: '🚗', category: 'carrosserie' },
  LBDCD: { label: 'Bas de caisse droit', icon: '📏', category: 'carrosserie' },
  LBDCG: { label: 'Bas de caisse gauche', icon: '📏', category: 'carrosserie' },
  LBH: { label: 'Bouclier hayon', icon: '🛡️', category: 'carrosserie' },
  
  // Montants
  LMAD: { label: 'Montant A droit', icon: '📊', category: 'carrosserie' },
  LMAG: { label: 'Montant A gauche', icon: '📊', category: 'carrosserie' },
  LMBD: { label: 'Montant B droit', icon: '📊', category: 'carrosserie' },
  LMBG: { label: 'Montant B gauche', icon:  '📊', category: 'carrosserie' },
  LMCD: { label: 'Montant C droit', icon: '📊', category: 'carrosserie' },
  LMCG: { label: 'Montant C gauche', icon: '📊', category:  'carrosserie' },
  LMDD: { label: 'Montant D droit', icon: '📊', category:  'carrosserie' },
  LMDG: { label: 'Montant D gauche', icon: '📊', category: 'carrosserie' },
};

// Calculer les totaux pour chaque type d'intervention
export const calculateInterventionStats = (quotes) => {
  const stats = {};
  const categories = {
    filtres: 0,
    mecanique: 0,
    freinage: 0,
    pneus: 0,
    liquides: 0,
    carrosserie: 0,
    autres: 0
  };

  // Initialiser les compteurs
  Object.keys(INTERVENTION_TYPES).forEach(key => {
    stats[key] = 0;
  });

  // Parcourir tous les devis
  quotes.forEach(quote => {
    const itemStates = quote.itemStates || {};
    
    // Compter chaque intervention
    Object.keys(INTERVENTION_TYPES).forEach(key => {
      if (itemStates[key] === 1 || itemStates[key] === '1' || itemStates[key] === true) {
        stats[key]++;
        const category = INTERVENTION_TYPES[key]. category;
        categories[category]++;
      }
    });
  });

  return { stats, categories };
};

// Filtrer les stats à afficher (enlever celles à 0)
export const getVisibleStats = (stats) => {
  return Object.entries(stats)
    .filter(([key, value]) => value > 0)
    .map(([key, value]) => ({
      key,
      value,
      ... INTERVENTION_TYPES[key]
    }))
    .sort((a, b) => b.value - a.value); // Trier par nombre décroissant
};

// Grouper les stats par catégorie
export const groupStatsByCategory = (stats) => {
  const grouped = {
    filtres: [],
    mecanique: [],
    freinage: [],
    pneus:  [],
    liquides: [],
    carrosserie: [],
    autres: []
  };

  Object.entries(stats).forEach(([key, value]) => {
    if (value > 0 && INTERVENTION_TYPES[key]) {
      const category = INTERVENTION_TYPES[key].category;
      grouped[category].push({
        key,
        value,
        ...INTERVENTION_TYPES[key]
      });
    }
  });

  // Trier chaque catégorie par valeur décroissante
  Object.keys(grouped).forEach(category => {
    grouped[category].sort((a, b) => b.value - a.value);
  });

  return grouped;
};
