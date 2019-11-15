/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Template } from "generated/graphql";
import theme from "theme";
import { format, setDay } from "date-fns";

type TemplateDayContainerProps = {
  weekday: string;
  templates: Array<Partial<Template>>;
};
const TemplateDayContainer = ({
  weekday,
  templates
}: TemplateDayContainerProps) => {
  return (
    <div css={{ width: 200, backgroundColor: theme.palette.backdrop }}>
      <h2>{format(setDay(new Date(), Number(weekday)), "EEEE")}</h2>
      {templates.map(t => (
        <div>
          {t.fromHours}:{t.fromMinutes === 0 ? "00" : t.fromMinutes} -{" "}
          {t.toHours}:{t.toMinutes === 0 ? "00" : t.toMinutes}
        </div>
      ))}
    </div>
  );
};

export default TemplateDayContainer;
