import React, { useState, useEffect } from 'react';
import QuoteForm from './QuoteForm';
import QuoteList from './QuoteList';
import { generatePDF } from '../utils/pdf';
import useLocalStorage from '../hooks/useLocalStorage';

const TravelQuotationSystem = () => {
  const [quotes, setQuotes] = useLocalStorage('travel-quotes', []);
  const [currentView, setCurrentView] = useState('form');

  // Form data state
  const [formData, setFormData] = useState({
    clientName: '',
    phoneNumber: '',
    destination: '',
    dateFrom: '',
    dateTo: '',
    adults: 1,
    kids: 0,
    kidsAges: [],
    activities: 'Group Safari',
    accommodation: 'Budget Option',
    meals: 'Bed and Breakfast',
    transportation: 'Tour Van',
    professionalGuide: false,
    parkFees: false,
    // Service enablers
    includeActivities: false,
    includeAccommodation: false,
    includeMeals: false,
    includeTransportation: false,
    // Currency settings
    currency: 'USD',
    exchangeRate: 130, // USD to KSH rate
    prices: {
      activities: 0,
      accommodation: 0,
      meals: 0,
      transportation: 0,
      professionalGuide: 0,
      parkFees: 0
    }
  });

  // Update kids ages array when kids number changes
  useEffect(() => {
    const newKidsAges = Array(formData.kids).fill('').map((_, i) => formData.kidsAges[i] || '');
    setFormData(prev => ({ ...prev, kidsAges: newKidsAges }));
  }, [formData.kids]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePriceChange = (field, value) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      prices: { ...prev.prices, [field]: numValue }
    }));
  };

  const handleKidsAgesChange = (index, value) => {
    const newKidsAges = [...formData.kidsAges];
    newKidsAges[index] = value;
    setFormData(prev => ({ ...prev, kidsAges: newKidsAges }));
  };

  // Currency conversion functions
  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return amount;
    if (fromCurrency === 'USD' && toCurrency === 'KSH') {
      return amount * formData.exchangeRate;
    }
    if (fromCurrency === 'KSH' && toCurrency === 'USD') {
      return amount / formData.exchangeRate;
    }
    return amount;
  };

  const formatCurrency = (amount, currency) => {
    const symbol = currency === 'USD' ? '$' : 'KSH ';
    return `${symbol}${amount.toFixed(2)}`;
  };

  const calculateTotal = () => {
    const { prices, currency } = formData;
    let total = 0;
    
    // Only include prices for checked services - prices are in selected currency
    if (formData.includeActivities) total += parseFloat(prices.activities) || 0;
    if (formData.includeAccommodation) total += parseFloat(prices.accommodation) || 0;
    if (formData.includeMeals) total += parseFloat(prices.meals) || 0;
    if (formData.includeTransportation) total += parseFloat(prices.transportation) || 0;
    if (formData.professionalGuide) total += parseFloat(prices.professionalGuide) || 0;
    if (formData.parkFees) total += parseFloat(prices.parkFees) || 0;
    
    return total;
  };

  const getTotalInSelectedCurrency = () => {
    return calculateTotal(); // Total is already in selected currency
  };

  const getTotalInUSD = () => {
    const total = calculateTotal();
    if (formData.currency === 'KSH') {
      return convertCurrency(total, 'KSH', 'USD');
    }
    return total;
  };

  const getTotalInKSH = () => {
    const total = calculateTotal();
    if (formData.currency === 'USD') {
      return convertCurrency(total, 'USD', 'KSH');
    }
    return total;
  };

  const saveQuote = () => {
    if (!formData.clientName || !formData.destination) {
      alert('Please fill in client name and destination');
      return;
    }

    const newQuote = {
      ...formData,
      total: getTotalInUSD(), // Always store total in USD for consistency
      totalInSelectedCurrency: calculateTotal(), // Store in selected currency too
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'Active'
    };
    
    setQuotes([...quotes, newQuote]);
    alert('Quote saved successfully!');
    
    // Reset form
    setFormData({
      clientName: '',
      phoneNumber: '',
      destination: '',
      dateFrom: '',
      dateTo: '',
      adults: 1,
      kids: 0,
      kidsAges: [],
      activities: 'Group Safari',
      accommodation: 'Budget Option',
      meals: 'Bed and Breakfast',
      transportation: 'Tour Van',
      professionalGuide: false,
      parkFees: false,
      // Service enablers
      includeActivities: false,
      includeAccommodation: false,
      includeMeals: false,
      includeTransportation: false,
      // Currency settings
      currency: 'USD',
      exchangeRate: 130,
      prices: {
        activities: 0,
        accommodation: 0,
        meals: 0,
        transportation: 0,
        professionalGuide: 0,
        parkFees: 0
      }
    });
  };

  const handleDownload = async (quote) => {
    try {
      await generatePDF(quote);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const handleDelete = (quoteId) => {
    if (window.confirm('Are you sure you want to delete this quote?')) {
      setQuotes(quotes.filter(quote => quote.id !== quoteId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Travel Quotation System
          </h1>
          <p className="text-gray-600">Create and manage travel quotations</p>
        </header>

        <nav className="flex justify-center mb-8">
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentView('form')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'form'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Create Quote
            </button>
            <button
              onClick={() => setCurrentView('list')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              View Quotes ({quotes.length})
            </button>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto">
          {currentView === 'form' ? (
            <QuoteForm 
              formData={formData}
              handleInputChange={handleInputChange}
              handlePriceChange={handlePriceChange}
              handleKidsAgesChange={handleKidsAgesChange}
              calculateTotal={calculateTotal}
              getTotalInSelectedCurrency={getTotalInSelectedCurrency}
              getTotalInUSD={getTotalInUSD}
              getTotalInKSH={getTotalInKSH}
              formatCurrency={formatCurrency}
              saveQuote={saveQuote}
            />
          ) : (
            <QuoteList 
              quotes={quotes}
              onDownload={handleDownload}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelQuotationSystem;