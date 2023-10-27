using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace CNPM.Core.Entities
{
    [Table("khoanthu")]
    public class KhoanThuEntity : BaseEntity
    {
        [Key]
        [Required]
        public int MaKhoanThu { get; set; }

        [Required, StringLength(100)]
        public string TenKhoanThu { get; set; }
        public DateTime ThoiGianBatDau { get; set; }
        public DateTime ThoiGianKetThuc { get; set; }
        public int LoaiKhoanThu { get; set; } // khoản thu = 0 - ủng hộ/đóng góp, 1 - phí sinh hoạt, 2 - phí dịch vụ, 3 - phí quản lý, 4 - phí gửi xe
        
        public string ChiTiet { get; set; }
        /*
            loaiKhoanThu = 1
            {
                dien: {
                        soTien: ,
                        donVi: "số điện",
                    }
                ,
                nuoc: {
                        soTien: ,
                        donVi: "m3",
                }
            },
            loaiKhoanThu = 2
            {
                dichVu: {
                    soTien: ,
                    donVi: "m2"
                },
                
            },
            loaiKhoanThu = 3
            {
                quanly: {
                    soTien: ,
                    donVi: "m2"
                },
            },
            loaiKhoanThu = 4
            {
                xeMay: {
                    soTien: ,
                    donVi: "xe"
                },
                xeOto: {
                    soTien: ,
                    donVi: "xe"
                }
            }
        */

        [StringLength(200)]
        public string? GhiChu { get; set; }

    }
}
