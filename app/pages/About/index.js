import Page from '../../classes/Page';

export default class About extends Page{
  constructor(){
    super({
      id: 'about'
    })
    
    console.log('About');
  }
}