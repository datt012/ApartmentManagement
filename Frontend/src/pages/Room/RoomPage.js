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
import { ToastContainer, toast } from 'react-toastify';

const RoomPage = () => {

  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openPopup, setOpenPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [data, setData] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();

  const handleEdit = (maCanHo) => {
    roomService.getRoom(maCanHo).then((result) => {
      setCurrentRoom(result.data);
      setOpenEditPopup(true);
    }).catch(e => {
      console.log(e);
    })
  }
  const handleDeleteRoom = (maCanHo) => {
    if (window.confirm('Bạn chắc chắn muốn xóa?')) {
      roomService.getRoom(maCanHo).then((result) => {
        let currentRoomTmp = result.data;
        roomService.deleteRoom(maCanHo, currentRoomTmp.version).then((result) => {
          handleGetListRoom();
          toast(result.message);
        }).catch(e => {
          console.log(e);
          toast(e?.response?.data?.message);
        })
      }).catch(e => {
        console.log(e);
      })
    }
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
      field: "maCanHo",
      headerName: "Mã phòng",
      flex: 0.5,
    },
    {
      field: "tenCanHo",
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
        return <div onClick={() => handleEdit(param.row.maCanHo)}><EditIcon /> </div>
      }
    },
    {
      field: "delete",
      headerName: "",
      flex: 0.25,
      align: "center",
      renderCell: (param) =>
        <div>
          <DeleteIcon onClick={() => handleDeleteRoom(param.row.maCanHo)} />
        </div>
    }
  ]);
  console.log('data', data);
  return (
    <Box m="20px">
      <Header
        title="Quản lý căn hộ"
      />
      <Button onClick={() => {
        setOpenPopup(!openPopup);
      }}
        color="info" variant="contained" style={{ fontWeight: "bold" }}>
        Thêm căn hộ</Button>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel": {
            "margin-top": "1em",
            "margin-bottom": "1em"
          }
        }}
      >
        <RegisterRoom openPopup={openPopup} setOpenPopup={setOpenPopup} onSuccess={() => handleGetListRoom()} />
        {openEditPopup && <EditRoom onClose={() => setOpenEditPopup(false)} roomData={currentRoom} onSuccess={() => handleGetListRoom()} />}
        <DataGrid
          getRowId={(r) => r.maCanHo}
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default RoomPage;