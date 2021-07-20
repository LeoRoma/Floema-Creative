import Component from '../classes/Component';

export default class Navigation extends Component{
  constructor({template}){
    super({
      element: '.navigation',
      elements: {
        items: '.navigation__list__item',
        links: '.navigation__list__link'
      }
    });

    this.onChange(template);
  }

  onChange(template){
    console.log(template)
  }
}