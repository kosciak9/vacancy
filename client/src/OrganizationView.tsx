import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const OVERVIEW = gql`
  query overview($date: String!) {
    overview(startDate: $date) {
      from
      to
      available
      uncertain
      user {
        id
        name
      }
    }
  }
`;

const OrganizationView: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const { data, loading, error } = useQuery(OVERVIEW, {
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
