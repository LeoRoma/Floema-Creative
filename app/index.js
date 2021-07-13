import About from './pages/About/index';
import Collections from './pages/Collections/index';
import Detail from './pages/Detail/index';
import Home from './pages/Home/index';

class App {
  constructor() {
    this.createContent();
    this.createPages();
  }

  // get content and template from different pages
  createContent() {
    this.content = document.querySelector('.content');
    this.template = this.content.getAttribute('data-template'); // this.content.dataset.template is the equivalent but not supported for Safari
  }

  createPages() {
    this.pages = {
      about: new About(),
      collections: new Collections(),
      detail: new Detail(),
      home: new Home()
    }

    // create a routing with AJAX and gives single page app behaviour
    this.page = this.pages[this.template];
    this.page.create();
    this.page.show();
    this.page.hide();

    console.log(this.page);
  }
}

new App();