import Page from '../../classes/Page';

export default class Home extends Page{
  constructor() {
    super({
      id: 'home',

      element: '.home'
    })
  }
}