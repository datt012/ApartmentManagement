using CNPM.Core.Utils;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CNPM.Core.Models.Phong
{
    public class PhongDto1003 // body get list
    {
        [JsonProperty("maPhong")]
        public int MaPhong { get; set; }

        [JsonProperty("tenPhong")]
        public string TenPhong { get; set; }

        [JsonProperty("tang")]
        public string Tang { get; set; }

        [JsonProperty("dienTich")]
        public double DienTich { get; set; }

        [JsonProperty("moTa")]
        public string MoTa { get; set; }
    }
}

