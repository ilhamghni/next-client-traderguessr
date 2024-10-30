
import { ApexOptions } from 'apexcharts';



export const candleStickOptions: ApexOptions = {

  chart: {

    type: 'candlestick',

  },

  title: {

    text: 'Candlestick Chart',

    align: 'left',

  },

  xaxis: {

    type: 'datetime',

  },

  yaxis: {

    tooltip: {

      enabled: true,

    },

  },

};
