import _ from "lodash";
import raw from "./source.json";

export interface Source {
  Date: string;
  Datasource: string;
  Campaign: string;
  Clicks: number;
  Impressions: number;
}

export interface Labels {
  datasource: string[];
  campain: string[];
}

export interface Data {
  clicks: number;
  impressions: number;
  date: string;
}

const source: Source[] = raw as Source[];

const getDataFilter = (datasource: string[], campain: string[]) => (
  row: Source
): boolean =>
  (!datasource.length || datasource.includes(row.Datasource)) &&
  (!campain.length || campain.includes(row.Campaign));

const sumDailyData = (sourceByDay: Source[], date: string) =>
  _.reduce(
    sourceByDay,
    (result, day) => {
      result.clicks += +day.Clicks;
      result.impressions += +day.Impressions;
      return result;
    },
    { clicks: 0, impressions: 0, date }
  );

export const getLabels = (): Labels => {
  const datasource = new Set<string>();
  const campain = new Set<string>();

  source.forEach(row => {
    datasource.add(row.Datasource);
    campain.add(row.Campaign);
  });

  return { datasource: Array.from(datasource), campain: Array.from(campain) };
};

export const getData = (datasource: string[], campain: string[]): Data[] => {
  return _.chain(source)
    .filter(getDataFilter(datasource, campain))
    .groupBy("Date")
    .map(sumDailyData)
    .value();
};

export default {
  getData,
  getLabels
};
