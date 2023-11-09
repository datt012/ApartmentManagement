import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, IconButton, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllDemographic } from "../../Redux/demographicSlice";
import CloseIcon from '@mui/icons-material/Close';
import demographicService from "../../Services/API/demographicService";
import { DesktopDatePicker, LocalizationProvider, } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import roomService from "../../Services/API/roomService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RegisterRoom = ({ openPopup, setOpenPopup, onSuccess }) => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch = useDispatch();
    const [date, setDate] = useState(dayjs(new Date()));

    const handleFormSubmit = (values) => {
        if(window.confirm("Bạn chắc chắn muốn lưu?") == true) {
            roomService.addRoom({
                tenPhong: values.tenPhong,
                tang: values.tang,
                dienTich: +values.dienTich,
                moTa: values.moTa
            }).then(mes => {
                toast(mes.message);
                setOpenPopup(!openPopup);
                onSuccess && onSuccess();
            }).catch(e => {
    
            });
        }
    };
    const initialValues = {
        tenPhong: "",
        tang: "",
        dienTich: "",
        maHoKhau: "",
        moTa: "",
    };
    return (
        <Dialog open={openPopup} maxWidth="md" style={{ backgroundColor: "transparent" }}
            sx={{
            }}>
            <DialogTitle>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1, fontSize: 20, fontWeight: "bold" }}>
                        {"THÊM CĂN HỘ"}
                    </Typography>
                    <IconButton aria-label="close" onClick={() => {
                        setOpenPopup(!openPopup);
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
                                        label="Tên phòng"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.tenPhong}
                                        name="tenPhong"
                                        error={!!touched.tenPhong && !!errors.tenPhong}
                                        helperText={touched.tenPhong && errors.tenPhong}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Tầng"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.tang}
                                        name="tang"
                                        error={!!touched.tang && !!errors.tang}
                                        helperText={touched.tang && errors.tang}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Diện tích"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.dienTich}
                                        name="dienTich"
                                        error={!!touched.dienTich && !!errors.dienTich}
                                        helperText={touched.dienTich && errors.dienTich}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2" }}
                                    />
                                    {/* <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Mã hộ khẩu"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.ngheNghiep}
                                        name="ngheNghiep"
                                        error={!!touched.ngheNghiep && !!errors.ngheNghiep}
                                        helperText={touched.ngheNghiep && errors.ngheNghiep}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2" }}
                                    /> */}
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Mô tả"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.moTa}
                                        name="moTa"
                                        error={!!touched.moTa && !!errors.moTa}
                                        helperText={touched.moTa && errors.moTa}
                                        sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2" }}
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
    tenPhong: yup.string().required("Bạn chưa điền thông tin"),
    tang: yup.string().required("Bạn chưa điền thông tin"),
    dienTich: yup.string().required("Bạn chưa điền thông tin")
});

export default RegisterRoom;


