# Travel Quotation System

## Overview
The Travel Quotation System is a web application designed to create and manage travel quotations. Users can input client information, travel details, and pricing options to generate quotes. The application also allows users to view, download, and delete previously saved quotes.

## Features
- Create new travel quotations with client and travel details.
- Manage pricing for various services including accommodation, meals, and activities.
- View a history of previously saved quotations.
- Download quotations as HTML files.
- Responsive design for optimal viewing on different devices.

## Project Structure
```
travel-quotation-system
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── index.jsx           # Entry point for the React application
│   ├── App.jsx             # Main App component
│   ├── components           # Contains all React components
│   │   ├── TravelQuotationSystem.jsx  # Main component for managing quotations
│   │   ├── QuoteForm.jsx   # Component for the quotation form
│   │   └── QuoteList.jsx    # Component for displaying saved quotes
│   ├── hooks                # Custom hooks
│   │   └── useLocalStorage.js # Hook for local storage management
│   ├── utils                # Utility functions
│   │   └── pdf.js          # Functions for PDF generation
│   ├── styles               # CSS styles
│   │   └── index.css       # Global styles
│   └── assets               # Static assets (images, icons, etc.)
├── .gitignore               # Git ignore file
├── package.json             # NPM configuration file
├── tailwind.config.js       # Tailwind CSS configuration
└── postcss.config.js        # PostCSS configuration
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd travel-quotation-system
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.