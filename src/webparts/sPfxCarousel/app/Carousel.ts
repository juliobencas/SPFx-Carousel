import CarouselItem from './CarouselItem';
import * as $ from 'jquery';

export default class Carousel {
  carouselItems: Array<CarouselItem>;
  constructor() {
    this.carouselItems = new Array<CarouselItem>();
  }
  getData(listName: string, totalItems: number): any {
    const deferred:any = $.Deferred();
    // ajax call to get items
    let carouselItem: CarouselItem = new CarouselItem();
    carouselItem.itemId = 1;
    carouselItem.title = "Testing";
    carouselItem.description = "Testing Desc";
    carouselItem.url = ""
    this.carouselItems.push(carouselItem);
    deferred.resolve();

    return deferred.promise();
  }

  render(): void {
    $('.test').text('testing!');
  }
}