import { Box} from "@mui/material";
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { logout } from "../Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useHistory } from "react-router-dom";
const Topbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const history = useHistory();
  return (
    <div style={{position: 'absolute', top: 10, right: 10}}>
      <Box display="flex">
      {user && isAuthenticated === true ? // user && isAuthenticated
      (
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {<AccountCircleIcon/>}
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item href="/change-password">Đổi mật khẩu</Dropdown.Item>
          <Dropdown.Item>
          <span onClick={() => {
            // history.push('/')
            dispatch(logout());
          }}>Đăng xuất</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      ): (
        <Link to="/login" className="nav-link">Login
        </Link>
      )}
      </Box>
    </div>
  );
};

export default Topbar;
