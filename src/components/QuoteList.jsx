import React from 'react';
import { Download, Trash2 } from 'lucide-react';

const QuoteList = ({ quotes, onDownload, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Previous Quotations</h2>
      
      {quotes.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>No quotes saved yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {quotes.map((quote) => (
            <div key={quote.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 mr-4">Quote #{quote.id}</h3>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {quote.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Client:</span>
                      <p className="text-gray-800">{quote.clientName}</p>
                      <p className="text-gray-600">{quote.phoneNumber}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Destination:</span>
                      <p className="text-gray-800">{quote.destination}</p>
                      <p className="text-gray-600">{quote.dateFrom} to {quote.dateTo}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Travelers:</span>
                      <p className="text-gray-800">{quote.adults} Adults, {quote.kids} Kids</p>
                      {quote.kidsAges && quote.kidsAges.length > 0 && (
                        <p className="text-gray-600">Ages: {quote.kidsAges.join(', ')}</p>
                      )}
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Total:</span>
                      <p className="text-xl font-bold text-green-600">${quote.total.toFixed(2)}</p>
                      <p className="text-gray-600">Created: {new Date(quote.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => onDownload(quote)}
                    className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 flex items-center text-sm"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </button>
                  <button
                    onClick={() => onDelete(quote.id)}
                    className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 flex items-center text-sm"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuoteList;