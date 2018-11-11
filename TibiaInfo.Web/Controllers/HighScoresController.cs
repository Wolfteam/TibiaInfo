using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using TibiaInfo.Web.Enums;
using TibiaInfo.Web.Helpers;
using TibiaInfo.Web.Interfaces.TibiaDataApi;
using TibiaInfo.Web.Models;
using TibiaInfo.Web.Models.DTO.HighScores;

namespace TibiaInfo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HighScoresController : ControllerBase
    {
        private readonly IHighScoresService _highScoresService;
        private readonly IMapper _mapper;

        public HighScoresController(IHighScoresService highScoresService, IMapper mapper)
        {
            _highScoresService = highScoresService ?? throw new ArgumentNullException(nameof(highScoresService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet("{world}")]
        public async Task<ActionResult> GetHighscores(string world)
        {
            return await GetHighscores(world, HighScoreType.EXPERIENCE, VocationType.ALL);
        }

        [HttpGet("{world}/{type}")]
        public async Task<ActionResult> GetHighscores(string world, HighScoreType type)
        {
            return await GetHighscores(world, type, VocationType.ALL);
        }


        [HttpGet("{world}/{type}/{vocation}")]
        public async Task<ActionResult> GetHighscores(string world, HighScoreType type, VocationType vocation)
        {
            var response = new Response<AllHighScoresDTO>
            {
                Succeed = false
            };

            if (string.IsNullOrEmpty(world))
            {
                response.Message = "The world name must be provided";
                return BadRequest(response);
            }
            var forbiddenVocations = new VocationType[]
            {
                VocationType.ELDER_DRUID,
                VocationType.MASTER_SORCERER,
                VocationType.ELITE_KNIGHT,
                VocationType.ROYAL_PALADIN
            };

            if (forbiddenVocations.Contains(vocation))
            {
                response.Message = "The provided vocation type is not valid";
                return BadRequest(response);
            }

            try
            {
                var r = await _highScoresService.GetAllHighScores(
                    world,
                    type.GetHighScore(),
                    vocation.GetVocation().ToLowerInvariant());
                response.Result = _mapper.Map<AllHighScoresDTO>(r.Response);
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
