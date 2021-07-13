import each from 'lodash/each';

import Component from '../classes/Component';

export default class Preloader extends Component{
  constructor(){
    super({
      element: '.preloader',
      elements: {
        title: '.preloader__text',
        number: '.preloader__number',
        images: document.querySelectorAll('img')
      }
    })

    this.length = 0;

    console.log(this.element, this.elements)

    this.createLoader();
  }

  createLoader(){
    each(this.elements.images, element => {
      const image = new Image();

      image.onload = () => this.onAssetLoaded(image);

      image.src = element.getAttribute('data-src');
    })
  }

  onAssetLoaded(image){
    this.length += 1;

    const percentage = this.length / this.elements.images.length;
    console.log(Math.round(this.length / this.elements.images.length * 100));

    this.elements.number.innerHTML = `${Math.round(percentage * 100)}%`;

    if(percentage === 1){
      // this.onLoaded();
    }
  }

  onLoaded(){

  }
}
