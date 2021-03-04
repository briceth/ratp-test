import { Record } from "../process";

export default (record: Record, records: Record[]) => {
  let count = 0;

  records.forEach((element) => {
    if (
      element.fields.stop_desc === record.fields.stop_desc ||
      element.fields.stop_name === record.fields.stop_name ||
      (element.fields.stop_coordinates[0] ===
        record.fields.stop_coordinates[0] &&
        element.fields.stop_coordinates[1] ===
          record.fields.stop_coordinates[1])
    ) {
      count++;
    }
  });

  return count;
};
