import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import Button from '@mui/material/Button';
import { fetchAllDemographic } from "../../Redux/demographicSlice";
import demographicService from "../../Services/API/demographicService";
import RegisterRoom from "./RegisterRoom";
import EditDemographic from "./EditRoom";
import roomService from "../../Services/API/roomService";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditRoom from "./EditRoom";

const RoomPage = () => {

  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openPopup, setOpenPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [data, setData] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();

  const handleEdit = (maPhong) => {
    roomService.getRoom(maPhong).then((result) => {
      setCurrentRoom(result.data);
      setOpenEditPopup(true);
    }).catch(e => {
      console.log(e);
    })
  }
  const handleGetListRoom = () => {
    roomService.getListRoom().then((result) => {
      setData(result.data);
    }).catch(e => {
      console.log(e);
    })
  }
  useEffect(() => {
    handleGetListRoom();
  }, []);

  const columns = useMemo(() => [
    {
      field: "maPhong",
      headerName: "Mã phòng",
      flex: 0.5,
    },
    {
      field: "tenPhong",
      headerName: "Tên phòng",
      flex: 0.75,
    },
    {
      field: "tang",
      headerName: "Tầng",
      flex: 0.75,
    },
    {
      field: "dienTich",
      headerName: "Diện tích",
      flex: 0.5
    },
    {
      field: "maHoKhau",
      headerName: "Mã hộ khẩu",
      flex: 0.5
    },
    {
      field: "moTa",
      headerName: "Mô tả",
      flex: 0.5,
    },
    {
      field: "put",
      headerName: "",
      flex: 0.25,
      align: "center",
      renderCell: (param) => {
        // const link = param.row.maHoKhau + "/edit";
        return <div onClick={() => handleEdit(param.row.maPhong)}><EditIcon /> </div>
      }
    },
    {
      field: "delete",
      headerName: "",
      flex: 0.25,
      align: "center",
      renderCell: (param) =>
        <div>
          <DeleteIcon onClick={() => { }} />
        </div>
    }
  ]);
  console.log('data', data);
  return (
    <Box m="20px">
      <Header
        title="Quản lý Phòng"
      />
      <Button onClick={() => {
        setOpenPopup(!openPopup);
      }}
        color="secondary" variant="contained" style={{ fontWeight: "bold" }}>
        Thêm phòng</Button>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <RegisterRoom openPopup={openPopup} setOpenPopup={setOpenPopup} onSuccess={() => handleGetListRoom()} />
        {openEditPopup && <EditRoom onClose={() => setOpenEditPopup(false)} roomData={currentRoom} onSuccess={() => handleGetListRoom()}/>}

        <DataGrid
          getRowId={(r) => r.maPhong}
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default RoomPage;