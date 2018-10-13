using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TibiaInfo.Web.Enums;
using TibiaInfo.Web.Interfaces.TibiaDataApi;
using TibiaInfo.Web.Models;
using TibiaInfo.Web.Models.DTO.News;

namespace TibiaInfo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;
        private readonly IMapper _mapper;

        public NewsController(INewsService newsService, IMapper mapper)
        {
            _newsService = newsService ?? throw new ArgumentNullException(nameof(newsService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet("all/{newsType}")]
        public async Task<ActionResult> GetAllNews(NewsType newsType)
        {
            var response = new Response<AllNewsDTO>
            {
                Succeed = false
            };

            try
            {
                switch (newsType)
                {
                    case NewsType.NEWS_TICKER:
                        var r1 = await _newsService.GetNewsTickers();
                        response.Result = _mapper.Map<AllNewsDTO>(r1.Response);
                        break;
                    case NewsType.FEATURED_ARTICLE:
                    case NewsType.LATEST_NEWS:
                        var r2 = await _newsService.GetLatestNews();
                        response.Result = _mapper.Map<AllNewsDTO>(r2.Response);
                        break;
                    default:
                        throw new ArgumentOutOfRangeException(nameof(newsType), newsType, "The provided news type is not valid");
                }
                response.Succeed = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
            return Ok(response);
        }

        [HttpGet("{newsID}")]
        public async Task<ActionResult> GetNews(string newsID)
        {
            var response = new Response<NewsDTO>
            {
                Succeed = false
            };

            if (string.IsNullOrEmpty(newsID))
            {
                response.Message = "The news id must be provided";
                return BadRequest(response);
            }

            try
            {
                var r = await _newsService.GetNews(newsID);
                response.Result = _mapper.Map<NewsDTO>(r.Response);
                response.Succeed = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
            return Ok(response);
        }
    }
}