import * as http from "../../common/http";
import countDuplicate from "./utils/countDuplicate";

interface fields {
  stop_coordinates: number[];
  stop_desc: string;
  stop_name: string;
  stop_id: string;
}

export interface Record {
  fields: fields;
  datasetid: string;
  recordid: string;
  "geometry.type": string;
  "geometry.coordinates": number[];
  record_timestamp: string;
}

interface Parameters {
  dataset: string;
  timezone: string;
  q: string;
  rows: number;
  start: number;
  sort: string[];
  format: string;
}

interface DataRatp {
  nhits: number;
  parameters: Parameters;
  records: Record[];
}

export interface Params {
  q: string;
  sort?: string;
  rows?: string;
  start?: string;
}

export const search = async (filters: Params) => {
  try {
    const { q, sort, rows, start } = filters;

    const data = await http.get<DataRatp, Params>(
      "?dataset=positions-geographiques-des-stations-du-reseau-ratp",
      { q, sort, rows, start }
    );

    const result =
      data.records?.map((record) => {
        const numberOfDuplicates = countDuplicate(record, data.records);

        return {
          recordid: record.recordid,
          coordinates: record.fields.stop_coordinates,
          description: record.fields.stop_desc,
          name: record.fields.stop_name,
          ...(numberOfDuplicates > 1 && { numberOfDuplicates }),
        };
      }) || [];

    return {
      data: result,
      rows: data.parameters.rows,
      start: data.parameters.start,
    };
  } catch (error) {
    console.log("error: ", error);
  }
};
