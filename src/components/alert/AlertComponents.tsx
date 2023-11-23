import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

interface Children {
  children: JSX.Element | JSX.Element[];
}

export default function AlertsComponents({ children }: Children) {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">{children}</Alert>
    </Stack>
  );
}
