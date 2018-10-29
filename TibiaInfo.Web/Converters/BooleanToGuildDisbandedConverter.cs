using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using TibiaInfo.Web.Models.TibiaDataApi.Guilds;

namespace TibiaInfo.Web.Converters
{
    public class BooleanToGuildDisbandedConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(bool) || objectType == typeof(object);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            JToken token = JToken.Load(reader);
            if (token.Type == JTokenType.Object)
            {
                return token.ToObject<GuildDisbanded>();
            }
            return null;
        }

        public override bool CanWrite
        {
            get { return false; }
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }
    }
}
