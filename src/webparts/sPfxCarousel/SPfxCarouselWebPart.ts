import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-client-preview';

import styles from './SPfxCarousel.module.scss';
import * as strings from 'sPfxCarouselStrings';
import { ISPfxCarouselWebPartProps } from './ISPfxCarouselWebPartProps';
import Carousel from './app/Carousel';
import ModuleLoader from '@microsoft/sp-module-loader';

export default class SPfxCarouselWebPart extends BaseClientSideWebPart<ISPfxCarouselWebPartProps> {
  $: any;
  public constructor(context: IWebPartContext) {
    super(context);
    ModuleLoader.loadCss('//cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.3/flexslider.min.css')
  }

  public render(): void {
    if (this.renderedOnce === false) {
      this.domElement.innerHTML = `
        <div class="test ${styles.sPfxCarousel}">
          <div class="${styles.container}">
            <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
              <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
                <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
                <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
                <p class="ms-font-l ms-fontColor-white">${this.properties.description}</p>
                <a href="https://github.com/SharePoint/sp-dev-docs/wiki" class="ms-Button ${styles.button}">
                  <span class="ms-Button-label">Learn more</span>
                </a>
              </div>
            </div>
          </div>
        </div>`;

    ModuleLoader.loadScript('https://code.jquery.com/jquery-3.1.0.min.js', '$').then(($: any): void => {
      this.$ = $;
      ModuleLoader.loadScript('https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.6.3/jquery.flexslider.min.js', 'jQuery').then((): void => {
        let carousel: Carousel = new Carousel();
        carousel.getData('test', 3).then(function(){
          carousel.render();
        });
      });
    });

    }
    else {
      let carousel: Carousel = new Carousel();
      carousel.getData('test', 3).then(function(){
        carousel.render();
      });
    }
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listname', {
                  label: "List Name"
                }),
                PropertyPaneDropdown('totalImages', {
                  label: 'Total Images',
                  options:  [
                    { key: 1, text: '1'},
                    { key: 2, text: '2'},
                    { key: 3, text: '3'}
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
