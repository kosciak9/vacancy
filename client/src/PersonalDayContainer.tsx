import React from "react";
import { Availability } from "generated/graphql";
import { format } from "date-fns";

type PersonalDayContainerProps = {
  date: string;
  availabilities: Array<Partial<Availability>>;
};
const PersonalDayContainer = ({
  date,
  availabilities
}: PersonalDayContainerProps) => {
  return (
    <div style={{ width: "200px" }}>
      <h2>{format(new Date(date), "EEE, dd.MM")}</h2>
      {availabilities.map(availability => (
        <div key={availability.id}>
          <div>
            <div>{new Date(availability.from || "test").toString()}</div>
            <div>{new Date(availability.to || "test").toString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonalDayContainer;
