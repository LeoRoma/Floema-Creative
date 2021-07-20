import Component from '../classes/Component';

export default class Navigation extends Component{
  constructor(){
    super({
      element: '.naviation',
      elements: {
        items: '.navigation__list__item',
        links: '.navigation__list__link'
      }
    })
  }

  onChange(){
    
  }
}