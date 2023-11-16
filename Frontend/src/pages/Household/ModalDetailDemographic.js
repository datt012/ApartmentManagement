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
import moment from "moment";


const ModalDetailDemographic = ({ memberData, onClose, onSuccess }) => {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch = useDispatch();

    const handleFormSubmit = (values) => {

    };
    return (
        <Dialog open={true} maxWidth="lg" style={{ backgroundColor: "transparent" }}
            sx={{
                
            }}>
            <DialogTitle>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1, fontSize: 20, fontWeight: "bold" }}>
                        {"THÔNG TIN THÀNH VIÊN"}
                    </Typography>
                    <IconButton aria-label="close" onClick={() => {
                        onClose && onClose();
                    }}>
                        <CloseIcon></CloseIcon>
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <Box m="20px">
                <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Họ tên</th>
                        <th>Căn cước công dân</th>
                        <th>Ngày sinh</th>
                        <th>Nơi sinh</th>
                        <th>Nghề nghiệp</th>
                        <th>Quan hệ với chủ hộ</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {memberData.map((row, index) => {
                        return <tr key={index}>
                          <td>{row.hoTen}</td>
                          <td>{row.canCuocCongDan}</td>
                          <td>{moment(row.ngaySinh).format('YYYY-MM-DD')}</td>
                          <td>{row.noiSinh}</td>
                          <td>{row.ngheNghiep}</td>
                          <td>{row.quanHe}</td>
                          <td>
                            {row.trangThai === 1 ? 'Còn sống' : 'Đã chết'}
                          </td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                </Box>
                <ToastContainer />
            </DialogContent>
        </Dialog>

    );
};


export default ModalDetailDemographic;


