using AutoMapper;
using System;
using System.Linq;
using TibiaInfo.Web.Models.DTO;
using TibiaInfo.Web.Models.DTO.Characters;
using TibiaInfo.Web.Models.DTO.HighScores;
using TibiaInfo.Web.Models.DTO.Houses;
using TibiaInfo.Web.Models.DTO.News;
using TibiaInfo.Web.Models.DTO.Shared;
using TibiaInfo.Web.Models.DTO.Worlds;
using TibiaInfo.Web.Models.TibiaDataApi.Base;
using TibiaInfo.Web.Models.TibiaDataApi.Character;
using TibiaInfo.Web.Models.TibiaDataApi.Characters;
using TibiaInfo.Web.Models.TibiaDataApi.Guilds;
using TibiaInfo.Web.Models.TibiaDataApi.HighScores;
using TibiaInfo.Web.Models.TibiaDataApi.Houses;
using TibiaInfo.Web.Models.TibiaDataApi.News;
using TibiaInfo.Web.Models.TibiaDataApi.Worlds;

namespace TibiaInfo.Web.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<BaseCreatedInformation, CreatedInformationDTO>();

            #region Character related
            CreateMap<CharacterResponse, SimpleCharacterDTO>()
                .ForMember(d => d.Level, opt => opt.MapFrom(s => s.Character.Level))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Character.Name))
                .ForMember(d => d.Residence, opt => opt.MapFrom(s => s.Character.Residence))
                .ForMember(d => d.Sex, opt => opt.MapFrom(s => s.Character.Sex.GetSexType()))
                .ForMember(d => d.Status, opt => opt.MapFrom(s => s.Character.Status.GetStatusType()))
                .ForMember(d => d.Vocation, opt => opt.MapFrom(s => s.Character.Vocation.GetVocationType()))
                .ForMember(d => d.World, opt => opt.MapFrom(s => s.Character.World));
            CreateMap<DeathInvolved, DeathInvolvedDTO>();
            CreateMap<Death, CharacterDeathDTO>();
            CreateMap<AccountInformation, AccountInformationDTO>();
            CreateMap<Achievement, AchievementDTO>();
            CreateMap<CharacterHouse, CharacterHouseDTO>()
                .ForMember(d => d.Town, opt => opt.MapFrom(s => s.Town.GetTownType()));
            CreateMap<Guid, GuildMemberDTO>();
            CreateMap<OtherCharacter, BaseCharacterBDTO>();
            CreateMap<CharacterResponse, CharacterDTO>()
                .ForMember(d => d.AccountInformation, opt => opt.MapFrom(s => s.AccountInformation.FirstOrDefault()))
                .ForMember(d => d.Achievements, opt => opt.MapFrom(s => s.Achievements))
                .ForMember(d => d.AchievementPoints, opt => opt.ResolveUsing(s => s.Character?.AchievementPoints ?? 0))
                .ForMember(d => d.Guild, opt => opt.ResolveUsing(s => s.Character?.Guild ?? null))
                .ForMember(d => d.House, opt => opt.ResolveUsing(s => s.Character?.House ?? null))
                .ForMember(d => d.LastLogin, opt => opt.ResolveUsing(s => s.Character?.LastLogin.FirstOrDefault()))
                .ForMember(d => d.Level, opt => opt.ResolveUsing(s => s.Character?.Level ?? null))
                .ForMember(d => d.MarriedTo, opt => opt.ResolveUsing(s => s.Character?.MarriedTo ?? null))
                .ForMember(d => d.Name, opt => opt.ResolveUsing(s => s.Character?.Name ?? null))
                .ForMember(d => d.OtherCharacters, opt => opt.MapFrom(s => s.OtherCharacters))
                .ForMember(d => d.Residence, opt => opt.ResolveUsing(s => s.Character?.Residence ?? null))
                .ForMember(d => d.Status, opt => opt.ResolveUsing(s => s.Character?.Status.GetStatusType() ?? null))
                .ForMember(d => d.Sex, opt => opt.ResolveUsing(s => s.Character?.Sex.GetSexType() ?? null))
                .ForMember(d => d.Vocation, opt => opt.ResolveUsing(s => s.Character?.Vocation.GetVocationType() ?? null))
                .ForMember(d => d.World, opt => opt.ResolveUsing(s => s.Character?.World ?? null));

            #endregion

            #region Guilds related
            CreateMap<BaseGuild, BaseGuildDTO>();
            CreateMap<GuildsResponse, AllGuildsDTO>();

            CreateMap<GuildCharacterMember, GuildCharacterMemberDTO>()
                .ForMember(d => d.JoinedOn, opt => opt.MapFrom(s => s.JoinedOn))
                .ForMember(d => d.Level, opt => opt.MapFrom(s => s.Level))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.Nick, opt => opt.MapFrom(s => s.Nick))
                .ForMember(d => d.Status, opt => opt.MapFrom(s => s.Status.GetStatusType()))
                .ForMember(d => d.Vocation, opt => opt.MapFrom(s => s.Vocation.GetVocationType()));
            CreateMap<GuildRankMember, GuildRankMemberDTO>();
            CreateMap<GuildHall, CharacterHouseDTO>();
            CreateMap<GuildResponse, GuildDTO>()
                .ForMember(d => d.AcceptsApplication, opt => opt.MapFrom(s => s.Guild.AcceptsApplication))
                .ForMember(d => d.Description, opt => opt.MapFrom(s => s.Guild.Description))
                .ForMember(d => d.FoundedOn, opt => opt.MapFrom(s => s.Guild.FoundedOn))
                .ForMember(d => d.Guildhall, opt => opt.MapFrom(s => s.Guild.Guildhall))
                .ForMember(d => d.HomePageUrl, opt => opt.MapFrom(s => s.Guild.HomePageUrl))
                .ForMember(d => d.Invited, opt => opt.MapFrom(s => s.Invited))
                .ForMember(d => d.IsActive, opt => opt.MapFrom(s => s.Guild.IsActive))
                .ForMember(d => d.IsDisbanded, opt => opt.MapFrom(s => s.Guild.IsDisbanded))
                .ForMember(d => d.IsInWar, opt => opt.MapFrom(s => s.Guild.IsInWar))
                .ForMember(d => d.LogoUrl, opt => opt.MapFrom(s => s.Guild.LogoUrl))
                .ForMember(d => d.Ranks, opt => opt.MapFrom(s => s.Ranks))
                .ForMember(d => d.MembersOffline, opt => opt.MapFrom(s => s.Guild.MembersOffline))
                .ForMember(d => d.MembersOnline, opt => opt.MapFrom(s => s.Guild.MembersOnline))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Guild.Name))
                .ForMember(d => d.TotalInvited, opt => opt.MapFrom(s => s.Guild.TotalInvited))
                .ForMember(d => d.TotalMembers, opt => opt.MapFrom(s => s.Guild.TotalMembers))
                .ForMember(d => d.World, opt => opt.MapFrom(s => s.Guild.World));

            #endregion

            #region Highscores related
            CreateMap<HighScore, HighScoreDTO>()
                .ForMember(d => d.Vocation, opt => opt.ResolveUsing(s => s.Vocation?.GetVocationType() ?? null));

            CreateMap<HighScoreResponse, AllHighScoresDTO>()
                .ForMember(d => d.HighScoreType, opt => opt.ResolveUsing(s => s.HighScoreType?.GetHighScoreType() ?? null));
            #endregion

            #region News related
            CreateMap<News, NewsDTO>();
            CreateMap<SimpleNews, SimpleNewsDTO>()
                .ForMember(d => d.Type, opt => opt.ResolveUsing(s => s.Type?.GetNewsType() ?? null));
            CreateMap<AllNewsResponse, AllNewsDTO>()
                .ForMember(d => d.Type, opt => opt.ResolveUsing(s => s.Type?.GetNewsType() ?? null));
            #endregion

            #region House related
            CreateMap<SimpleHouse, SimpleHouseDTO>();
            CreateMap<AllHousesResponse, AllHousesDTO>()
                .ForMember(d => d.Town, opt => opt.MapFrom(s => s.Town.GetTownType()))
                .ForMember(d => d.Type, opt => opt.MapFrom(s => s.Type.GetHouseType()));

            CreateMap<HouseStatus, HouseStatusDTO>();
            CreateMap<HouseResponse, HouseDTO>()
                .ForMember(d => d.Type, opt => opt.MapFrom(s => s.Type.GetHouseType()));
            #endregion

            #region Worlds related
            CreateMap<WorldPlayer, BaseCharacterADTO>()
                .ForMember(d => d.Vocation, opt => opt.MapFrom(s => s.Vocation.GetVocationType()));

            CreateMap<OnlineRecord, OnlineRecordDTO>();
            CreateMap<SimpleWorld, SimpleWorldDTO>()
                .ForMember(d => d.Location, opt => opt.MapFrom(s => s.Location.GetWorldLocationType()))
                .ForMember(d => d.PvpType, opt => opt.MapFrom(s => s.PvPType.GetWorldPvPType()));
            CreateMap<AllWorldsResponse, AllWorldsDTO>();

            CreateMap<WorldResponse, WorldDTO>()
                .ForMember(d => d.BattleEyeStatus, opt => opt.MapFrom(s => s.World.BattleEyeStatus))
                .ForMember(d => d.CreationDate, opt => opt.MapFrom(s => s.World.CreationDate))
                .ForMember(d => d.GameWorldType, opt => opt.MapFrom(s => s.World.GameWorldType))
                .ForMember(d => d.Location, opt => opt.MapFrom(s => s.World.Location.GetWorldLocationType()))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.World.Name))
                .ForMember(d => d.NumberOfPlayersOnline, opt => opt.MapFrom(s => s.World.NumberOfPlayersOnline))
                .ForMember(d => d.OnlineRecord, opt => opt.MapFrom(s => s.World.OnlineRecord))
                .ForMember(d => d.PlayersOnline, opt => opt.MapFrom(s => s.PlayersOnline))
                .ForMember(d => d.PvpType, opt => opt.MapFrom(s => s.World.PvPType.GetWorldPvPType()))
                .ForMember(d => d.WorldQuestTitles, opt => opt.MapFrom(s => s.World.WorldQuestTitles));

            #endregion
        }
    }
}
