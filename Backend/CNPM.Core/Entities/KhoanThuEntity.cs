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
        public int LoaiKhoanThu { get; set; } // 0 - ủng hộ , 1 - phí vệ sinh
        [StringLength(200)]
        public string? GhiChu { get; set; }

    }
}
