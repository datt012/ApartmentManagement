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
import RegisterDemographic from "./RegisterDemographic";
import EditDemographic from "./EditDemographic";

const DemographicPage = () => {

  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openPopup, setOpenPopup] = useState(false);
  const [openInPopup, setOpenInPopup] = useState(false);
  const { demographicList, isLoading } = useSelector((state) => state.demographic);
  const [data, setData] = useState([]);

  const EditButton = ({ maNhanKhau, openInPopup, setOpenInPopup }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
      <Button onClick={() => {
        demographicService.getDemographic(maNhanKhau).then(mes => {
          setData(mes.data);
          setOpenInPopup(!openInPopup);
        });
      }}
        startIcon={<ManageAccountsRoundedIcon />}
        variant="contained"
        style={{ backgroundColor: colors.greenAccent[700], border: "none" }}>Chi tiết
      </Button>
    );
  }

  useEffect(() => {
    /*dispatch(resetTabernacleSlice());*/
    if (!isLoading) {
      dispatch(fetchAllDemographic());
    }

  }, []);
  useEffect(() => {
  }, [demographicList, isLoading]);

  const columns = useMemo(() => [
    {
      field: "maNhanKhau",
      headerName: "Mã nhân khẩu",
      flex: 0.5,
    },
    {
      field: "hoTen",
      headerName: "Họ tên",
      flex: 0.75,
    },
    {
      field: "canCuocCongDan",
      headerName: "Căn cước công dân",
      type: 'string',
      flex: 0.75,
    },
    {
      field: "ngaySinh",
      headerName: "Ngày Sinh",
      flex: 0.5,
      valueGetter: (param) => { return dayjs(param.row.ngaySinh).format('DD/MM/YYYY') },
    },
    {
      field: "danToc",
      headerName: "Dân tộc",
      flex: 0.5,
    },
    {
      field: "trangThai",
      headerName: "Trạng Thái",
      flex: 0.5,
      valueGetter: (param) => { return ((param.row.trangThai == 1) ? "Còn sống" : "Đã chết") },
    },
    {
      field: "chiTiet",
      headerName: "",
      flex: 1,
      renderCell: (param) => <EditButton maNhanKhau={param.row.maNhanKhau} openInPopup={openInPopup} setOpenInPopup={setOpenInPopup}/>,
    }

  ]);

  return (
    <Box m="20px">
      <Header
        title="Quản lý Nhân khẩu"
      />
      <Button onClick={()=>{
        setOpenPopup(!openPopup);}}
        color="secondary" variant="contained" style={{ fontWeight: "bold" }}>
        Đăng ký nhân khẩu</Button>
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
        <RegisterDemographic openPopup={openPopup} setOpenPopup={setOpenPopup}/>
        <EditDemographic openInPopup={openInPopup} setOpenInPopup={setOpenInPopup} data={data}/>

        {isLoading ? (
          <div className="loading-container d-flex flex-column align-items-center ustify-content-center">
            <Triangle
              height="100"
              width="100"
              color="#1877f2"
              ariaLabel="loading"
            />
            <div>Loading data...</div>
          </div>
        ) : (
          <DataGrid
            getRowId={(r) => r.maNhanKhau}
            rows={demographicList}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
};

export default DemographicPage;