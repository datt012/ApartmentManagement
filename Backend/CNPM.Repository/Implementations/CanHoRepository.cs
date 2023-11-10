using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CNPM.Repository.Interfaces;
using CNPM.Core.Entities;
using Microsoft.EntityFrameworkCore;
using CNPM.Core.Utils;
using CNPM.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace CNPM.Repository.Implementations
{
    public class CanHoRepository : ICanHoRepository
    {
        public List<CanHoEntity> GetListCanHo(int index, int limit)
        {
            try
            {
                var _dbcontext = new MyDbContext();
                List<CanHoEntity> arr;
                if (index == 0 && limit == 0)
                {
                    arr = _dbcontext.CanHo.Where(
                    o => o.Delete == Constant.NOT_DELETE).ToList();
                }
                else arr = _dbcontext.CanHo.Where(
                    o => o.Delete == Constant.NOT_DELETE).Skip(limit * (index - 1)).Take(limit).ToList();

                return arr;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        
        public CanHoEntity GetCanHo(int maCanHo)
        {
            try
            {
                var _dbcontext = new MyDbContext();
                CanHoEntity xe = _dbcontext.CanHo.Where(
                    o => o.Delete == Constant.NOT_DELETE && o.MaCanHo == maCanHo).FirstOrDefault();
                return xe;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public CanHoEntity GetCanHoByHoKhau(string maHoKhau)
        {
            try
            {
                var _dbcontext = new MyDbContext();
                CanHoEntity xe = _dbcontext.CanHo.Where(
                    o => o.Delete == Constant.NOT_DELETE && o.MaHoKhau == maHoKhau).FirstOrDefault();
                return xe;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public bool CreateCanHo(CanHoEntity phong)
        {
            try
            {
                var _dbcontext = new MyDbContext();
                _dbcontext.CanHo.Add(phong);

                int number_rows = _dbcontext.SaveChanges();

                if (number_rows <= 0) return false;

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public bool UpdateCanHo(CanHoEntity newPhong)
        {
            try
            {
                var _dbcontext = new MyDbContext();
                var phong = _dbcontext.CanHo.FirstOrDefault(
                    o => o.MaCanHo == newPhong.MaCanHo && o.Delete == Constant.NOT_DELETE);

                if (phong != null)
                {
                    phong.UserUpdate = newPhong.UserUpdate;
                    phong.UpdateTime = newPhong.UpdateTime;
                    phong.TenCanHo = newPhong.TenCanHo;
                    phong.Tang = newPhong.Tang;
                    phong.DienTich = newPhong.DienTich;
                    phong.MaHoKhau = newPhong.MaHoKhau;
                    phong.MoTa = newPhong.MoTa;
                    phong.Version = newPhong.Version;
                    _dbcontext.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public bool DeleteCanHo(int maCanHo, string userNameUpdate)
        {
            try
            {
                var _dbcontext = new MyDbContext();
                var phong = _dbcontext.CanHo.FirstOrDefault(
                    o => o.MaCanHo == maCanHo && o.Delete == Constant.NOT_DELETE);
                if (phong != null)
                {
                    phong.Delete = Constant.DELETE;
                    phong.UserUpdate = userNameUpdate;
                    phong.UpdateTime = DateTime.Now;
                    phong.Version++;
                    _dbcontext.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
