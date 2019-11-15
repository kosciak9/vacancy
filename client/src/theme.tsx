const SPACING_AMOUNT = 4;

const theme = {
  palette: {
    primary: "#961FA8",
    success: "#76A81F",
    warning: "#F9AB00",
    invalid: "#E2683C",
    backdrop: "#efefef"
  },
  spacing: (amount: number) => amount * SPACING_AMOUNT
};

export default theme;
