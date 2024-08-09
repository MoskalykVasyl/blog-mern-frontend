import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: [
    ...createTheme().shadows,
    '0px 1px 3px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)', // кастомізоване значення для elevation 1
  ],
});
