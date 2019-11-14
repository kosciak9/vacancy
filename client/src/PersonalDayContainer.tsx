import React from "react";
/* import { Availability, MappedQueryHookResult } from "generated/graphql"; */

type PersonalDayContainerProps = { availability: any };
const PersonalDayContainer = ({ availability }: PersonalDayContainerProps) => {
  return availability ? (
    <div>
      <div>
        <div>{new Date(availability.from).toString()}</div>
        <div>{new Date(availability.to).toString()}</div>
      </div>
    </div>
  ) : null;
};

export default PersonalDayContainer;
