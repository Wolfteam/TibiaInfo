namespace TibiaInfo.Web.Models.DTO.Houses
{
    public class HouseStatusDTO
    {
        public bool IsOccupied { get; set; }

        public bool IsAuctioned { get; set; }

        public string CurrentOwner { get; set; }

        public string NewOwner { get; set; }

        public int CurrentBid { get; set; }

        public CreatedInformationDTO AuctionEndsOn { get; set; }

        public CreatedInformationDTO PaidUntil { get; set; }

        public CreatedInformationDTO MovingOn { get; set; }

        public bool IsTransferAccepted { get; set; }

        public int TransferBid { get; set; }

        public string Description { get; set; }
    }
}
