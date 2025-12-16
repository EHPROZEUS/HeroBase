import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

// Récupérer tous les devis
export const getAllQuotes = async () => {
  try {
    const quotesCollection = collection(db, 'herotoolQuotes');
    const querySnapshot = await getDocs(quotesCollection);
    
    const quotes = [];
    querySnapshot.forEach((doc) => {
      quotes.push({
        id: doc.id,
        ...doc.data()  // ✅ CORRECTION : enlever l'espace après ... 
      });
    });
    
    return quotes;
  } catch (error) {
    console.error('Erreur lors de la récupération des devis:', error);
    throw error;
  }
};

// Récupérer les devis par période
export const getQuotesByPeriod = async (startDate, endDate) => {
  try {
    const quotesCollection = collection(db, 'herotoolQuotes');
    const q = query(
      quotesCollection,
      where('dateVehicule', '>=', startDate),
      where('dateVehicule', '<=', endDate)
    );
    
    const querySnapshot = await getDocs(q);
    
    const quotes = [];
    querySnapshot.forEach((doc) => {
      quotes.push({
        id: doc.id,
        ... doc.data()  // ✅ CORRECTION :  enlever l'espace après ... 
      });
    });
    
    return quotes;
  } catch (error) {
    console.error('Erreur lors de la récupération des devis par période:', error);
    throw error;
  }
};