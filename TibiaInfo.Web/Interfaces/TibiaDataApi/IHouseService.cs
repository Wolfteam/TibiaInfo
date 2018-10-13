using Refit;
using System.Threading.Tasks;
using TibiaInfo.Web.Models.TibiaDataApi.Houses;

namespace TibiaInfo.Web.Interfaces.TibiaDataApi
{
    public interface IHouseService
    {
        [Get("/houses/{world}/{town}/{type}.json")]
        Task<AllHousesWrapperResponse> GetAllHouses(string world, string town, string type);

        [Get("/house/{world}/{houseid}.json")]
        Task<HouseWrapperResponse> GetHouse(string world, string houseid);
    }
}
