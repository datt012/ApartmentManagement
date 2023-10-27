using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CNPM.Core.Models;
using CNPM.Core.Models.Phong;
using Microsoft.AspNetCore.Mvc;

namespace CNPM.Service.Interfaces
{
    public interface IPhongService
    {
        public IActionResult GetListPhong(int index, int limit);
        public IActionResult GetPhong(int maPhong);
        public IActionResult CreatePhong(string token, PhongDto1000 newPhong);
        public IActionResult UpdatePhong(string token, int maPhong, PhongDto1002 newPhong);
        public IActionResult DeletePhong(int maPhong, string token, int version);
    }
}
