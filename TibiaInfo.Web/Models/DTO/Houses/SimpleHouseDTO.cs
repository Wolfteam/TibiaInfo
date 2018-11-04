using TibiaInfo.Web.Enums;

namespace TibiaInfo.Web.Models.DTO.Houses
{
    public class SimpleHouseDTO
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public int Size { get; set; }

        public int Rent { get; set; }

        public HouseStatusType Status
        {
            get
            {
                string text = StatusText.ToLower();
                return text.Contains("gold") ? HouseStatusType.AUCTIONED_BID :
                    text.Contains("rented") ? HouseStatusType.RENTED :
                    HouseStatusType.AUCTIONED_NO_BID;
            }
        }

        public string StatusText { get; set; }

        public int? Bid
        {
            get
            {
                string text = StatusText.ToLower();
                if (!text.Contains("gold"))
                    return null;
                string gold = text
                    .Substring(text.IndexOf('(') + 1, text.IndexOf(';') - text.IndexOf('(') - 1)
                    .Replace("gold", "")
                    .Trim();
                return int.Parse(gold);
            }
        }

        public uint? MinutesUntilAuctionEnds
        {
            get
            {
                string text = StatusText.ToLower();
                if (!text.Contains("day") && !text.Contains("hour"))
                    return null;

                bool isDays = text.Contains("day");
                string x = text
                    .Substring(text.IndexOf(';') + 1, text.IndexOf(')') - text.IndexOf(';') - 1)
                    .Trim()
                    .Split(' ')[0]
                    .Trim();
                return isDays ? uint.Parse(x) * 24 * 60 : uint.Parse(x) * 60;
            }
        }
    }
}
