export const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  parsing: false,
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      type: 'time',
      display: true,
      offset: true,
      time: {
        displayFormats: {
          millisecond: 'yyyy-MM-dd H:mm:ss',
          second: 'yyyy-MM-dd H:mm:ss',
          minute: 'yyyy-MM-dd H:mm:ss',
          hour: 'yyyy-MM-dd H:mm:ss',
          day: 'yyyy-MM-dd H:mm:ss',
          week: 'yyyy-MM-dd H:mm:ss',
          month: 'yyyy-MM-dd H:mm:ss',
          quarter: 'yyyy-MM-dd H:mm:ss',
          year: 'yyyy-MM-dd H:mm:ss',
        },
      },
      ticks: {
        major: {
          enabled: true,
          fontStyle: 'bold',
        },
        autoSkip: true,
        autoSkipPadding: 50,
        maxRotation: 0,
        source: 'auto',
        callback: (label: string) =>
          /\s/.test(label) ? label.split(' ').reverse() : label,
      },
      // y: {
      //   suggestedMin: 0,
      //   suggestedMin: 0,
      // }
    },
  },
};
