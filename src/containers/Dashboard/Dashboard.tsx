import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Select, { ValueType } from "react-select";

import "./Dashboard.scss";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      borderColor: "blue",
      pointRadius: 1,
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      borderColor: "rgba(75,192,192,1)",
      pointRadius: 1,
      data: [60, 50, 80, 70, 50, 50, 40]
    }
  ]
};

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const Dashboard: React.FC = () => {
  const [datasource, setDatasource] = useState<ValueType<Option>>([]);
  const [campain, setCampain] = useState<ValueType<Option>>([]);

  const handleDataSourceChange = (selection: ValueType<Option>) => {
    setDatasource(selection);
  };

  const handleCampainChange = (selection: ValueType<Option>) => {
    setCampain(selection);
  };

  return (
    <div className="dashboard">
      <div className="dashboard__filters">
        <div>Filter dimenstions values</div>
        <div>
          <div>Datasource</div>
          <div>
            <Select
              isMulti={true}
              value={datasource}
              onChange={handleDataSourceChange}
              options={options}
            />
          </div>
        </div>
        <div>
          <div>Campain</div>
          <div>
            <Select
              isMulti={true}
              value={campain}
              onChange={handleCampainChange}
              options={options}
            />
          </div>
        </div>
      </div>
      <div className="dashboard__chart">
        <div>
          <Line data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
