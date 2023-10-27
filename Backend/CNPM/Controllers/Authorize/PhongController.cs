using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CNPM.Service.Interfaces;
using CNPM.Core.Models;
using CNPM.Core.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using CNPM.Service.Implementations;
using CNPM.Core.Models.Phong;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace CNPM.Controllers.Authorize
{
    //[VerifyToken]
    [Authorize]
    [ApiController]
    [Route(Constant.API_BASE)]

    public class PhongController : ControllerBase
    {
        private readonly IPhongService _phongService;
        public PhongController(IPhongService phongService)
        {
            _phongService = phongService;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
        Roles = Constant.Administrator + ", " + Constant.Manager)]
        [HttpGet("phong/danh-sach-phong")]
        public IActionResult GetListPhong(int index, int limit)
        {
            return _phongService.GetListPhong(index, limit);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
        Roles = Constant.Administrator + ", " + Constant.Manager)]
        [HttpGet("phong")]
        public IActionResult GetPhong(int maPhong)
        {
            return _phongService.GetPhong(maPhong);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
        Roles = Constant.Administrator + ", " + Constant.Manager)]
        [HttpPost("phong")]
        public IActionResult CreatePhong([FromBody] PhongDto1000 phong)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(phong);
            }
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);
            return _phongService.CreatePhong(token, phong);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
        Roles = Constant.Administrator + ", " + Constant.Manager)]
        [HttpPut("phong")]
        public IActionResult UpdatePhong([FromBody] PhongDto1002 newPhong, int maPhong)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(newPhong);
            }
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);
            return _phongService.UpdatePhong(token, maPhong, newPhong);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
        Roles = Constant.Administrator + ", " + Constant.Manager)]
        [HttpDelete("phong")]
        public IActionResult DeletePhong(int maPhong, int version)
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);
            return _phongService.DeletePhong(maPhong, token, version);
        }

    }
}