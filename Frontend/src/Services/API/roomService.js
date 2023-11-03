import axios from "../../setups/custom_axios";

const getListRoom = async () => {
    return await axios.get(`/phong/danh-sach-phong`)
}

const getRoom = async (maPhong) => {
    return await axios.get(`/phong?maPhong=${maPhong}`)
}

const addRoom = async ({ tenPhong, tang, dienTich, maHoKhau, moTa }) => {
    return await axios.post(`/phong`, { tenPhong, tang, dienTich, maHoKhau, moTa })
}

const updateRoom = async (maPhong, { tenPhong, tang, dienTich, maHoKhau, moTa, version }) => {
    return await axios.put(`/phong?maPhong=${maPhong}`, { tenPhong, tang, dienTich, maHoKhau, moTa, version })
}

const deleteRoom = async (maPhong, version) => {
    return await axios.delete(`/phong?maPhong=${maPhong}&version=${version}`)
}

const roomService = {
    getListRoom,
    getRoom,
    addRoom,
    updateRoom,
    deleteRoom
}
export default roomService;
