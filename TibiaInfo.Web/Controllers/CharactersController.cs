using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TibiaInfo.Web.Interfaces.TibiaDataApi;
using TibiaInfo.Web.Models;
using TibiaInfo.Web.Models.DTO;
using TibiaInfo.Web.Models.DTO.Characters;
using TibiaInfo.Web.Models.TibiaDataApi.Character;

namespace TibiaInfo.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharactersController : ControllerBase
    {
        private readonly ICharacterService _characterService;
        private readonly IMapper _mapper;

        public CharactersController(ICharacterService characterService, IMapper mapper)
        {
            _characterService = characterService;
            _mapper = mapper;
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetCharacter(string name)
        {
            var response = new Response<CharacterDTO>
            {
                Succeed = false
            };

            if (string.IsNullOrEmpty(name))
            {
                response.Message = "The character name must be provided";
                return BadRequest(response);
            }

            try
            {
                var r = await _characterService.GetCharacter(name);
                if (!string.IsNullOrEmpty(r.Response.Character.Error) || !string.IsNullOrEmpty(r.Response.Error))
                    response.Message = r.Response.Character.Error ?? r.Response.Error;
                else
                {
                    response.Result = _mapper.Map<CharacterDTO>(r.Response);
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

        [HttpGet("all/{names}")]
        public async Task<IActionResult> GetCharacters(string names)
        {
            var response = new Response<List<SimpleCharacterDTO>>
            {
                Succeed = false,
                Result = new List<SimpleCharacterDTO>()
            };

            if (string.IsNullOrEmpty(names))
            {
                response.Message = "The character name must be provided";
                return BadRequest(response);
            }

            try
            {
                var tasks = new List<Task<CharacterWrapperResponse>>();
                foreach (string name in names.Split(','))
                {
                    tasks.Add(_characterService.GetCharacter(name));
                }

                var characters = (await Task.WhenAll(tasks)).ToList();
                if (characters.Any(c => !string.IsNullOrEmpty(c?.Response?.Character?.Error)))
                {
                    response.Message = characters.First(c => !string.IsNullOrEmpty(c?.Response?.Character?.Error)).Response.Character.Error;
                    return Ok(response);
                }
                else
                {
                    characters.RemoveAll(r => !string.IsNullOrEmpty(r?.Response?.Error));
                    response.Result = _mapper.Map<List<SimpleCharacterDTO>>(characters.Select(c => c.Response));
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
