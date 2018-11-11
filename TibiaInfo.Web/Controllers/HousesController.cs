using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<IActionResult> GetAllHouses(string world, [FromQuery] int status = -1, [FromQuery] string orderBy = "", [FromQuery] int sortDirection = 0)
        {
            return await GetAllHouses(world, TownType.AB_DENDRIEL, status, orderBy, sortDirection);
        }

        [HttpGet("all/{world}/{townType}")]
        public async Task<IActionResult> GetAllHouses(string world, TownType townType, [FromQuery] int status = -1, [FromQuery] string orderBy = "", [FromQuery] int sortDirection = 0)
        {
            return await GetAllHouses(world, townType, HouseType.HOUSE, status, orderBy, sortDirection);
        }

        [HttpGet("all/{world}/{townType}/{houseType}")]
        public async Task<IActionResult> GetAllHouses(string world, TownType townType, HouseType houseType, [FromQuery] int status = -1, [FromQuery] string orderBy = "", [FromQuery] int sortDirection = 0)
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
                IEnumerable<SimpleHouseDTO> filteredHouses = response.Result.Houses;

                if (status == (int)HouseStatusType.AUCTIONED_BID)
                    filteredHouses = filteredHouses
                        .Where(h => h.Status == HouseStatusType.AUCTIONED_BID);
                else if (status == (int)HouseStatusType.AUCTIONED_NO_BID)
                    filteredHouses = filteredHouses
                        .Where(h => h.Status == HouseStatusType.AUCTIONED_NO_BID);
                else if (status == (int)HouseStatusType.RENTED)
                    filteredHouses = filteredHouses
                        .Where(h => h.Status == HouseStatusType.RENTED);

                switch (orderBy.ToLower())
                {
                    case "size":
                        if (sortDirection == 0)
                            filteredHouses = filteredHouses.OrderBy(h => h.Size);
                        else
                            filteredHouses = filteredHouses.OrderByDescending(h => h.Size);
                        break;
                    case "rent":
                        if (sortDirection == 0)
                            filteredHouses = filteredHouses.OrderBy(h => h.Rent);
                        else
                            filteredHouses = filteredHouses.OrderByDescending(h => h.Rent);
                        break;
                    case "bid":
                        if (sortDirection == 0)
                            filteredHouses = filteredHouses
                                .OrderBy(h => h.Bid.HasValue)
                                .ThenBy(h => h.Bid);
                        else
                            filteredHouses = filteredHouses
                                .OrderByDescending(h => h.Bid.HasValue)
                                .ThenBy(h => h.Bid);
                        break;
                    case "auction_end":
                        if (sortDirection == 0)
                            filteredHouses = filteredHouses
                                .OrderBy(h => h.MinutesUntilAuctionEnds.HasValue)
                                .ThenBy(h => h.MinutesUntilAuctionEnds);
                        else
                            filteredHouses = filteredHouses
                                .OrderByDescending(h => h.MinutesUntilAuctionEnds.HasValue)
                                .ThenBy(h => h.MinutesUntilAuctionEnds);
                        break;
                    default:
                        if (sortDirection == 0)
                            filteredHouses = filteredHouses.OrderBy(h => h.Name);
                        else
                            filteredHouses = filteredHouses.OrderByDescending(h => h.Name);
                        break;
                }
                response.Result.Houses = filteredHouses.ToList();
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