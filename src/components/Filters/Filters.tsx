import React, { useState } from "react";
import Select, { ValueType } from "react-select";

import "./Filters.scss";

export interface Option {
  value: string;
  label: string;
}

export interface Props {
  initDatasource: string[];
  initCampain: string[];
  onApply: (datasource: string[], campain: string[]) => void;
}

const Filters: React.FC<Props> = ({ initDatasource, initCampain, onApply }) => {
  const [datasource, setDatasource] = useState<ValueType<Option>>([]);
  const [campain, setCampain] = useState<ValueType<Option>>([]);
  const [isDirty, setIsDirty] = useState(false);

  const handleDataSourceChange = (selection: ValueType<Option>) => {
    setIsDirty(true);
    setDatasource(selection || []);
  };

  const handleCampainChange = (selection: ValueType<Option>) => {
    setIsDirty(true);
    setCampain(selection || []);
  };

  const handleApply = () => {
    setIsDirty(false);
    onApply(
      (datasource as Option[]).map(o => o.value),
      (campain as Option[]).map(o => o.value)
    );
  };

  const datasourceOptions = initDatasource.map(o => ({ value: o, label: o }));
  const campainOptions = initCampain.map(o => ({ value: o, label: o }));

  return (
    <div className="filters">
      <h3>Filter dimenstions values</h3>
      <div>
        <div>Datasource</div>
        <div>
          <Select
            isMulti={true}
            placeholder={"All datasources"}
            value={datasource}
            onChange={handleDataSourceChange}
            options={datasourceOptions}
          />
        </div>
      </div>
      <div>
        <div>Campain</div>
        <div>
          <Select
            isMulti={true}
            placeholder={"All campains"}
            value={campain}
            onChange={handleCampainChange}
            options={campainOptions}
          />
        </div>
      </div>
      <div className="dashboard__apply">
        <button onClick={handleApply} disabled={!isDirty}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filters;
