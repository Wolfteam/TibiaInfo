using TibiaInfo.Web.Enums;

namespace TibiaInfo.Web.Models.DTO.News
{
    public class SimpleNewsDTO
    {
        public int ID { get; set; }

        public NewsType Type { get; set; }

        public string Title { get; set; }

        public string ApiUrl { get; set; }

        public string TibiaUrl { get; set; }

        public CreatedInformationDTO CreatedAt { get; set; }
    }
}
