using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CNPM.Core.Models;
using CNPM.Core.Models.HoKhau;
using Microsoft.AspNetCore.Mvc;

namespace CNPM.Service.Interfaces
{
    public interface IHoKhauService
    {
        public IActionResult GetListHoKhau(int index, int limit);
        public IActionResult GetHoKhau(string maHoKhau);
        public IActionResult CreateHoKhau(string token, HoKhauDto1000 hoKhau);
        public IActionResult UpdateHoKhau(string token, string maHoKhau, HoKhauDto1002 hoKhau);
        public IActionResult DeleteHoKhau(string token, string maHoKhau,  int version);
    }
}
