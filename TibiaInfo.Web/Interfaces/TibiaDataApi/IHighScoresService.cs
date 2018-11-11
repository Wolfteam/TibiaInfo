using Refit;
using System.Threading.Tasks;
using TibiaInfo.Web.Models.TibiaDataApi.HighScores;

namespace TibiaInfo.Web.Interfaces.TibiaDataApi
{
    public interface IHighScoresService
    {
        [Get("/highscores/{world}.json")]
        Task<HighScoreWrapperResponse> GetAllHighScores(string world);

        [Get("/highscores/{world}/{type}.json")]
        Task<HighScoreWrapperResponse> GetAllHighScores(string world, string type);

        [Get("/highscores/{world}/{type}/{vocation}.json")]
        Task<HighScoreWrapperResponse> GetAllHighScores(string world, string type, string vocation);
    }
}
