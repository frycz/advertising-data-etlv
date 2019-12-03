import React from "react";
import { Line } from "react-chartjs-2";
import config from "./config";

import "./Chart.scss";

export interface Props {
  clicks: number[];
  impressions: number[];
  labels: string[];
}

const Chart: React.FC<Props> = ({ clicks, impressions, labels }) => {
  const { sets, options } = config;
  const [clicksSet, impressionsSet] = sets.datasets;

  const data = {
    ...sets,
    labels,
    datasets: [
      { ...clicksSet, data: clicks },
      { ...impressionsSet, data: impressions }
    ]
  };

  return (
    <div className="chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
