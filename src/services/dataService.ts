import _ from "lodash";
import source from "./source.json";

const data = source as any[];

export const getLabels = () => {
  const datasource = new Set<string>();
  const campain = new Set<string>();

  data.forEach(row => {
    datasource.add(row.Datasource);
    campain.add(row.Campaign);
  });

  return { datasource: Array.from(datasource), campain: Array.from(campain) };
};

export const getData = (datasource: any[], campain: any[]) => {
  return _.chain(data)
    .filter(
      row =>
        (!datasource.length || datasource.includes(row.Datasource)) &&
        (!campain.length || campain.includes(row.Campaign))
    )
    .groupBy("Date")
    .map((value, key) =>
      _.reduce(
        value,
        (acc, day) => {
          acc.clicks += +day.Clicks;
          acc.impressions += +day.Impressions;
          return acc;
        },
        { clicks: 0, impressions: 0, date: key }
      )
    )
    .value();
};

export default {
  getData,
  getLabels
};
