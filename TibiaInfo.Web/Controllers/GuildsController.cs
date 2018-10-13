using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TibiaInfo.Web.Interfaces.TibiaDataApi;
using TibiaInfo.Web.Models;
using TibiaInfo.Web.Models.DTO;

namespace TibiaInfo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuildsController : ControllerBase
    {
        private readonly IGuildService _guildService;
        private readonly IMapper _mapper;

        public GuildsController(IGuildService guildService, IMapper mapper)
        {
            _guildService = guildService;
            _mapper = mapper;
        }

        [HttpGet("all/{world}")]
        public async Task<IActionResult> GetAllGuilds(string world)
        {
            var response = new Response<AllGuildsDTO>
            {
                Succeed = false
            };

            if (string.IsNullOrEmpty(world))
            {
                response.Message = "The world name must be provided";
                return BadRequest(response);
            }

            try
            {
                var r = await _guildService.GetAllGuillds(world);
                response.Result = _mapper.Map<AllGuildsDTO>(r.Response);
                response.Succeed = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
            return Ok(response);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetGuild(string name)
        {
            var response = new Response<GuildDTO>
            {
                Succeed = false
            };

            if (string.IsNullOrEmpty(name))
            {
                response.Message = "The guild name must be provided";
                return BadRequest(response);
            }

            try
            {
                var r = await _guildService.GetGuild(name);
                if (!string.IsNullOrEmpty(r.Response.Error))
                {
                    response.Message = r.Response.Error;
                }
                else
                {
                    response.Result = _mapper.Map<GuildDTO>(r.Response);
                    response.Succeed = true;
                }
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
