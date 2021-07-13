export default class Page {
  constructor({ 
    element, 
    elements,
    id 
  }) {
    this.selector = element;
    this.selectorChildren = elements;
    this.id = id;
  }

  create() {
    this.element = document.querySelector(this.selector);

    console.log('Create', this.id, this.element);
  }
}