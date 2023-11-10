using CNPM.Core.Models;
using CNPM.Repository.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using CNPM.Core.Entities;
using CNPM.Core.Utils;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using CNPM.Service.Interfaces;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using CNPM.Repository.Implementations;
using System.Collections.Generic;
using CNPM.Core.Models.CanHo;

namespace CNPM.Service.Implementations
{

    public class CanHoService : ICanHoService
    {
        private readonly ICanHoRepository _canHoRepository;
        private readonly IMapper _mapper;
        public CanHoService(ICanHoRepository canHoRepository)
        {
            _canHoRepository = canHoRepository;
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            });
            _mapper = config.CreateMapper();
        }
        public IActionResult GetListCanHo(int index, int limit)
        {
            try
            {
                var listPhong = _canHoRepository.GetListCanHo(index, limit);
                var arr = _mapper.Map<List<CanHoEntity>, List<CanHoDto1003>>(listPhong);
                return new OkObjectResult(
                    new
                    {
                        message = Constant.GET_LIST_PHONG_SUCCESSFULLY,
                        data = arr
                    }
                );
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public IActionResult GetCanHo(int maPhong)
        {
            try { 
                CanHoEntity phong = _canHoRepository.GetCanHo(maPhong);

                if (phong == null) return new BadRequestObjectResult(
                       new
                       {
                           message = Constant.GET_PHONG_FAILED,
                           reason = Constant.MA_PHONG_NOT_EXIST
                       }
                    );

                var phong1001 = _mapper.Map<CanHoEntity, CanHoDto1001>(phong);

                return new OkObjectResult(new {
                    message = Constant.GET_TAM_VANG_SUCCESSFULLY,
                    data = phong1001
                });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public IActionResult CreateCanHo(string token, CanHoDto1000 phong1000)
        {
            try
            {
                var userName = Helpers.DecodeJwt(token, "username");

                CanHoEntity phong = _mapper.Map<CanHoDto1000, CanHoEntity>(phong1000);

                phong.CreateTime = DateTime.Now;
                phong.UpdateTime = DateTime.Now;
                phong.UserCreate = userName;
                phong.UserUpdate = userName;
                if (phong1000.MaHoKhau == "") phong.MaHoKhau = null;
                bool created = _canHoRepository.CreateCanHo(phong);

                if (created)
                {
                    return new OkObjectResult(new
                    {
                        message = Constant.CREATE_PHONG_SUCCESSFULLY
                    });
                }
                return new BadRequestObjectResult(new
                {
                    message = Constant.CREATE_PHONG_FAILED
                });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public IActionResult UpdateCanHo(string token, int maPhong, CanHoDto1002 newPhong)
        {
            try
            {
                var userName = Helpers.DecodeJwt(token, "username");
                var phong = _canHoRepository.GetCanHo(maPhong);
                if (phong == null) return new BadRequestObjectResult(new
                {
                    message = Constant.UPDATE_PHONG_FAILED,
                    reason = Constant.MA_PHONG_NOT_EXIST
                });

                if (phong.Version != newPhong.Version) return new BadRequestObjectResult(new
                {
                    message = Constant.UPDATE_PHONG_FAILED,
                    reason = Constant.DATA_UPDATED_BEFORE
                });


                
                CanHoEntity phongEntity = _mapper.Map<CanHoDto1002, CanHoEntity>(newPhong);
                if (newPhong.MaHoKhau == "") phongEntity.MaHoKhau = null;
                phongEntity.MaCanHo = maPhong;
                phongEntity.UserUpdate = userName;
                phongEntity.UpdateTime = DateTime.Now;
                phongEntity.Version += 1;
                bool updated = _canHoRepository.UpdateCanHo(phongEntity);
                if (updated)
                {
                    return new OkObjectResult(new
                    {
                        message = Constant.UPDATE_PHONG_SUCCESSFULLY
                    });
                }
                return new BadRequestObjectResult(new
                {
                    message = Constant.UPDATE_PHONG_FAILED
                });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public IActionResult DeleteCanHo(int maPhong, string token, int version)
        {
            try
            {
                var userName = Helpers.DecodeJwt(token, "username");
                var phong = _canHoRepository.GetCanHo(maPhong);


                if (phong == null) return new BadRequestObjectResult(new
                {
                    message = Constant.DELETE_PHONG_FAILED,
                    reason = Constant.MA_PHONG_NOT_EXIST
                });


                if (phong.Version != version) return new BadRequestObjectResult(new
                {
                    message = Constant.DELETE_PHONG_FAILED,
                    reason = Constant.DATA_UPDATED_BEFORE
                });

                bool delete = _canHoRepository.DeleteCanHo(maPhong, userName);
                if (delete)
                {
                    return new OkObjectResult(new
                    {
                        message = Constant.DELETE_PHONG_SUCCESSFULLY,
                    });
                }
                return new BadRequestObjectResult(new
                {
                    message = Constant.DELETE_PHONG_FAILED
                });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}