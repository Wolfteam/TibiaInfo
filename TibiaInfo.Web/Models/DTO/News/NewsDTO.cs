namespace TibiaInfo.Web.Models.DTO.News
{
    public class NewsDTO
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public CreatedInformationDTO CreatedAt { get; set; }
    }
}
