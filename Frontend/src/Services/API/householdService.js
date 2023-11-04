import axios from "../../setups/custom_axios";

const addHouseHold = async newHouseHold => {
    return await axios.post(`/ho-khau`, newHouseHold)
}
const updateHouseHold = async (maHoKhau, { diaChiThuongTru, noiCap, ngayCap, danhSachNhanKhau, version }) => {
    return await axios.put(`/ho-khau?mahokhau=${maHoKhau}`, {
        diaChiThuongTru,
        noiCap,
        ngayCap,
        danhSachNhanKhau,
        version
    });
}

const addRoomToHouseHold = async (maHoKhau, maPhong) => {
    return await axios.post(`/ho-khau/add-phong-to-ho-khau?mahokhau=${maHoKhau}&maphong=${maPhong}`);
}

const addXeToHouseHold = async ({ tenXe, bienKiemSoat, maLoaiXe, maHoKhau, moTa }) => {
    return await axios.post(`/ho-khau/add-xe`, { tenXe, bienKiemSoat, maLoaiXe, maHoKhau, moTa });
}

const updateXeToHouseHold = async (maXe, { tenXe, bienKiemSoat, maLoaiXe, maHoKhau, moTa, version }) => {
    return await axios.post(`/ho-khau/update-xe?maXe=${maXe}`, { tenXe, bienKiemSoat, maLoaiXe, maHoKhau, moTa, version });
}

const removeXe = async (maXe) => {
    return await axios.post(`/ho-khau/remove-xe?maXe=${maXe}`);
}

export const deleteHouseHold = async HouseHoldId => {
    try {
        const response = await axios.delete(`ho-khau?maHoKhau=${HouseHoldId}`)
        console.log(response)
        alert(response.message);
        /*if (response.message){
            alert (response.message)
        } else {
            alert ("Xóa thất bại")
        }*/
    } catch (error) {
        alert("Xóa hộ khẩu thất bại")
        console.log(error)
    }
}

const householdService = {
    addHouseHold,
    updateHouseHold,
    addRoomToHouseHold,
    addXeToHouseHold,
    updateXeToHouseHold,
    removeXe,
    deleteHouseHold
}

export default householdService;
