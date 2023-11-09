import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllTabernacles } from "../../Redux/tabernacleSlice";
import CloseIcon from '@mui/icons-material/Close';
import tabernacleService from "../../Services/API/tabernacleService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RegisterTabernacle = ({ openPopup, setOpenPopup }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const handleFormSubmit = (values) => {
    /*alert(JSON.stringify(values, null, 2));*/
    if(window.confirm("Bạn chắc chắn muốn lưu?")) {
      tabernacleService.postTabernacle({
        hoTen: values.hoTen,
        diaChiThuongTru: values.diaChiThuongTru,
        diaChiTamTru: values.diaChiTamTru,
        canCuocCongDan: values.canCuocCongDan,
      }).then(mes => {
        toast(mes.message);
        setOpenPopup(!openPopup);
        dispatch(fetchAllTabernacles());
  
      })
    }
  };
  const initialValues = {
    hoTen: "",
    canCuocCongDan: "",
    diaChiThuongTru: "",
    diaChiTamTru: "",
  };
  return (
    <Dialog open={openPopup} maxWidth="md" style={{ backgroundColor: "transparent" }}
      sx={{
      }}>
      <DialogTitle>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1, fontSize: 20, fontWeight: "bold" }}>
            {"ĐĂNG KÝ TẠM TRÚ"}
          </Typography>
          <IconButton aria-label="close" onClick={() => {
            setOpenPopup(!openPopup)
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
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Họ và tên"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.hoTen}
                    name="hoTen"
                    error={!!touched.hoTen && !!errors.hoTen}
                    helperText={touched.hoTen && errors.hoTen}
                    sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 5" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Số căn cước công dân"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.canCuocCongDan}
                    name="canCuocCongDan"
                    error={!!touched.canCuocCongDan && !!errors.canCuocCongDan}
                    helperText={touched.canCuocCongDan && errors.canCuocCongDan}
                    sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 5" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Địa chỉ thường trú"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.diaChiThuongTru}
                    name="diaChiThuongTru"
                    error={!!touched.diaChiThuongTru && !!errors.diaChiThuongTru}
                    helperText={touched.diaChiThuongTru && errors.diaChiThuongTru}
                    sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 10" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Địa chỉ tạm trú"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.diaChiTamTru}
                    name="diaChiTamTru"
                    error={!!touched.diaChiTamTru && !!errors.diaChiTamTru}
                    helperText={touched.diaChiTamTru && errors.diaChiTamTru}
                    sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 10" }}
                  />
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
        <ToastContainer />
      </DialogContent>
    </Dialog>

  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  hoTen: yup.string().required("Bạn chưa điền thông tin"),
  canCuocCongDan: yup
    .string().required("Bạn chưa điền thông tin"),
  diaChiThuongTru: yup.string().required("Bạn chưa điền thông tin"),
  diaChiTamTru: yup.string().required("Bạn chưa điền thông tin"),
});

export default RegisterTabernacle;


