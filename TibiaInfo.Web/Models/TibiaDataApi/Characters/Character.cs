using Newtonsoft.Json;
using System.Collections.Generic;
using TibiaInfo.Web.Converters;
using TibiaInfo.Web.Models.TibiaDataApi.Base;
using TibiaInfo.Web.Models.TibiaDataApi.Interfaces;

namespace TibiaInfo.Web.Models.TibiaDataApi.Character
{
    public class Character : IBaseCharacter
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "vocation")]
        public string Vocation { get; set; }

        [JsonProperty(PropertyName = "level")]
        public int Level { get; set; }

        [JsonProperty(PropertyName = "sex")]
        public string Sex { get; set; }

        [JsonProperty(PropertyName = "achievement_points")]
        public int AchievementPoints { get; set; }

        [JsonProperty(PropertyName = "world")]
        public string World { get; set; }

        [JsonProperty(PropertyName = "residence")]
        public string Residence { get; set; }

        [JsonProperty(PropertyName = "married_to")]
        public string MarriedTo { get; set; }

        [JsonProperty(PropertyName = "status")]
        public string Status { get; set; }

        [JsonProperty(PropertyName = "comment")]
        public string Comment { get; set; }

        [JsonProperty(PropertyName = "account_status")]
        public string AccountStatus { get; set; }

        [JsonProperty(PropertyName = "error")]
        public string Error { get; set; }


        [JsonProperty(PropertyName = "last_login")]
        [JsonConverter(typeof(SingleOrArrayConverter<BaseCreatedInformation>))]
        public List<BaseCreatedInformation> LastLogin { get; set; }

        [JsonProperty(PropertyName = "house")]
        public CharacterHouse House { get; set; }

        [JsonProperty(PropertyName = "guild")]
        public CharacterGuild Guild { get; set; }
    }
}
