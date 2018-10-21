import { Pipe, PipeTransform } from '@angular/core';
import { WorldPvPType } from '../enums/world-pvp-type.enum';

@Pipe({
  name: 'worldPvp'
})
export class WorldPvpPipe implements PipeTransform {

  transform(value: WorldPvPType, isImagePath: boolean): any {
    switch (value) {
      case WorldPvPType.HARDCORE_PVP:
        return isImagePath ? './assets/images/world_hardcore_pvp.gif' : 'Hardcore PvP';
      case WorldPvPType.OPEN_PVP:
        return isImagePath ? './assets/images/world_open_pvp.gif' : 'Open PvP';
      case WorldPvPType.OPTIONAL_PVP:
        return isImagePath ? './assets/images/world_optional_pvp.gif' :'Optional PvP';
      case WorldPvPType.RETRO_HARDCORE_PVP:
        return isImagePath ? './assets/images/world_retro_hardcore_pvp.gif' :'Retro Hardcore PvP';
      case WorldPvPType.RETRO_OPEN_PVP:
        return isImagePath ? './assets/images/world_retro_open_pvp.gif' :'Retro Open PvP';
      default:
        throw new Error('The provided world pvp enum value does not exists');
    }
  }

}
