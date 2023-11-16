import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataHousehold } from "../../Services/MOCK/householddata";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, Redirect } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import detailroomSlice from "../../Redux/detailRoomSlice";
import { isDetailVisibleSelector, isSelectedIdSelector } from "../../Redux/selector";
import axios from "../../setups/custom_axios";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import { fetchAllRevenueHouse } from "../../Redux/revenueSlice";
import { useHistory } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import householdService from "../../Services/API/householdService";
import { toast } from "react-toastify";

const HouseholdPage = () => {

  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const history = useHistory();
  const handleDetail = () => {
    dispatch(detailroomSlice.actions.isDetailVisibleChange())
  }
  const handleSelectedId = (Id) => {
    dispatch(detailroomSlice.actions.isSelectedIdChange(Id));
  }
  const handleDelete = (maHoKhau) => {
    if (window.confirm('Bạn chắc chắn muốn xóa?')) {
      householdService.deleteHouseHold(maHoKhau).then((result) => {
        toast(result.message);
        getListHoKhau();
      }).catch(e => {
        toast(e?.response?.data?.message ?? "Có lỗi xảy ra");
      })
    }
  }
  const [dataHouseHold, setDataHouseHold] = useState([]);
  const getListHoKhau = async () => {
    try {
      const response = await axios.get(`/ho-khau/danh-sach-ho-khau`);
      setDataHouseHold(() => response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getListHoKhau()
  }, [])

  const ListButton = ({ maHoKhau }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
      <Link to={"/revenue-house"}>
        <Button onClick={() => {
          dispatch(fetchAllRevenueHouse(maHoKhau));
        }}
          startIcon={<ManageAccountsRoundedIcon />}
          variant="contained"
          color="info"
          style={{ }}>Khoản thu
        </Button>
      </Link>
    );
  }

  const columns = useMemo(() => [
    {
      field: "maHoKhau",
      headerName: "Mã hộ",
      flex: 0.5
    },
    {
      field: "soThanhVien",
      headerName: "Số thành viên",
      flex: 0.5,
    },
    {
      field: "diaChiThuongTru",
      headerName: "Địa chỉ thường chú",
      flex: 1,
    },
    {
      field: "noiCap",
      headerName: "Nơi cấp",
      flex: 1,
      type: 'number',
      headerAlign: "left",
      align: "left",
    },
    {
      field: "ngayCap",
      headerName: "Ngày cấp",
      flex: 0.5,
      type: 'date',
      valueGetter: (param) => { return dayjs(param.row.ngayCap).format('DD/MM/YYYY') },
    },
    {
      field: "put",
      headerName: "",
      flex: 0.25,
      align: "center",
      renderCell: (param) => {
        const link = param.row.maHoKhau + "/edit";
        return <div onClick={() => {
          history.push(link);
        }}><EditIcon /></div>
      }
    },
    {
      field: "delete",
      headerName: "",
      flex: 0.25,
      align: "center",
      renderCell: (param) =>
        <div>
          <DeleteIcon onClick={() => handleDelete(param.row.maHoKhau)
          } />
        </div>
    },
    /// 
    // {
    //   field: "details",
    //   headerName: "",
    //   flex: 0.25,
    //   align: "center",
    //   renderCell: (param) =>
    //     <div>
    //       <VisibilityIcon onClick={() => {
    //         handleSelectedId(param.row.maHoKhau);
    //         handleDetail();
    //       }} />
    //     </div>
    // },
    {
      field: "khoanThu",
      headerName: "",
      flex: 0.6,
      renderCell: (param) => <ListButton maHoKhau={param.row.maHoKhau}></ListButton>,
    }
  ]);

  return (
    <Box m="20px">
      <Header
        title="Quản lý hộ khẩu"
      />
      <Button onClick={() => history.push('/household-add')}
        color="info" variant="contained" style={{ fontWeight: "bold" }}>
        Đăng ký hộ khẩu
      </Button>
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
        <DataGrid
          getRowId={(row) => row.maHoKhau}
          // response.data
          rows={dataHouseHold}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default HouseholdPage;