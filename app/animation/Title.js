import GSAP from 'gsap';
import { calculate, split } from '../utils/text';

import Animation from '../classes/Animation';

export default class Title extends Animation{
  constructor({element, elements}){
    super({
      element,
      elements
    });

    split({element: this.element, append: true});
    split({element: this.element, append: true});

    this.elementLinesSpans = this.element.querySelectorAll('span span');
    console.log(this.elementLinesSpans);
  }

  animateIn(){
    GSAP.set(this.element, {
      autoAlpha: 1
    })
    GSAP.fromTo(this.elementsLines, {
      y: '100%'
    },{
      delay: 0.5,
      duration: 1.5,
      stagger: 0.1,
      y: '0%'
    })
  }

  animateOut(){
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }

  onResize(){
    this.elementsLines = calculate(this.elementLinesSpans);
  }
}