import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, IconButton, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useEffect, useState, } from "react";
import { tokens } from "../../theme";
import { useDispatch } from "react-redux";
import { fetchAllRevenue } from "../../Redux/revenueSlice";
import CloseIcon from '@mui/icons-material/Close';
import revenueService from "../../Services/API/revenueService";
import { DesktopDatePicker, LocalizationProvider, } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LIST_LOAI_KHOAN_THU } from "../../Services/Utils/const";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useTheme } from "@mui/material";
import CreateListRevenue from "./CreateListRevenue";

const CreateRevenue = ({ openPopup, setOpenPopup }) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [dateStart, setDateStart] = useState(dayjs(new Date()));
  const [dateEnd, setDateEnd] = useState(dayjs(new Date()));
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);
  const [listHouseHold, setListHouseHold] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const handleFormSubmit = (values) => {
    var data;
    switch (values.loaiKhoanThu) {
      case 0:
        data = '{\"quanLy\":{\"soTien\":10000,\"donVi\":\"m2\"}}';
        break;
      case 1:
        data = '[{\"dien\":' + values.dien + ', \"nuoc\":' + values.nuoc + ', \"internet\":' + values.internet + ', \"maHoKhau\": \"' + 0 + '\"}]';
        break;
      case 2:
        data = '{\"dichVu\":{\"soTien\":' + values.dichvu + ',\"donVi\":\"m2\"}}';
        break;
      case 3:
        data = '{\"quanLy\":{\"soTien\":' + values.quanly + ',\"donVi\":\"m2\"}}';
        break;
      case 4:
        data = '{\"xeMay\":{\"soTien\":' + values.xeMay + ',\"donVi\":\"xe\"},\"xeOto\":{\"soTien\":' + values.xeOto + ',\"donVi\":\"xe\"}}';
    }
    revenueService.postRevenue({
      tenKhoanThu: values.tenKhoanThu,
      ghiChu: values.ghiChu,
      loaiKhoanThu: values.loaiKhoanThu,
      thoiGianBatDau: dateStart,
      thoiGianKetThuc: dateEnd,
      chiTiet: data,
    }).then(mes => {
      alert(mes.message);
      setOpenPopup(!openPopup);
      dispatch(fetchAllRevenue());
    })
  };
  //phi cố định ban đầu
  const initialValues = {
    tenKhoanThu: "",
    loaiKhoanThu: 0,
    dichvu: 0,
    quanly: 0,
    xeMay: 0,
    xeOto: 0,
    dien: 0,
    nuoc: 0,
    internet: 0,
    maHoKhau: "",
    ghiChu: "",
  };
  return (
    <Dialog open={openPopup} maxWidth="md" style={{ backgroundColor: "transparent" }}
      sx={{
      }}>
      <DialogTitle>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1, fontSize: 20, fontWeight: "bold" }}>
            {"TẠO KHOẢN THU PHÍ"}
          </Typography>
          <IconButton aria-label="close" onClick={() => {
            setOpenPopup(!openPopup)
          }}>
            <CloseIcon></CloseIcon>
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <CreateListRevenue openModal={openModal} setOpenModal={setOpenModal} listHouseHold={listHouseHold} setListHouseHold={setListHouseHold}/>
        <Box m="20px">
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Tên khoản thu"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.tenKhoanThu}
                    name="tenKhoanThu"
                    error={!!touched.tenKhoanThu && !!errors.tenKhoanThu}
                    helperText={touched.tenKhoanThu && errors.tenKhoanThu}
                    sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Ghi chú"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.ghiChu}
                    name="ghiChu"
                    sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}
                  />
                  <TextField
                    variant="filled"
                    select
                    label="Loại khoản thu"
                    onBlur={handleBlur}
                    name="loaiKhoanThu"
                    onChange={handleChange}
                    defaultValue={values.loaiKhoanThu}
                    sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}>
                    {LIST_LOAI_KHOAN_THU.map((khoanThu, index) => {
                      return <MenuItem key={index} value={khoanThu.id}>{khoanThu.label}</MenuItem>
                    })}
                  </TextField>
                  {values.loaiKhoanThu === 1 && [<TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Tiền điện (VNĐ)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.dien}
                    name="dien"
                    error={!!touched.dien && !!errors.dien}
                    helperText={touched.dien && errors.dien}
                    sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2" }}
                  />
                  ]}
                  {values.loaiKhoanThu === 1 && [<TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Tiền nước (VNĐ)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nuoc}
                    name="nuoc"
                    error={!!touched.nuoc && !!errors.nuoc}
                    helperText={touched.nuoc && errors.nuoc}
                    sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2" }}
                  />
                  ]}
                  {values.loaiKhoanThu === 1 && [<TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Tiền internet (VNĐ)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.internet}
                    name="internet"
                    error={!!touched.internet && !!errors.internet}
                    helperText={touched.internet && errors.internet}
                    sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2" }}
                  />
                  ]}
                  {values.loaiKhoanThu === 2 && <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Phí dịch vụ (VNĐ / m2)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.dichvu}
                    name="dichvu"
                    error={!!touched.dichvu && !!errors.dichvu}
                    helperText={touched.dichvu && errors.dichvu}
                    sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}
                  />}
                  {values.loaiKhoanThu === 3 && <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Phí quản lý (VNĐ / m2)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quanly}
                    name="quanly"
                    error={!!touched.quanly && !!errors.quanly}
                    helperText={touched.quanly && errors.quanly}
                    sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}
                  />}
                  {values.loaiKhoanThu === 4 && <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Phí ô tô (VNĐ / xe)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.xeOto}
                    name="phiOto"
                    error={!!touched.xeOto && !!errors.xeOto}
                    helperText={touched.xeOto && errors.xeOto}
                    sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2" }}
                  />}
                  {values.loaiKhoanThu === 4 && <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Phí xe máy (VNĐ / xe)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.xeMay}
                    name="phiOto"
                    error={!!touched.xeMay && !!errors.xeMay}
                    helperText={touched.xeMay && errors.xeMay}
                    sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2" }}
                  />}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker label="Thời gian bắt đầu"
                      inputFormat="DD/MM/YYYY"
                      onChange={setDateStart}
                      value={dateStart}
                      renderInput={(params) => <TextField {...params} />}>

                    </DesktopDatePicker>
                    <DesktopDatePicker label="Thời gian kết thúc"
                      inputFormat="DD/MM/YYYY"
                      onChange={setDateEnd}
                      value={dateEnd}
                      renderInput={(params) => <TextField {...params} />}>

                    </DesktopDatePicker>
                  </LocalizationProvider>
                  {values.loaiKhoanThu === 1 && <Button
                    onClick={() => { setOpenModal(true)}}
                    startIcon={<FactCheckIcon />}
                    variant="contained"
                    style={{ backgroundColor: colors.greenAccent[500], border: "none" }}>Tạo khoản thu theo hộ
                  </Button>}
                </Box>
                <Box display="flex" justifyContent="end" mt="20px" >
                  <Button
                    type="submit" color="secondary" variant="contained" startIcon={<SaveAsIcon />}>
                    Lưu
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </DialogContent>
    </Dialog>

  );
};

const idRegEXp = /^\d+$/;

const checkoutSchema = yup.object().shape({
  tenKhoanThu: yup.string().required("Bạn chưa điền thông tin"),
});

export default CreateRevenue;


