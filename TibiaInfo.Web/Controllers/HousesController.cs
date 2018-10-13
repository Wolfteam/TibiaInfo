using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TibiaInfo.Web.Enums;
using TibiaInfo.Web.Helpers;
using TibiaInfo.Web.Interfaces.TibiaDataApi;
using TibiaInfo.Web.Models;
using TibiaInfo.Web.Models.DTO.Houses;

namespace TibiaInfo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HousesController : ControllerBase
    {
        private readonly IHouseService _houseService;
        private readonly IMapper _mapper;

        public HousesController(IHouseService houseService, IMapper mapper)
        {
            _houseService = houseService ?? throw new ArgumentNullException(nameof(houseService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet("all/{world}")]
        public async Task<IActionResult> GetAllHouses(string world)
        {
            return await GetAllHouses(world, TownType.AB_DENDRIEL);
        }

        [HttpGet("all/{world}/{townType}")]
        public async Task<IActionResult> GetAllHouses(string world, TownType townType)
        {
            return await GetAllHouses(world, townType, HouseType.HOUSE);
        }

        [HttpGet("all/{world}/{townType}/{houseType}")]
        public async Task<IActionResult> GetAllHouses(string world, TownType townType, HouseType houseType)
        {
            var response = new Response<AllHousesDTO>
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
                var r = await _houseService.GetAllHouses(
                    world,
                    townType.GetTown(),
                    houseType.GetHouse());
                response.Result = _mapper.Map<AllHousesDTO>(r.Response);
                response.Succeed = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
            return Ok(response);
        }

        [HttpGet("{world}/{houseID}")]
        public async Task<IActionResult> GetAllHouses(string world, string houseID)
        {
            var response = new Response<HouseDTO>
            {
                Succeed = false
            };

            if (string.IsNullOrEmpty(world))
            {
                response.Message = "The world name must be provided";
                return BadRequest(response);
            }

            if (string.IsNullOrEmpty(houseID))
            {
                response.Message = "The house id must be provided";
                return BadRequest(response);
            }

            try
            {
                var r = await _houseService.GetHouse(world, houseID);
                response.Result = _mapper.Map<HouseDTO>(r.Response);
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