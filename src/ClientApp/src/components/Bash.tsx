import { Box, Paper } from "@mui/material";

type Props = {
  children: JSX.Element | JSX.Element[] | string;
};

const Bash: React.FC<Props> = ({ children }) => {
  return (
    <Paper elevation={3}>
      <Box padding="1rem">
        <code>{children}</code>
      </Box>
    </Paper>
  );
};

export default Bash;
