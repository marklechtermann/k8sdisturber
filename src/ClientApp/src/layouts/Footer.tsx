import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export function Footer(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
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
