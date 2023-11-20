import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, IconButton, InputAdornment } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SearchIcon from '@mui/icons-material/Search';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useEffect, useState, } from "react";
import { useDispatch } from "react-redux";
import { fetchAllAbsents } from "../../Redux/absentSlice";
import CloseIcon from '@mui/icons-material/Close';
import absentService from "../../Services/API/absentService";
import { DesktopDatePicker, LocalizationProvider, } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "../../setups/custom_axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterAbsent = ({ openPopup, setOpenPopup }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [date, setDate] = useState(dayjs(new Date()));
  const [name, setName] = useState("");
  const [canCuoc, setCanCuoc] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleFormSubmit = (values) => {
    if(window.confirm("Bạn chắc chắn muốn lưu?") == true) {
      absentService.postAbsent({
        maNhanKhau: values.maNhanKhau,
        thoiHan: date,
        lyDo: values.lyDo,
      }).then(mes => {
        toast(mes.message);
        setOpenPopup(!openPopup);
        setName("");
        setCanCuoc("");
        setShow(false);
        dispatch(fetchAllAbsents());
      }).catch(e => {
        toast(e?.response?.data?.reason || "Thêm mới tạm vắng thất bại")
      })
    }
  };
  const handleOnChange = (newValue) => {
    setDate(newValue);
  }
  useEffect(() => {
  }, [name, canCuoc, show]);
  const initialValues = {
    maNhanKhau: "",
    lyDo: "",
  };
  return (
    <Dialog open={openPopup} maxWidth="md" style={{ backgroundColor: "transparent" }}
      sx={{
      }}>
      <DialogTitle>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1, fontSize: 20, fontWeight: "bold" }}>
            {"ĐĂNG KÝ TẠM VẮNG"}
          </Typography>
          <IconButton aria-label="close" onClick={() => {
            setOpenPopup(!openPopup);
            setName("");
            setCanCuoc("");
            setShow(false);
          }}>
            <CloseIcon></CloseIcon>
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
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
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    width: 500
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Mã nhân khẩu"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.maNhanKhau}
                    name="maNhanKhau"
                    error={!!touched.maNhanKhau && !!errors.maNhanKhau}
                    helperText={touched.maNhanKhau && errors.maNhanKhau}
                    sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => {
                            if (!(!!touched.maNhanKhau && !!errors.maNhanKhau)) {
                              axios.get(`/nhan-khau?maNhanKhau=${values.maNhanKhau}`).then(mes => {
                                //alert(JSON.stringify(mes.data));
                                setName(mes.data.hoTen);
                                setCanCuoc(mes.data.canCuocCongDan);
                                setShow(true);
                              }).catch(e => {
                                toast(e?.response?.data?.reason || "Lấy thông tin nhân khẩu thất bại")
                                setName();
                                setCanCuoc();
                                setShow(false);
                              })
                            }

                          }}>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  
                  {show && (
                    <>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Họ và tên"
                        name="hoTen"
                        InputProps={{
                          readOnly: true,
                        }}
                        value={name}
                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}
                      ></TextField>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Căn cước công dân"
                        name="canCuocCongDan"
                        InputProps={{
                          readOnly: true,
                        }}
                        value={canCuoc}
                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}
                      ></TextField></>
                  )}
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Lý do"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lyDo}
                    name="lyDo"
                    error={!!touched.lyDo && !!errors.lyDo}
                    helperText={touched.lyDo && errors.lyDo}
                    sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4" }}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker label="Thời điểm bắt đầu"
                      inputFormat="DD/MM/YYYY"
                      onChange={handleOnChange}
                      value={date}
                      renderInput={(params) => <TextField style={{width: 150}} {...params} />}>

                    </DesktopDatePicker>
                  </LocalizationProvider>
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
        {/* <ToastContainer /> */}
      </DialogContent>
    </Dialog>

  );
};

const idRegEXp = /^\d+$/;

const checkoutSchema = yup.object().shape({
  maNhanKhau: yup.string().matches(idRegEXp, "Mã nhân khẩu không hợp lệ").required("Bạn chưa điền thông tin"),
  lyDo: yup.string().required("Bạn chưa điền thông tin"),
});

export default RegisterAbsent;


