import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import SearchIcon from '@mui/icons-material/Search';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Button from '@mui/material/Button';
import { useEffect, useMemo, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllRevenue, setRevenueItemID, setRevenueHouseID, setRevenueItemType } from "../../Redux/revenueSlice";
import dayjs from "dayjs";
import CreateRevenue from "./CreateRevenue";
import EditRevenue from "./EditRevenue";
import revenueService from "../../Services/API/revenueService";
import { Link } from "react-router-dom";
import PayRevenue from "./PayRevenue";
import { useHistory } from "react-router-dom";
const RevenueHouse = () => {
    const theme = useTheme();
    const history = useHistory();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const [openPopup, setOpenPopup] = useState(false);
    const maKhoanThu = useSelector((state) => state.revenue.maKhoanThu);
    const revenueHouse = useSelector((state) => state.revenue.revenueHouse);
    const revenueHouseID = useSelector((state) => state.revenue.revenueHouseID);
    const isLoadingHouse = useSelector((state) => state.revenue.isLoadingHouse);
    const [soTienCanThu, setSoTienCanThu] = useState(0);
    const [data, setData] = useState([]);
    const [maHoKhau, setMaHoKhau] = useState();

    const PayButton = ({ maKhoanThuTheoHo, openPopup, setOpenPopup, maKhoanThu, soTienCanThu, loaiKhoanThu, maHoKhau }) => {
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        return (
            <Button onClick={() => {
                dispatch(setRevenueItemID(maKhoanThu));
                dispatch(setRevenueHouseID(maKhoanThuTheoHo));
                dispatch(setRevenueItemType(loaiKhoanThu));
                setMaHoKhau(maHoKhau);
                setSoTienCanThu(soTienCanThu);
                setOpenPopup(!openPopup);
            }}
                startIcon={<ManageAccountsRoundedIcon />}
                variant="contained"
                style={{ backgroundColor: colors.greenAccent[700], border: "none" }}>Thanh toán
            </Button>
        );
    }
    const columns = useMemo(() => [
        { field: "maKhoanThu", headerName: "Mã khoản thu", flex: 0.5 },
        { field: "maKhoanThuTheoHo", headerName: "Mã khoản thu theo hộ", flex: 1 },
        {
            field: "tenKhoanThu",
            headerName: "Tên khoản thu",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "soTien",
            headerName: "Số tiền cần thu",
            flex: 1,
            valueGetter: (param) => { return ((param.row.soTien ? param.row.soTien : "0") + " đồng") },
        },
        {
            field: "soTienDaNop",
            headerName: "Số tiền đã nộp",
            flex: 1,
            valueGetter: (param) => { return (param.row.soTienDaNop + " đồng") },
        },
        {
            field: "tinhTrang",
            headerName: "Tình trạng",
            flex: 1,
            valueGetter: (param) => {
                if (param.row.soTien == null) return ("Ủng hộ");
                return ((param.row.soTienDaNop >= param.row.soTien) ? "Đã nộp đủ" : ("Còn thiếu " + (param.row.soTien - param.row.soTienDaNop) + " đồng"));
            },
        },
        {
            field: "thanhToan",
            headerName: "Thanh toán",
            flex: 1,
            renderCell: (param) => {
                return (param.row.soTienDaNop < param.row.soTien || param.row.loaiKhoanThu === 0) && <PayButton openPopup={openPopup}
                    soTienCanThu={param.row.soTien - param.row.soTienDaNop} loaiKhoanThu={param.row.loaiKhoanThu} maHoKhau={param.row.maHoKhau}
                    setOpenPopup={setOpenPopup} maKhoanThuTheoHo={param.row.maKhoanThuTheoHo} />
            },
        },
    ]);
    return (
        <Box m="20px">
            <Header
                title="DANH SÁCH KHOẢN THU THEO HỘ"
            />
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
                <PayRevenue openPopup={openPopup} setOpenPopup={setOpenPopup} maKhoanThuTheoHo={revenueHouseID} maKhoanThu={maKhoanThu} soTienCanThu={soTienCanThu} maHoKhau={maHoKhau} />
                {isLoadingHouse ? (
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
                        getRowId={(r) => r.maKhoanThu}
                        rows={revenueHouse}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                    />
                )}
            </Box>
        </Box>
    );
};
export default RevenueHouse;