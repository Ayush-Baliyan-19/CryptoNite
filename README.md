# Cryptonite: Cryptocurrency Tracker Web Application

## Overview
Cryptonite is a web application designed to track various cryptocurrencies. Built using Next.js and integrated with the CoinGecko API, it provides real-time updates, detailed information, and historical data on individual cryptocurrencies. 

Check out the live demo: [Cryptonite](https://crypto-nite-five.vercel.app/)

## Features

### Homepage
- **Global Market Cap Chart**: Displays a line/candle graph showing the global market cap data for cryptocurrencies using ShadCN for charts.
- **Public Companies Holdings**: Information about public companies holding Bitcoin and Ethereum.

### Explore Page
- **Paginated Coin List/Grid**: Shows a paginated list or grid of cryptocurrencies with 20 items per page. Navigation allows users to load more items.
- **Navigation**: Clicking on a cryptocurrency card routes the user to the product page of the selected cryptocurrency.

### Product Page
- **Basic Information**: Displays basic details about the selected cryptocurrency.
- **Price Chart**: Shows a candle/line graph of the cryptocurrency’s price over time.

### Common Header
- **Application Name**: Displays the application name.
- **Search Bar**: Includes a search bar that shows suggested cryptocurrencies as the user types.
- **Draggable Watchlist**: Allows users to add coins to their watchlist by dragging and dropping them.

## Technologies Used

- **Frontend Framework**: Next.js
- **Styling**: CSS, Tailwind CSS, Styled-Components
- **State Management**: Redux/Redux Toolkit
- **Charts**: ShadCN
- **API Integration**: CoinGecko API
- **Deployment**: Vercel

## API Integration

### CoinGecko API
The application uses the CoinGecko API to fetch real-time and historical data on cryptocurrencies. The API key is managed to respect request limits and cache responses.

### Caching
All API responses are cached to improve performance and reduce the number of API requests.

## Folder Structure

The project follows a standard, well-defined folder structure:
/pages

/components
/utils
/public

### Key Files
- **utils.js**: Contains most of the utility functions and API request handlers.
- **/components**: Contains reusable components like charts, cards, and navigation elements.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cryptonite.git
    ```
2. Install dependencies:
3. ```bash
   npm install
4. Start the development server:
   ```bash
    npm run dev
5. Open the application in your browser:
   ```bash
   http://localhost:3000
## Deployment
The application is deployed on Vercel. You can deploy your own instance by connecting the repository to Vercel and following their deployment instructions.

## Contact
For support or feedback, please reach out via the issues section on GitHub.