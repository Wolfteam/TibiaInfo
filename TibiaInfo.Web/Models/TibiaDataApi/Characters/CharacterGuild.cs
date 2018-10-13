using Newtonsoft.Json;

namespace TibiaInfo.Web.Models.TibiaDataApi.Character
{
    public class CharacterGuild
    {
        [JsonProperty(PropertyName = "name")]
        public string GuildName { get; set; }

        [JsonProperty(PropertyName = "rank")]
        public string GuildRank { get; set; }
    }
}
