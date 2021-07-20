import Component from './Component';

export default class AsyncLoad extends Component {
  constructor({ element }) {
    super({
      element
    })

    this.createObserver();
  }

  createObserver() {
    this.observer = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.element.src = this.element.getAttribute('data-src');
        }
      })
    });

    this.observer.observe(this.element);
  }
}