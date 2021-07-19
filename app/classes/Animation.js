export default class Animation {
  constructor(element) {
    this.element = element;

    this.createObserver();
  }

  createObserver() {
    this.observer = new window.IntersectionObserver(entries => {
      entries.forEact(entry => {
        if (entry.isIntersecting) {
          console.log('animatein');
        }else{
          console.log('animateout');
        }
      })
    });

    this.observer.observe(this.element);
  }
}