import each from 'lodash/each';

import About from './pages/About/index';
import Collections from './pages/Collections/index';
import Detail from './pages/Detail/index';
import Home from './pages/Home/index';

class App {
  constructor() {
    this.createContent();
    this.createPages();
    this.addLinkListeners();
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
    // this.page.hide();
  }

  async onChange(url) {
    await this.page.hide();
    const request = await window.fetch(url);

    if (request.status === 200){
      const html = await request.text();
      const div = document.createElement('div');

      div.innerHTML = html;

      const divContent = div.querySelector('.content');

      this.template = divContent.getAttribute('data-template');

      this.content.setAttribute('data-template', this.template);
      this.content.innerHTML = divContent.innerHTML;

      this.page = this.pages[this.template];
      this.page.create();
      this.page.show();
      
      this.addLinkListeners();
    }else{
      console.log("Error!");
    }
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a');
    each(links, link => {
      link.onclick = event => {
        const { href } = link;
        event.preventDefault();

        this.onChange(href);
      }
    })
  }
}

new App();