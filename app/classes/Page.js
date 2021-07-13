import each from 'lodash/each';

export default class Page {
  constructor({ 
    element, 
    elements,
    id 
  }) {
    this.selector = element;
    this.selectorChildren = {
      ...elements
    };

    this.id = id;
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {}

    // CheatSheet
    each(this.selectorChildren, (entry, key) => {
      if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)){
        this.elements[key] = entry;
      } else {
        this.elements[key] = this.element.querySelectorAll(entry);

        if(this.elements[key].length === 0){
          this.elements[key] = null;
        } else if(this.elements[key].length === 1){
          this.elements[key] = this.element.querySelector(entry);
        }
      }
      console.log(this.elements[key], entry)
    })
  }
}

