using Newtonsoft.Json;
using System.Collections.Generic;
using TibiaInfo.Web.Converters;
using TibiaInfo.Web.Models.TibiaDataApi.Characters;

namespace TibiaInfo.Web.Models.TibiaDataApi.Character
{
    public class CharacterResponse
    {
        [JsonProperty(PropertyName = "data")]
        public Character Character { get; set; }

        [JsonProperty(PropertyName = "achievements")]
        public List<Achievement> Achievements { get; set; }

        [JsonProperty(PropertyName = "deaths")]
        public List<Death> Deaths { get; set; }

        [JsonProperty(PropertyName = "account_information")]
        [JsonConverter(typeof(SingleOrArrayConverter<AccountInformation>))]
        public List<AccountInformation> AccountInformation { get; set; }

        [JsonProperty(PropertyName = "other_characters")]
        public List<OtherCharacter> OtherCharacters { get; set; }

        [JsonProperty(PropertyName = "error")]
        public string Error { get; set; }
    }
}
