import axios from "../../setups/custom_axios";

export const putHouseHold = async ({maHoKhau, diaChiThuongTru, noiCap, ngayCap, danhSachNhanKhau, version}) => {
    try {
        const response = await axios.put(`/ho-khau?mahokhau=${maHoKhau}`, {
            diaChiThuongTru,
            noiCap,
            ngayCap,
            danhSachNhanKhau,
            version
        })

        if (response.message){
            alert (response.message)
        } else {
            alert ("Sửa hộ khẩu với mã hộ là " + maHoKhau + " thất bại ")
        }
        console.log (response);
    } catch (error) {
        console.log (error);
    }
}