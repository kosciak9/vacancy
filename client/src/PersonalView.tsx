import React, { useState } from "react";

import { useMappedQuery } from "generated/graphql";
import PersonalDayContainer from "PersonalDayContainer";

const PersonalView: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const { data, loading } = useMappedQuery({
    variables: { date: date.toISOString() }
  });
  return loading ? (
    <p>loading</p>
  ) : (
    <>
      {data && data.mapped
        ? data.mapped.map(availability => (
            <PersonalDayContainer
              key={availability.id}
              availability={availability}
            />
          ))
        : null}
      <button onClick={() => setDate(new Date())}>Update date</button>
    </>
  );
};

export default PersonalView;
