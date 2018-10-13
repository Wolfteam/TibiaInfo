using Newtonsoft.Json;

namespace TibiaInfo.Web.Models.TibiaDataApi.Guilds
{
    public class BaseGuild
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "desc")]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "guildLogo")]
        public string LogoUrl { get; set; }
    }
}
