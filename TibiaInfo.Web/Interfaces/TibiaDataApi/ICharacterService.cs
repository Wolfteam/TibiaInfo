using Refit;
using System.Threading.Tasks;
using TibiaInfo.Web.Models.TibiaDataApi.Character;

namespace TibiaInfo.Web.Interfaces.TibiaDataApi
{
    public interface ICharacterService
    {
        [Get("/characters/{name}.json")]
        Task<CharacterWrapperResponse> GetCharacter(string name);
    }
}
