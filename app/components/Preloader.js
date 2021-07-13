import GSAP from 'gsap';
import each from 'lodash/each';

import { split } from '../utils/text';

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

    this.elements.titleSpans = split({
      element: this.elements.title
    })

    this.length = 0;

    console.log(this.element, this.elements)

    this.createLoader();
  }

  createLoader(){
    each(this.elements.images, element => {
      element.onload = () => this.onAssetLoaded(element);
      element.src = element.getAttribute('data-src');
    })
  }

  onAssetLoaded(image){
    this.length += 1;

    const percentage = this.length / this.elements.images.length;
    console.log(Math.round(this.length / this.elements.images.length * 100));

    this.elements.number.innerHTML = `${Math.round(percentage * 100)}%`;

    if(percentage === 1){
      this.onLoaded();
    }
  }

  onLoaded(){
    return new Promise(resolve => {
      this.animateOut = GSAP.timeline({
        delay: 2
      });

      this.animateOut.to(this.element, {
        autoAlpha: 0
      })

      this.animateOut.call(() => {
        this.emit('completed');
      })
    })
  }

  destroy(){
    this.element.parentNode.removeChild(this.element);
  }

}
