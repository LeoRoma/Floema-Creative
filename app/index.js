import About from './pages/About/index.js';
import Collections from './pages/Collections/index';
import Detail from './pages/Collections/index';
import Home from './pages/Home/index';

class App{
  constructor(){
    console.log('app');
  }

  createPages () {
    this.pages = {
      about: new About(),
      collections: new Collections(),
      detail: new Detail(),
      home: new Home()
    }
  }
}

new App();