import React from "react";

import { groupBy, toPairs } from "lodash";
import { useTemplatesQuery } from "generated/graphql";
import TemplateDayContainer from "TemplateDayContainer";

const TemplateView = () => {
  const { data = { templates: [] }, loading } = useTemplatesQuery({});

  const grouped = toPairs(groupBy(data.templates, "weekday"));

  return loading ? (
    <p>loading</p>
  ) : (
    <>
      <span>{data.templates && data.templates.length}</span>
      {grouped.map(([weekday, templates]) => (
        <TemplateDayContainer weekday={weekday} templates={templates} />
      ))}
    </>
  );
};

export default TemplateView;
