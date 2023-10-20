using CNPM.Core.Entities;
using CNPM.Core.Utils;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CNPM.Core.Models.LichSu
{
    public class LichSuDto1000 // body get list
    {
        [JsonProperty("maLichSu")]
        public int MaLichSu { get; set; }

        [JsonProperty("noiDung")]
        public string NoiDung { get; set; }

        [JsonProperty("createTime")]
        public DateTime CreateTime { get; set; }

        [JsonProperty("updateTime")]
        public DateTime UpdateTime { get; set; }

        [JsonProperty("userCreate")]
        public string UserCreate { get; set; }

        [JsonProperty("userUpdate")]
        public string UserUpdate { get; set; }
    }
}

