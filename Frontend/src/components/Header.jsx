import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Button from '@mui/material/Button';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Link } from 'react-router-dom';

const Header = ({ title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{ m: "0 0 2px 0" }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
