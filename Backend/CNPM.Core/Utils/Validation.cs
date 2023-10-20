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
            if (khoanThu == 0 || khoanThu == 1) // khoản thu = 0 - ủng hộ, 1 - phí ve sinh
                return ValidationResult.Success;
            else
                return new ValidationResult("Khoan thu is not valid, khoan thu = 0 as ung ho, = 1 as phi ve sinh");
        }
    }
}
