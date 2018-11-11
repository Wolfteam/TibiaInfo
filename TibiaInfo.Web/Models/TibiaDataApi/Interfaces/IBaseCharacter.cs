namespace TibiaInfo.Web.Models.TibiaDataApi.Interfaces
{
    public interface IBaseCharacter
    {
        string Name { get; set; }

        string Vocation { get; set; }

        int Level { get; set; }
    }
}
