import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Select, { ValueType } from "react-select";
import { getData, getLabels } from "../../services/dataService";
import chartConfig from './chartConfig';

import "./Dashboard.scss";

interface Option {
  value: string;
  label: string;
}

const Dashboard: React.FC = () => {
  const {chartData, chartOptions} = chartConfig

  const [allDatasource, setAllDatasource] = useState<Option[]>([]);
  const [allCampain, setAllCampain] = useState<Option[]>([]);
  const [filterDatasource, setFilterDatasource] = useState<ValueType<Option>>(
    []
  );
  const [filterCampain, setFilterCampain] = useState<ValueType<Option>>([]);
  const [datasource, setDatasource] = useState<ValueType<Option>>([]);
  const [campain, setCampain] = useState<ValueType<Option>>([]);
  // state for chart
  const [data, setData] = useState<any[]>([]);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const labels = getLabels();
    setAllDatasource(labels.datasource.map(v => ({ value: v, label: v })));
    setAllCampain(labels.campain.map(v => ({ value: v, label: v })));
  }, []);

  useEffect(() => {
    if (filterDatasource && filterCampain) {
      setData(
        getData(
          (filterDatasource as Option[]).map(o => o.value),
          (filterCampain as Option[]).map(o => o.value)
        )
      );
    }
  }, [filterDatasource, filterCampain]);

  const handleDataSourceChange = (selection: ValueType<Option>) => {
    setIsDirty(true)
    setDatasource(selection || []);
  };

  const handleCampainChange = (selection: ValueType<Option>) => {
    setIsDirty(true)
    setCampain(selection || []);
  };

  const handleApply = () => {
    setIsDirty(false);
    setFilterDatasource(datasource);
    setFilterCampain(campain);
  };

  const clicksData = data.map((val: any) => val.clicks);
  const impressionsData = data.map((val: any) => val.impressions);
  const labels = data.map((val: any) => val.date);

  chartData.labels = labels;
  chartData.datasets[0].data = clicksData;
  chartData.datasets[1].data = impressionsData;

  return (
    <div className="dashboard">
      <div className="dashboard__filters">
        <h3>Filter dimenstions values</h3>
        <div>
          <div>Datasource</div>
          <div>
            <Select
              isMulti={true}
              value={datasource}
              onChange={handleDataSourceChange}
              options={allDatasource}
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
              options={allCampain}
            />
          </div>
        </div>
        <div className="dashboard__apply">
          <button onClick={handleApply} disabled={!isDirty}>Apply</button>
        </div>
      </div>
      <div className="dashboard__chart">
        <div>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
