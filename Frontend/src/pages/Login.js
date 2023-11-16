import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/authSlice";
import { useHistory } from "react-router-dom";
import logo from '../assets/logo.jpg';

export default function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {loginType} = useSelector((state) => state.auth)
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(login({ userName: data.get("username"), password: data.get("password")})).then(() => {
      history.push("/");
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={logo} style={{width: 200, height: 200}}/>
        {/* <Typography component="h1" variant="h5">
          ĐĂNG NHẬP
        </Typography> */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            inputProps={{ minLength: 6 }}
            sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" } }}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            inputProps={{ minLength: 6, maxLength: 20 }}
            sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" } }}
            autoComplete="current-password"
          />
          <div style={{display: 'flex', justifyContent: 'flex-end', color: 'red'}}>{loginType == false ? 'Tài khoản hoặc mật khẩu không đúng' : ''}</div>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </Container>
  );
}