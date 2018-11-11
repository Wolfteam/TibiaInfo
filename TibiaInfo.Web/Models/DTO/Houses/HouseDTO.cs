using TibiaInfo.Web.Enums;

namespace TibiaInfo.Web.Models.DTO.Houses
{
    public class HouseDTO
    {
        public int ID { get; set; }

        public string World { get; set; }

        public string Name { get; set; }

        public HouseType Type { get; set; }

        public int NumberOfBeds { get; set; }

        public int Size { get; set; }

        public int Rent { get; set; }

        public string ImageUrl { get; set; }

        public HouseStatusDTO Status { get; set; }
    }
}
