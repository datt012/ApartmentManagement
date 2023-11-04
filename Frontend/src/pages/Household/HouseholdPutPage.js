import { Box, Button, TextField } from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import CustomSelect from "../../components/CustomSelect";
import { useLocation, Link, useParams } from "react-router-dom";
import { useState, useEffect, version } from "react";
import axios from "../../setups/custom_axios";
import { formatDate } from "../../Services/API/formatDateService";
import Select from 'react-select';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';

import { useHistory } from 'react-router-dom';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import dayjs from "dayjs";
import householdService from "../../Services/API/householdService";
import roomService from "../../Services/API/roomService";
import RegisterXe from "./RegisterXe";
import EditXe from "./EditXe";


const HouseholdAddPage = () => {
  const history = useHistory();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();
  const state = location.state;
  const { id } = useParams();
  const [detailHouseholdData, setdetailHouseHoldData] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [selectOption, setSelectOption] = useState([]);
  const [roomId, setRoomId] = useState();
  const [xeArr, setXeArr] = useState([]);

  const [addXe, setAddXe] = useState(false);
  const [editXe, setEditXe] = useState(false);

  const [currentXe, setCurrentXe] = useState({});

  const handleSelect = (selectedOption) => {
    setSelectOption(selectedOption);
  };
  const handleUpdate = (values) => {
    console.log('values', values);
    householdService.addRoomToHouseHold(values.maHoKhau, roomId).then((result) => {
      console.log('result', result);
    }).catch(e => {

    })
    householdService.updateHouseHold(values.maHoKhau, {
      "diaChiThuongTru": values.diaChiThuongTru,
      "noiCap": values.noiCap,
      "ngayCap": values.ngayCap,
      "danhSachNhanKhau": selectOption.map((nhankhau) => {
        return nhankhau.value;
      }),
      "version": initialValues.version,
    }).then((result) => {
      alert(result.message);
    }).catch(e =>
      alert(e.response.message))
  }
  const [initialValues, setInitialValues] = useState({});
  const handleGetData = async () => {
    try {
      const response = await axios.get(`/nhan-khau/danh-sach-nhan-khau-chua-co-ho-khau`)
      const datas = response.data;
      const datamap = datas.map((data) => {
        const label = `${data.hoTen} ${data.maNhanKhau}`
        return {
          label,
          value: data.maNhanKhau
        }
      })
      console.log('datamap', datamap);
      setDataNhanKhau(datamap);
    } catch (error) {
      console.log(error);
    }
    try {
      setIsLoading(true);
      const response = await axios.get(`ho-khau?maHoKhau=${id}`)
      setdetailHouseHoldData(response.data);
      console.log(response.data);
      setRoomId(response.data.maPhong.toString());
      setXeArr(response.data.danhSachXe);
      setInitialValues({
        maHoKhau: response.data.maHoKhau,
        diaChiThuongTru: response.data.diaChiThuongTru,
        noiCap: response.data.noiCap,
        ngayCap: dayjs(response.data.ngayCap).format('YYYY-MM-DD'),
        danhSachNhanKhau: response.data.danhSachNhanKhau.map((data) => {
          const label = data.hoTen + " " + data.maNhanKhau
          return {
            label,
            value: data.maNhanKhau
          }
        }),
        maPhong: response.data.maPhong,
        version: response.data.version,
      })
      setIsLoading(false);
    } catch (error) {
      history.push('/household');
    }
    roomService.getListRoom().then((result) => {
      const datas = result.data;
      const datamap = datas.map((data) => {
        const label = data.tenPhong;
        return {
          label,
          value: data.maPhong.toString()
        }
      })
      console.log('datamap phong', datamap);
      setDataPhong(datamap);
    }).catch(e => {
      console.log(e);
    })
  }
  const [dataNhanKhau, setDataNhanKhau] = useState([]);
  const [dataPhong, setDataPhong] = useState([]);
  const handleRemoveXe = (maXe) => {

    let text = "Bạn có chắc chắn muốn xóa xe này không?";
    if (!window.confirm(text)) {
      return
    }
    householdService.removeXe(maXe).then((result) => {
      alert(result.message);
      handleGetData();
    }).catch(e => {
      alert(e.response.data.message);
    })
  }
  useEffect(() => {
    handleGetData();
  }, []);
  console.log('xeArr', xeArr);
  if (isLoading) {
    return <div>Loading....</div>
  }

  return (

    <Box m="20px" onLoad>
      <Header title="Cập nhật thông tin hộ khẩu" />
      {addXe && <RegisterXe maHoKhau={initialValues.maHoKhau} onClose={() => setAddXe(false)} onSuccess={() => handleGetData()} />}
      {editXe && <EditXe xeData={currentXe} onClose={() => setEditXe(false)} onSuccess={() => handleGetData()} />}
      <Formik
        onSubmit={(values) => {
          handleUpdate(values)
        }}
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
                label="Mã hộ khẩu"
                onBlur={handleBlur}
                onChange={handleChange}
                value={id}
                name="maHoKhau"
                error={!!touched.maHoKhau && !!errors.maHoKhau}
                helperText={touched.maHoKhau && errors.maHoKhau}
                sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 2", backgroundColor: "#293040" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Địa chỉ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.diaChiThuongTru}
                name="diaChiThuongTru"
                error={!!touched.diaChiThuongTru && !!errors.diaChiThuongTru}
                helperText={touched.diaChiThuongTru && errors.diaChiThuongTru}
                sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4", backgroundColor: "#293040" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nơi cấp"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.noiCap}
                name="noiCap"
                error={!!touched.noiCap && !!errors.noiCap}
                helperText={touched.noiCap && errors.noiCap}
                sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4", backgroundColor: "#293040" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type='date'
                label="Ngày cấp"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ngayCap}
                name="ngayCap"
                error={!!touched.ngayCap && !!errors.ngayCap}
                helperText={touched.ngayCap && errors.ngayCap}
                sx={{ "& .MuiInputBase-root": { height: 60 }, input: { border: "none" }, gridColumn: "span 4", backgroundColor: "#293040" }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '500px', marginBottom: 20 }}>
                  <Select
                    name="danhSachNhanKhau"
                    options={dataNhanKhau.concat(values.danhSachNhanKhau)}
                    component={CustomSelect}
                    placeholder="Danh sách mã nhân khẩu "
                    isMulti={true}
                    defaultValue={values.danhSachNhanKhau}
                    onChange={handleSelect}
                  />
                </div>
                <div>
                  <select
                    onChange={(e) => setRoomId(e.target.value)}
                    value={roomId} style={{ height: 40, width: 100, border: '1px solid #ccc', borderRadius: 5 }}>
                    <option value={""}>Chọn căn hộ</option>
                    {dataPhong?.map((phong, index) => {
                      return <option key={index} value={phong.value}>{phong.label}</option>
                    })}
                  </select>
                </div>
                <div style={{ width: '60vh', marginBottom: 10, marginTop: 10 }}>

                  <table class="custom-table">
                    <thead>
                      <tr>
                        <th>Mã xe</th>
                        <th>Biển kiểm soát</th>
                        <th>Loại xe</th>
                        <th>Tên xe</th>
                        <th>Mô tả</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {xeArr.map((row, index) => {
                        return <tr key={index}>
                          <td>{row.maXe}</td>
                          <td>{row.bienKiemSoat}</td>
                          <td>{row.maLoaiXe === "LX001" ? "Xe máy" : "Xe ô tô"}</td>
                          <td>{row.tenXe}</td>
                          <td>{row.moTa}</td>
                          <td>
                            <div style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-evenly'
                            }}>
                              <EditIcon onClick={() => { setCurrentXe(row); setEditXe(true) }} style={{ cursor: 'pointer' }} />
                              <DeleteIcon onClick={() => handleRemoveXe(row.maXe)}
                                style={{ cursor: 'pointer' }} />
                            </div>
                          </td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                  <Button onClick={() => setAddXe(true)}
                    size="small" variant="contained" color="info" style={{ marginTop: 5, color: 'white' }}>Thêm xe</Button>
                </div>
              </div>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button startIcon={<SaveAsIcon />}
                type="submit" color="secondary" variant="contained" onClick={() => console.log(values.maPhong)}>
                Lưu
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  maHoKhau: yup.string().required("required"),
  diaChiThuongTru: yup.string().required("required"),
  noiCap: yup.string().required("required"),
  ngayCap: yup.date().required("required"),
  danhSachNhanKhau: yup.array().required("required")
});


export default HouseholdAddPage;
