import React, { useState } from "react";
import { useOverviewQuery } from "generated/graphql";

const OrganizationView: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const { data, loading, error } = useOverviewQuery({
    variables: { date: date.toISOString() }
  });
  return loading ? (
    <p>loading</p>
  ) : (
    <>
      <pre>{error ? JSON.stringify(error) : JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => setDate(new Date())}>Update date</button>
    </>
  );
};

export default OrganizationView;
