import GSAP from 'gsap';

import Component from '../classes/Component';

import { COLOR_QUARTER_SPANISH_WHITE, COLOR_BRIGHT_GRAY } from '../utils/colors';

export default class Navigation extends Component {
  constructor({ template }) {
    super({
      element: '.navigation',
      elements: {
        items: '.navigation__list__item',
        links: '.navigation__list__link'
      }
    });

    this.onChange(template);
  }

  onChange(template) {
    if(template === 'about'){
      GSAP.to(this.element, {
        color: COLOR_BRIGHT_GRAY,
        duration: 1.5
      })

      GSAP.to(this.elements.items[0], {
        autoAlpha: 1
      })

      GSAP.to(this.elements.items[1], {
        autoAlpha: 0
      })
    }else{
      GSAP.to(this.element, {
        color: COLOR_QUARTER_SPANISH_WHITE,
        duration: 1.5
      })

      GSAP.to(this.elements.items[0], {
        autoAlpha: 0
      })

      GSAP.to(this.elements.items[1], {
        autoAlpha: 1
      })
    }
   
  }
}