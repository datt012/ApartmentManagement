using Microsoft.EntityFrameworkCore;
using CNPM.Repository;
using CNPM.Core.Models;
using CNPM.Core.Entities;
using CNPM.Core.Utils;

namespace CNPM
{
    
    public class InitDatabase
    {
        public static async Task CreateDatabase()
        {
            using var dbcontext = new MyDbContext();
            string dbname = dbcontext.Database.GetDbConnection().Database;
            var result = await dbcontext.Database.EnsureCreatedAsync();
            string resultstring = result ? "tao db thanh  cong" : "db da ton tai";
            Console.WriteLine($"CSDL {dbname} : {resultstring}");
        }
        public static async Task DeleteDatabase()
        {

            using (var context = new MyDbContext())
            {
                String databasename = context.Database.GetDbConnection().Database;
                
                bool deleted = await context.Database.EnsureDeletedAsync();
                string deletionInfo = deleted ? "đa xoa" : "khong xoa duoc";
                Console.WriteLine($"{databasename} {deletionInfo}");

            }

        }
        public static async void ResetDb()
        {
            await DeleteDatabase();
            await CreateDatabase();
            Init();

        }
        public static void Init()
        {
            using var dbcontext = new MyDbContext();
            var listPermissionEntity = new List<RoleEntity>()
            {
                new RoleEntity("Administrator"),
                new RoleEntity("Manager"),
                new RoleEntity("Stocker")
            };
            DateTime today = DateTime.Now;
            
            listPermissionEntity.ForEach( o =>  dbcontext.Add(o));
            var superAdmin = new UserEntity{
                UserName = "crackertvn",
                Password = "$2a$11$ew1SDZWnBOiPna6ZHaTWHuhEELiDGAan8/6cvBI6gCgWZ17vJB0oG", //123456
                FirstName = "Trung",
                LastName = "Tran",
                Email = "bruceleemax111@gmail.com",
                RoleId = 1,
                CreateTime = today,
                UpdateTime = today,
                UserCreate = "crackertvn",
                UserUpdate = "crackertvn",
                Version = 0,
                Delete = 0
            };
            dbcontext.Add(superAdmin);
            dbcontext.SaveChanges();
        }
    }
}
