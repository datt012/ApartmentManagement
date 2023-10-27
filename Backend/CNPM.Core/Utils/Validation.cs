using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CNPM.Core.Utils
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class TrangThaiAttribute : ValidationAttribute
    {
        public static ValidationResult IsTrangThai(int trangThai)
        {
            if (trangThai == 0 || trangThai == 1) // trang thai = 0 da chet, 1 da chet
                return ValidationResult.Success;
            else
                return new ValidationResult("Trang thai is not valid, trang thai = 0 as die, = 1 as alive");
        }
    }

    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class LoaiKhoanThuAttribute : ValidationAttribute
    {
        public static ValidationResult IsKhoanThu(int khoanThu)
        {
            if (khoanThu == 0 || khoanThu == 1 || khoanThu == 2 || khoanThu == 3 || khoanThu == 4) // khoản thu = 0 - ủng hộ/đóng góp, 1 - phí sinh hoạt, 2 - phí dịch vụ, 3 - phí quản lý, 4 - phí gửi xe
                return ValidationResult.Success;
            else
                return new ValidationResult("Khoan thu is not valid");
        }
    }
}
