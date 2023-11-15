import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../Redux/userSlice";
import "../styles/DashBoard.css";
import _ from "lodash";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { loadUser } from "../Redux/authSlice";
import { useHistory } from 'react-router-dom';

const DashBoard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const userData = useRef({});
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return (
    <div style={{
      margin: 'auto',
      width: '70%',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto' }}>
        {(user?.roleId === 1 || user?.roleId == 2) &&
          <>
            <Card onClick={() => history.push('/household')}
              sx={{ width: 300, backgroundColor: 'white', margin: '10px' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100"
                  image={require('../assets/quan-ly-ho-khau.jpg')}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" color="black">
                    Quản lý hộ khẩu
                  </Typography>
                  <Typography variant="body2" color="black">
                    Quản lý hộ khẩu và các khoản thu theo hộ
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card onClick={() => history.push('/demographic')}
              sx={{ width: 300, backgroundColor: 'white', margin: '10px' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100"
                  image={require('../assets/quan-ly-nhan-khau.png')}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" color="black">
                    Quản lý nhân khẩu
                  </Typography>
                  <Typography variant="body2" color="black">
                    Quản lý nhân khẩu, đăng ký thường trú, khai sinh, khai tử
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card onClick={() => history.push('/tabernacle')}
              sx={{ width: 300, backgroundColor: 'white', margin: '10px' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100"
                  image={require('../assets/quan-ly-tam-tru.jpg')}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" color="black">
                    Quản lý tạm trú
                  </Typography>
                  <Typography variant="body2" color="black">
                    Quản lý tạm trú, đăng ký tạm trú
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card onClick={() => history.push('/absent')}
              sx={{ width: 300, backgroundColor: 'white', margin: '10px' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100"
                  image={require('../assets/quan-ly-tam-vang.jpg')}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" color="black">
                    Quản lý tạm vắng
                  </Typography>
                  <Typography variant="body2" color="black">
                    Quản lý tạm vắng, đăng ký tạm vắng
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </>
        }
        <Card onClick={() => history.push('/revenue')}
          sx={{ width: 300, backgroundColor: 'white', margin: '10px' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="100"
              image={require('../assets/happy-valentine.png')}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color="black">
                Quản lý khoản thu
              </Typography>
              <Typography variant="body2" color="black">
                Quản lý thu phí vệ sinh, các khoản đóng góp
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card onClick={() => history.push('/revenue')}
          sx={{ width: 300, backgroundColor: 'white', margin: '10px' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="100"
              image={require('../assets/quan-ly-can-ho.jpg')}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color="black">
                Quản lý căn hộ
              </Typography>
              <Typography variant="body2" color="black">
                Quản lý các căn hộ trong chung cư
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};
export default DashBoard;
