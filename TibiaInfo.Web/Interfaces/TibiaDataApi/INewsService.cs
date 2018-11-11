using Refit;
using System.Threading.Tasks;
using TibiaInfo.Web.Models.TibiaDataApi.News;

namespace TibiaInfo.Web.Interfaces.TibiaDataApi
{
    public interface INewsService
    {
        [Get("/latestnews.json")]
        Task<AllNewsWrapperResponse> GetLatestNews();

        [Get("/newstickers.json")]
        Task<AllNewsWrapperResponse> GetNewsTickers();

        [Get("/news/{newsID}.json")]
        Task<NewsWrapperResponse> GetNews(string newsID);
    }
}
