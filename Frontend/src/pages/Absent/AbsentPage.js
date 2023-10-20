import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import Button from '@mui/material/Button';
import { fetchAllAbsents } from "../../Redux/absentSlice";
import { useEffect, useMemo, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import EditAbsent from "./EditAbsent";
import RegisterAbsent from "./RegisterAbsent";
import absentService from "../../Services/API/absentService";
import dayjs from "dayjs";

const AbsentPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [openInPopup, setOpenInPopup] = useState(false);
  const { absentList, isLoading } = useSelector((state) => state.absent);
  const [data, setData] = useState([]);
  const EditButton = ({ maTamVang, openInPopup, setOpenInPopup }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    return (
        <Button onClick={() => {
            absentService.getAbsent(maTamVang).then(mes => {
                setData(mes.data);
                setOpenInPopup(!openInPopup);
            })
        }}
          startIcon={<ManageAccountsRoundedIcon />}
          variant="contained"
          style={{ backgroundColor: colors.greenAccent[700], border: "none" }}>Chi tiết
        </Button>
    );
  }
  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchAllAbsents());
    }

  }, []);
  
  const columns = useMemo(() => [
    { field: "maTamVang", headerName: "Mã tạm vắng", flex: 0.5 },
    {
      field: "hoTen",
      headerName: "Họ và tên",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lyDo",
      headerName: "Lý do",
      flex: 1,
    },
    {
      field: "canCuocCongDan",
      headerName: "Căn cước công dân",
      flex: 1,
    },
    {
        field: "thoiHan",
        headerName: "Thời điểm bắt đầu",
        flex: 1,
        valueGetter: (param) => {return dayjs(param.row.thoiHan).format('DD/MM/YYYY')},
      },
    {
      field: "chiTiet",
      headerName: "",
      flex: 1,
      renderCell: (param) => <EditButton maTamVang={param.row.maTamVang} openInPopup={openInPopup} setOpenInPopup={setOpenInPopup}/>,
    }
  ]);
  return (
    <Box m="20px">
      <Header
        title="DANH SÁCH TẠM VẮNG"
      />
      <Button onClick={()=>{
        setOpenPopup(!openPopup);}}
        color="secondary" variant="contained" style={{ fontWeight: "bold" }}>
        Đăng ký tạm vắng</Button>
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
          "& .MuiTablePagination-root": {
            color: `${colors.grey[100]} !important`,
          },
          "& .MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel": {
            "margin-top": "1em",
            "margin-bottom": "1em"
          }

        }}
      >
        <RegisterAbsent openPopup={openPopup} setOpenPopup={setOpenPopup}>
        </RegisterAbsent>
        <EditAbsent openInPopup={openInPopup} setOpenInPopup={setOpenInPopup} data={data}>
        </EditAbsent>
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
            getRowId={(r) => r.maTamVang}
            rows={absentList}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
};
export default AbsentPage;