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
    GSAP.to(this.element, {
      color: template === 'about' ? COLOR_BRIGHT_GRAY : COLOR_QUARTER_SPANISH_WHITE,
      duration: 1.5
    })
  }
}