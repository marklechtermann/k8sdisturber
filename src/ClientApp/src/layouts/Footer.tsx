import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

// import { mainListItems, secondaryListItems } from "./listItems";
// import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";
export function Footer(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ pt: 6 }}
    >
      {"GitHub: "}
      <Link
        color="inherit"
        href="https://github.com/marklechtermann/k8sdisturber"
      >
        K8sDisturber
      </Link>
    </Typography>
  );
}
