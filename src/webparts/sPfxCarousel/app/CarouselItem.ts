import { ICarouselItem } from './ICarouselItem';

export default class CarouselItem implements ICarouselItem {
  itemId: number;
  title: string;
  description: string;
  url: string;
}
