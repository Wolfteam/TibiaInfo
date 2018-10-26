using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TibiaInfo.Web.Interfaces.TibiaDataApi;
using TibiaInfo.Web.Models;
using TibiaInfo.Web.Models.DTO.Worlds;

namespace TibiaInfo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorldsController : ControllerBase
    {
        private readonly IWorldService _worldService;
        private readonly IMapper _mapper;

        public WorldsController(IWorldService worldService, IMapper mapper)
        {
            _worldService = worldService ?? throw new ArgumentNullException(nameof(worldService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllWorlds()
        {
            var response = new Response<AllWorldsDTO>
            {
                Succeed = false
            };

            try
            {
                var r = await _worldService.GetAllWorlds();
                response.Result = _mapper.Map<AllWorldsDTO>(r.Response);
                response.Succeed = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
            return Ok(response);
        }

        [HttpGet("{world}")]
        public async Task<IActionResult> GetWorld(string world)
        {
            var response = new Response<WorldDTO>
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
                var r = await _worldService.GetWorld(world);
                response.Result = _mapper.Map<WorldDTO>(r.Response);
                response.Succeed = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
            return Ok(response);
        }

        [HttpGet("totalNumberOfPlayersOnline")]
        public async Task<IActionResult> GetTotalNumberOfPlayersOnline()
        {
            var response = new Response<int>
            {
                Succeed = false
            };
            try
            {
                var r = await _worldService.GetAllWorlds();
                response.Result = r.Response.TotalPlayersOnline;
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