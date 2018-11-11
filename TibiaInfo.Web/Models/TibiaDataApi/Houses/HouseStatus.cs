using Newtonsoft.Json;
using TibiaInfo.Web.Converters;
using TibiaInfo.Web.Models.TibiaDataApi.Base;

namespace TibiaInfo.Web.Models.TibiaDataApi.Houses
{
    public class HouseStatus
    {
        [JsonProperty(PropertyName = "occupied")]
        public bool IsOccupied { get; set; }

        [JsonProperty(PropertyName = "auction")]
        public bool IsAuctioned { get; set; }

        [JsonProperty(PropertyName = "owner_now")]
        public string CurrentOwner { get; set; }

        [JsonProperty(PropertyName = "owner_new")]
        public string NewOwner { get; set; }

        [JsonProperty(PropertyName = "current_bid")]
        [JsonConverter(typeof(BooleanOrIntConverter))]
        public int CurrentBid { get; set; }

        [JsonProperty(PropertyName = "auction_end")]
        public BaseCreatedInformation AuctionEndsOn { get; set; }

        [JsonProperty(PropertyName = "paid_until")]
        public BaseCreatedInformation PaidUntil { get; set; }

        [JsonProperty(PropertyName = "moving_date")]
        public BaseCreatedInformation MovingOn { get; set; }

        [JsonProperty(PropertyName = "transfer_accept")]
        public bool IsTransferAccepted { get; set; }

        [JsonProperty(PropertyName = "transfer_bid")]
        public int? TransferBid { get; set; }

        [JsonProperty(PropertyName = "original")]
        public string Description { get; set; }
    }
}
