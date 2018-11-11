using Newtonsoft.Json;

namespace TibiaInfo.Web.Models.TibiaDataApi.Characters
{
    public class DeathInvolved
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
    }
}
