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
    public class PhongRepository : IPhongRepository
    {
        public List<PhongEntity> GetListPhong(int index, int limit)
        {
            try
            {
                var _dbcontext = new MyDbContext();
                List<PhongEntity> arr;
                if (index == 0 && limit == 0)
                {
                    arr = _dbcontext.Phong.Where(
                    o => o.Delete == Constant.NOT_DELETE).ToList();
                }
                else arr = _dbcontext.Phong.Where(
                    o => o.Delete == Constant.NOT_DELETE).Skip(limit * (index - 1)).Take(limit).ToList();

                return arr;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        
        public PhongEntity GetPhong(int maPhong)
        {
            try
            {
                var _dbcontext = new MyDbContext();
                PhongEntity xe = _dbcontext.Phong.Where(
                    o => o.Delete == Constant.NOT_DELETE && o.MaPhong == maPhong).FirstOrDefault();
                return xe;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public PhongEntity GetPhongByHoKhau(string maHoKhau)
        {
            try
            {
                var _dbcontext = new MyDbContext();
                PhongEntity xe = _dbcontext.Phong.Where(
                    o => o.Delete == Constant.NOT_DELETE && o.MaHoKhau == maHoKhau).FirstOrDefault();
                return xe;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public bool CreatePhong(PhongEntity phong)
        {
            try
            {
                var _dbcontext = new MyDbContext();
                _dbcontext.Phong.Add(phong);

                int number_rows = _dbcontext.SaveChanges();

                if (number_rows <= 0) return false;

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public bool UpdatePhong(PhongEntity newPhong)
        {
            try
            {
                var _dbcontext = new MyDbContext();
                var phong = _dbcontext.Phong.FirstOrDefault(
                    o => o.MaPhong == newPhong.MaPhong && o.Delete == Constant.NOT_DELETE);

                if (phong != null)
                {
                    phong.UserUpdate = newPhong.UserUpdate;
                    phong.UpdateTime = newPhong.UpdateTime;
                    phong.TenPhong = newPhong.TenPhong;
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
        public bool DeletePhong(int maPhong, string userNameUpdate)
        {
            try
            {
                var _dbcontext = new MyDbContext();
                var phong = _dbcontext.Phong.FirstOrDefault(
                    o => o.MaPhong == maPhong && o.Delete == Constant.NOT_DELETE);
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
