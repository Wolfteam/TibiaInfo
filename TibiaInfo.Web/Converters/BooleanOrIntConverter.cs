using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;

namespace TibiaInfo.Web.Converters
{
    public class BooleanOrIntConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(int) || objectType == typeof(int);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            JToken token = JToken.Load(reader);
            if (token.Type == JTokenType.Integer)
            {
                return token.ToObject<int>();
            }
            bool value = token.ToObject<bool>();
            return value ? 1 : 0;
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
