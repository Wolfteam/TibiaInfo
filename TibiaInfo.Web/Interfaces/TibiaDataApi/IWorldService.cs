using Refit;
using System.Threading.Tasks;
using TibiaInfo.Web.Models.TibiaDataApi.Worlds;

namespace TibiaInfo.Web.Interfaces.TibiaDataApi
{
    public interface IWorldService
    {
        [Get("/worlds.json")]
        Task<AllWorldsWrapperResponse> GetAllWorlds();

        [Get("/world/{name}.json")]
        Task<WorldWrapperResponse> GetWorld(string name);
    }
}
