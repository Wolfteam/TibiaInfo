namespace TibiaInfo.Web.Models.TibiaDataApi.Interfaces
{
    public interface IBaseResponse<T>
    {
        T Response { get; set; }
    }
}
