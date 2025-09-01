import React from 'react';
import { Users, MapPin, DollarSign, Save } from 'lucide-react';

const QuoteForm = ({ formData, handleInputChange, handlePriceChange, handleKidsAgesChange, calculateTotal, getTotalInSelectedCurrency, getTotalInUSD, getTotalInKSH, formatCurrency, saveQuote }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Travel Quotation</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Client & Travel Details */}
        <div className="space-y-6">
          {/* Client Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Client Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>

          {/* Travel Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Travel Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter destination"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date From</label>
                  <input
                    type="date"
                    value={formData.dateFrom}
                    onChange={(e) => handleInputChange('dateFrom', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date To</label>
                  <input
                    type="date"
                    value={formData.dateTo}
                    onChange={(e) => handleInputChange('dateTo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Adults</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.adults}
                    onChange={(e) => handleInputChange('adults', parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Kids</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.kids}
                    onChange={(e) => handleInputChange('kids', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              {formData.kids > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ages of Kids</label>
                  <div className="grid grid-cols-3 gap-2">
                    {formData.kidsAges.map((age, index) => (
                      <input
                        key={index}
                        type="number"
                        min="0"
                        max="17"
                        value={age}
                        onChange={(e) => handleKidsAgesChange(index, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Kid ${index + 1} age`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Package Details & Pricing */}
        <div className="space-y-6">
          {/* Package Selection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Package Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activities</label>
                <select
                  value={formData.activities}
                  onChange={(e) => handleInputChange('activities', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Group Safari">Group Safari</option>
                  <option value="Private Safari">Private Safari</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation</label>
                <select
                  value={formData.accommodation}
                  onChange={(e) => handleInputChange('accommodation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Budget Option">Budget Option</option>
                  <option value="Mid-Range">Mid-Range</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meals</label>
                <select
                  value={formData.meals}
                  onChange={(e) => handleInputChange('meals', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Bed and Breakfast">Bed and Breakfast</option>
                  <option value="Half Board">Half Board</option>
                  <option value="Full Board">Full Board</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transportation</label>
                <select
                  value={formData.transportation}
                  onChange={(e) => handleInputChange('transportation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Tour Van">Tour Van</option>
                  <option value="4 BY 4 Landcruiser">4 BY 4 Landcruiser</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.includeActivities}
                    onChange={(e) => handleInputChange('includeActivities', e.target.checked)}
                    className="mr-2"
                  />
                  Include Activities in Quote
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.includeAccommodation}
                    onChange={(e) => handleInputChange('includeAccommodation', e.target.checked)}
                    className="mr-2"
                  />
                  Include Accommodation in Quote
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.includeMeals}
                    onChange={(e) => handleInputChange('includeMeals', e.target.checked)}
                    className="mr-2"
                  />
                  Include Meals in Quote
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.includeTransportation}
                    onChange={(e) => handleInputChange('includeTransportation', e.target.checked)}
                    className="mr-2"
                  />
                  Include Transportation in Quote
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.professionalGuide}
                    onChange={(e) => handleInputChange('professionalGuide', e.target.checked)}
                    className="mr-2"
                  />
                  Service of Professional Guide
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.parkFees}
                    onChange={(e) => handleInputChange('parkFees', e.target.checked)}
                    className="mr-2"
                  />
                  Park Fees
                </label>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                Pricing
              </h3>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Currency:</label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="KSH">KSH</option>
                </select>
              </div>
            </div>
            <div className="space-y-3">
              {formData.includeActivities && (
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-medium">Activities:</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.prices.activities}
                    onChange={(e) => handlePriceChange('activities', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              {formData.includeAccommodation && (
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-medium">Accommodation:</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.prices.accommodation}
                    onChange={(e) => handlePriceChange('accommodation', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              {formData.includeMeals && (
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-medium">Meals:</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.prices.meals}
                    onChange={(e) => handlePriceChange('meals', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              {formData.includeTransportation && (
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-medium">Transportation:</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.prices.transportation}
                    onChange={(e) => handlePriceChange('transportation', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              {formData.professionalGuide && (
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-medium">Professional Guide:</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.prices.professionalGuide}
                    onChange={(e) => handlePriceChange('professionalGuide', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              {formData.parkFees && (
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-medium">Park Fees:</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.prices.parkFees}
                    onChange={(e) => handlePriceChange('parkFees', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              <div className="border-t pt-3">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-xl font-bold">
                    <span>TOTAL:</span>
                    <span className="text-green-600">{formatCurrency(getTotalInSelectedCurrency(), formData.currency)}</span>
                  </div>
                  {formData.currency === 'KSH' && (
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <span>USD Equivalent:</span>
                      <span>${getTotalInUSD().toFixed(2)}</span>
                    </div>
                  )}
                  {formData.currency === 'USD' && (
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <span>KSH Equivalent:</span>
                      <span>KSH {getTotalInKSH().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                    <span>Exchange Rate:</span>
                    <span>1 USD = {formData.exchangeRate} KSH</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={saveQuote}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Quote
        </button>
      </div>
    </div>
  );
};

export default QuoteForm;