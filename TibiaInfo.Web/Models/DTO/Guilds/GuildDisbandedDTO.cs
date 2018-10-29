using System;

namespace TibiaInfo.Web.Models.DTO.Guilds
{
    public class GuildDisbandedDTO
    {
        public string Notification { get; set; }

        public DateTime DisbandedOn { get; set; }

        public string CompleteNotification
        {
            get
            {
                if (string.IsNullOrEmpty(Notification))
                    return string.Empty;

                string upper = Notification.Substring(0, Notification.IndexOf(','));
                string middle = DisbandedOn.ToString("MMMM dd yyyy");
                string lower = Notification.Substring(Notification.IndexOf(',') + 1).Trim();

                return $"{upper} on {middle}, {lower}";
            }
        }
    }
}
