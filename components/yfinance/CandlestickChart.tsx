// next-client-traderguessr/components/yfinance/CandlestickChart.tsx
import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { getStockData } from './api';
import { formatStockData } from './utils';
import { candleStickOptions } from './constants';

// Dynamically import ReactApexChart with SSR disabled
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface LiveChartProps {
  stockSymbol: string;
}

const LiveChart: React.FC<LiveChartProps> = ({ stockSymbol }) => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStockData(stockSymbol);
      setStockData(data);
    };

    fetchData();
  }, [stockSymbol]);

  const seriesData = useMemo(() => formatStockData(stockData), [stockData]);

  // Check if window is defined
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <ReactApexChart
      series={[{ data: seriesData }]}
      options={candleStickOptions}
      type="candlestick"
      height={350}
    />
  );
};

export default LiveChart;