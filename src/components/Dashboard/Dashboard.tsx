import React, { useState, useEffect } from "react";
import { getData, getLabels, Data } from "../../services/dataService";
import Filters from "../Filters";
import Chart from "../Chart";

import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  const [datasourceOptions, setDatasourceOptions] = useState<string[]>([]);
  const [campainOptions, setCampainOptions] = useState<string[]>([]);

  const [datasource, setDatasource] = useState<string[]>([]);
  const [campain, setCampain] = useState<string[]>([]);

  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const labels = getLabels();
    setDatasourceOptions(labels.datasource);
    setCampainOptions(labels.campain);
  }, []);

  useEffect(() => {
    setData(getData(datasource, campain));
  }, [datasource, campain]);

  const handleApply = (datasource: string[], campain: string[]) => {
    setDatasource(datasource);
    setCampain(campain);
  };

  const clicks = data.map(o => o.clicks);
  const impressions = data.map(o => o.impressions);
  const labels = data.map(o => o.date);

  return (
    <div className="dashboard">
      <div className="dashboard__filters">
        <Filters
          initDatasource={datasourceOptions}
          initCampain={campainOptions}
          onApply={handleApply}
        />
      </div>
      <div className="dashboard__chart">
        <Chart clicks={clicks} impressions={impressions} labels={labels} />
      </div>
    </div>
  );
};

export default Dashboard;
