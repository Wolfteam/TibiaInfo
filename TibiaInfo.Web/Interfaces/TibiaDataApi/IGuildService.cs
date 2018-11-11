using Refit;
using System.Threading.Tasks;
using TibiaInfo.Web.Models.TibiaDataApi.Guilds;

namespace TibiaInfo.Web.Interfaces.TibiaDataApi
{
    public interface IGuildService
    {
        [Get("/guilds/{world}.json")]
        Task<AllGuildsWrapperResponse> GetAllGuillds(string world);

        [Get("/guild/{name}.json")]
        Task<GuildWrapperResponse> GetGuild(string name);
    }
}
