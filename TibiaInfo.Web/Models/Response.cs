namespace TibiaInfo.Web.Models
{
    public class Response<T>
    {
        public T Result { get; set; }
        public bool Succeed { get; set; }
        public string Message { get; set; }
    }
}
