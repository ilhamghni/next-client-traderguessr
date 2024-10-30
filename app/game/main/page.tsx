// next-client-traderguessr/app/game/main/page.tsx
"use client"

import { useState, useEffect } from 'react';
import LiveChart from '@/components/yfinance/CandlestickChart';
import { getStockData } from '@/components/yfinance/api';

export default function Page() {
  const [marketClosed, setMarketClosed] = useState(false);
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStockData('AAPL'); // Replace 'AAPL' with the desired stock symbol
        setStockData(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const portfolioItems = [
    { name: 'AAPL', color: 'green', value: '$150,000', priceChange: '+2%' },
    { name: 'GOOGL', color: 'blue', value: '$200,000', priceChange: '-1%' },
    // Add more items as needed
  ];

  const newsAlerts = [
    "Apple's stock price hits a new high.",
    "Google announces new AI technology.",
    // Add more alerts as needed
  ];

  return (
    <main className='bg-white p-8'>
      {/* Portfolio Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold'>Portfolio $19,715,000</h1>
        <p>Invested $19,705,000 • Cash $10,000</p>
      </div>

      {/* Chart */}
      <div className='mb-8'>
        <LiveChart stockSymbol="AAPL" />
      </div>

      {/* News Alerts */}
      <div className='mb-8 bg-blue-50 p-4 rounded-md'>
        <h2 className='text-lg font-semibold mb-2'>News Alerts</h2>
        {newsAlerts.map((alert, index) => (
          <p key={index} className='text-sm'>
            {alert}
          </p>
        ))}
      </div>

      {/* Trading Options */}
      <div className='space-y-4'>
        {portfolioItems.map((item, index) => (
          <div
            key={index}
            className='flex justify-between items-center bg-white border rounded-md p-4 shadow-sm'
          >
            <div className='flex items-center'>
              <div
                className={`h-10 w-10 bg-${item.color}-500 rounded-full mr-4`}
              />
              <div>
                <p className='text-lg font-semibold'>{item.name}</p>
                <p className='text-sm text-gray-500'>1,000 units</p>
              </div>
            </div>
            <div>
              <p className='text-lg'>{item.value}</p>
              <p className='text-sm text-green-500'>{item.priceChange}</p>
            </div>
            <div className='flex space-x-2'>
              <button className='px-4 py-2 bg-green-500 text-white rounded-md'>
                Buy
              </button>
              <button className='px-4 py-2 bg-red-500 text-white rounded-md'>
                Sell
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className='mt-8 text-center text-gray-500'>
        <p>Market closes in 0 minutes - market closing soon</p>
      </div>
    </main>
  );
}