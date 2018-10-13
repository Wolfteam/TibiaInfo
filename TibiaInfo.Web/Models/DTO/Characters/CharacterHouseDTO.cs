using System;

namespace TibiaInfo.Web.Models.DTO
{
    public class CharacterHouseDTO
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public string Town { get; set; }

        public DateTime PaidUntil { get; set; }

        public string World { get; set; }
    }
}
