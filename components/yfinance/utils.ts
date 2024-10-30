// next-client-traderguessr/components/yfinance/utils.ts
export const formatStockData = (stockData: any[]) => {
  return stockData.map((item) => ({
    x: new Date(item.Date).getTime(),
    y: [item.Open, item.High, item.Low, item.Close],
  }));
};