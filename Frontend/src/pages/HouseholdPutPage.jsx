import { Box, Button, TextField } from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import CustomSelect from "../components/CustomSelect";
import { useLocation, Link, useParams } from "react-router-dom";
import { useState, useEffect, version } from "react";
import axios from "../setups/custom_axios";
import { formatDate } from "../Services/API/formatDateService";
import Select from 'react-select';
import { putHouseHold } from "../Services/API/putHouseHoldService";
import { useHistory } from 'react-router-dom';

const HouseholdAddPage = () => {
  const history = useHistory();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();
  const state = location.state;
  const { id } = useParams();
  const [detailHouseholdData, setdetailHouseHoldData] = useState({})
  const [isLoading, setIsLoading] = useState(true);
	const [selectOption, setSelectOption] = useState ([])
	 const handleSelect = (selectedOption) => {
    setSelectOption(selectedOption);
   // console.log(`Option selected:`, selectedOption);
  };

  const [initialValues, setInitialValues] = useState({
  })
  useEffect(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`ho-khau?maHoKhau=${id}`)
      setdetailHouseHoldData(response.data);
      setInitialValues({
        maHoKhau: response.data.maHoKhau,
        diaChiThuongTru: response.data.diaChiThuongTru,
        noiCap: response.data.noiCap,
        ngayCap: response.data.ngayCap,
        danhSachNhanKhau: response.data.danhSachNhanKhau.map((data) => {
          const label = data.hoTen + " " + data.maNhanKhau
          return {
            label,
            value: data.maNhanKhau
          }
        }),
        version: response.data.version,
      })
      setIsLoading(false);
    } catch (error) {
      history.push('/household');
    }
    console.log(initialValues)
  }, [])

  const [dataNhanKhau, setDataNhanKhau] = useState([]);

  useEffect(
    async () => {
      try {
        const response = await axios.get(`/nhan-khau/danh-sach-nhan-khau-chua-co-ho-khau`)
        const datas = response.data;
        const datamap = datas.map((data) => {
          const label = data.hoTen + " " + data.maNhanKhau
          return {
            label,
            value: data.maNhanKhau
          }
        })
        setDataNhanKhau(datamap);
      } catch (error) {
        console.log(error);
      }
    }, []
  )

  if (isLoading) {
    return <div>Loading....</div>
  }

  return (

    <Box m="20px" onLoad>
      <Header title="Thay đổi hộ khẩu" />


      <Formik
        onSubmit={(values) => {
          console.log({
            "maHoKhau": values.maHoKhau,
            "diaChiThuongTru": values.diaChiThuongTru,
            "noiCap": values.noiCap,
            "ngayCap": values.ngayCap,
            "danhSachNhanKhau": selectOption,
            "version" : initialValues.version,
          })
            putHouseHold({
              "maHoKhau": values.maHoKhau,
            "diaChiThuongTru": values.diaChiThuongTru,
            "noiCap": values.noiCap,
            "ngayCap": values.ngayCap,
            "danhSachNhanKhau": selectOption.map((nhankhau) => {
              return nhankhau.value;
            }),
            "version" : initialValues.version,
            })

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
                sx={{ "& .MuiInputBase-root": {height: 60},  input: { border: "none" }, gridColumn: "span 2", backgroundColor: "#293040" }}
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
                sx={{ "& .MuiInputBase-root": {height: 60},  input: { border: "none" }, gridColumn: "span 4", backgroundColor: "#293040" }}
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
                sx={{ "& .MuiInputBase-root": {height: 60},  input: { border: "none" }, gridColumn: "span 4", backgroundColor: "#293040" }}
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
                sx={{ "& .MuiInputBase-root": {height: 60},  input: { border: "none" }, gridColumn: "span 4", backgroundColor: "#293040" }}
              />

              <div style={{ width: '500px' }}>
                <Select
                  name="danhSachNhanKhau"
                  options={dataNhanKhau.concat(values.danhSachNhanKhau)}
                  component={CustomSelect}
                  placeholder="Danh sách mã nhân khẩu "
                  isMulti={true}
                  defaultValue={values.danhSachNhanKhau}
									onChange ={handleSelect}
                />
              </div>

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type = "submit" color="secondary" variant="contained" onClick={() => console.log(values.danhSachNhanKhau)}>
                Thay đổi hộ khẩu
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
