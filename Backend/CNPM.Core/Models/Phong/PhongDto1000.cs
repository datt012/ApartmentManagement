using CNPM.Core.Entities;
using CNPM.Core.Utils;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CNPM.Core.Models.Phong
{
    public class PhongDto1000 // body create
    {
        [Required]
        [MaxLength(100)]
        [JsonProperty("tenPhong")]
        public string TenPhong { get; set; }

        [Required]
        [JsonProperty("tang")]
        public string Tang { get; set; }

        [Required]
        [Range(0, 1000)]
        [JsonProperty("dienTich")]
        public double DienTich { get; set; }

        [JsonProperty("maHoKhau")]
        public string? MaHoKhau { get; set; }

        [JsonProperty("moTa")]
        public string? MoTa { get; set; }
    }
}

