import each from 'lodash/each';

import About from './pages/About/index';
import Collections from './pages/Collections/index';
import Detail from './pages/Detail/index';
import Home from './pages/Home/index';

import Canvas from './components/Canvas/Index';
import Navigation from './components/Navigation';
import Preloader from './components/Preloader';

class App {
  constructor() {
    this.createContent();

    this.createPreloader();
    this.createNavigation();
    this.createCanvas();
    this.createPages();

    this.addEventListeners();

    this.addLinkListeners();

    this.update();
  }

  createNavigation() {
    this.navigation = new Navigation({
      template: this.template
    });
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once('completed', this.onPreloaded.bind(this));
  }

  createCanvas() {
    this.canvas = new Canvas();
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
  }

  /*
  Events
  */

  onPreloaded() {
    this.preloader.destroy();

    this.onResize();

    this.page.show();
  }

  async onChange(url) {
    await this.page.hide();
    const request = await window.fetch(url);

    if (request.status === 200) {
      const html = await request.text();
      const div = document.createElement('div');

      div.innerHTML = html;

      const divContent = div.querySelector('.content');

      this.template = divContent.getAttribute('data-template');

      this.navigation.onChange(this.template);

      this.content.setAttribute('data-template', this.template);
      this.content.innerHTML = divContent.innerHTML;

      this.page = this.pages[this.template];
      this.page.create();

      this.onResize();

      this.page.show();

      this.addLinkListeners();
    } else {
      console.log("Error!");
    }
  }

  onResize() {
    if(this.canvas && this.canvas.onResize){
      this.canvas.onResize();
    }

    if (this.page && this.page.onResize) {
      this.page.onResize();
    }
  }

  /*
  Loop
  */
  // In WebGL, when the camera moves need to keep the new rendering position over and over => that is why we use requestAnimationFrame
  update() {
    if (this.canvas && this.canvas.update) {
      this.canvas.update();
    }

    if (this.page && this.page.update) {
      this.page.update();
    }
    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }

  /*
  Listeners
  */
  addEventListeners() {
    window.addEventListener('mousedown', this.onTouchDown.bind(this));
    window.addEventListener('mousemove', this.onTouchMove.bind(this));
    window.addEventListener('mouseup', this.onTouchUp.bind(this));

    window.addEventListener('touchstart', this.onTouchDown.bind(this));
    window.addEventListener('touchmove', this.onTouchMove.bind(this));
    window.addEventListener('touchend', this.onTouchUp.bind(this));

    window.addEventListener('resize', this.onResize.bind(this));
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