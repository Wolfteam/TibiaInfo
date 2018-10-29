using TibiaInfo.Web.Converters;
using Newtonsoft.Json;
using System;

namespace TibiaInfo.Web.Models.TibiaDataApi.Guilds
{
    public class Guild
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }

        [JsonProperty(PropertyName = "guildLogo")]
        public string LogoUrl { get; set; }

        [JsonProperty(PropertyName = "guildhall")]
        [JsonConverter(typeof(ArrayToSingleConverter<GuildHall>))]
        public GuildHall Guildhall { get; set; }

        [JsonProperty(PropertyName = "application")]
        public bool AcceptsApplication { get; set; }

        [JsonProperty(PropertyName = "war")]
        public bool IsInWar { get; set; }

        [JsonProperty(PropertyName = "online_status")]
        public int MembersOnline { get; set; }

        [JsonProperty(PropertyName = "offline_status")]
        public int MembersOffline { get; set; }

        [JsonProperty(PropertyName = "disbanded")]
        [JsonConverter(typeof(BooleanToGuildDisbandedConverter))]
        public GuildDisbanded Disbanded { get; set; }

        [JsonProperty(PropertyName = "totalmembers")]
        public int TotalMembers { get; set; }

        [JsonProperty(PropertyName = "totalinvited")]
        public int TotalInvited { get; set; }

        [JsonProperty(PropertyName = "world")]
        public string World { get; set; }

        [JsonProperty(PropertyName = "founded")]
        public DateTime FoundedOn { get; set; }

        [JsonProperty(PropertyName = "active")]
        public bool IsActive { get; set; }

        [JsonProperty(PropertyName = "homepage")]
        public string HomePageUrl { get; set; }
    }
}
