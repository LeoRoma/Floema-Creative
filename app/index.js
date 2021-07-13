import About from './pages/About';
import Collections from './pages/Collections';
import Detail from './pages/Collections';
import Home from './pages/Home';

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