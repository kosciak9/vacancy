import React, { useState } from "react";

import { format } from "date-fns";
import { sortBy, toPairs, groupBy } from "lodash";
import { useMappedQuery } from "generated/graphql";
import PersonalDayContainer from "PersonalDayContainer";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const PersonalView: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const { data = { mapped: [] }, loading } = useMappedQuery({
    variables: { date: date.toISOString() }
  });

  const grouped = sortBy(
    toPairs(groupBy(data.mapped, o => format(new Date(o.from), "yyyy-MM-dd"))),
    [
      function([date]) {
        return new Date(date).toISOString();
      }
    ]
  );
  return loading ? (
    <p>loading</p>
  ) : (
    <>
      <DatePicker
        onChange={(date: Date) => setDate(date)}
        value={date.toString()}
      />
      {grouped.map(([date, availabilities]) => (
        <PersonalDayContainer
          date={date}
          key={date}
          availabilities={availabilities}
        />
      ))}
    </>
  );
};

export default PersonalView;
