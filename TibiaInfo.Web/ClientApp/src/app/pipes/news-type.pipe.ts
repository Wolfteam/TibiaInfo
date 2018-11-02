import { Pipe, PipeTransform } from '@angular/core';
import { NewsType } from '../enums/news-type.enum';

@Pipe({
  name: 'newsType'
})
export class NewsTypePipe implements PipeTransform {

  transform(value: NewsType): any {
    switch (value) {
      case NewsType.FEATURED_ARTICLE:
        return 'Featured Article';
      case NewsType.LATEST_NEWS:
        return 'Lastest News';
      case NewsType.NEWS_TICKER:
        return 'News Ticker';
      default:
        throw new Error('The provided news type enum value does not exists');
    }
  }

}
