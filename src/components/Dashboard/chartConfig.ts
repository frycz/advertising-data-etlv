export default {
  chartData: {
    labels: [] as string[],
    datasets: [
      {
        label: "Clicks",
        yAxisID: "clicks",
        fill: false,
        lineTension: 0.1,
        borderColor: "#4285f4",
        pointRadius: 1,
        data: [] as number[],
      },
      {
        label: "Impressions",
        yAxisID: "impressions",
        fill: false,
        lineTension: 0.1,
        borderColor: "#fbbc04",
        pointRadius: 1,
        data: [] as number[],
      }
    ]
  },
  chartOptions: {
    scales: {
      yAxes: [
        {
          id: "clicks",
          type: "linear",
          position: "left"
        },
        {
          id: "impressions",
          type: "linear",
          position: "right"
        }
      ],
    }
  }
};
