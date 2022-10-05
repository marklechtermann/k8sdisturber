import { Typography } from "@mui/material";

interface Props {
  children: JSX.Element | string;
  color?: string;
}

const Title: React.FC<Props> = ({ children, color }) => {
  return (
    <Typography
      component="h2"
      variant="h6"
      color={color ? color : `primary`}
      gutterBottom
    >
      {children}
    </Typography>
  );
};

export default Title;
