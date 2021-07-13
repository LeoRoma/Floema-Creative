export default class Page {
  constructor({ id }) {
    console.log('Page');
    this.id = id;

    this.create();
  }

  create() {
    console.log('Create', this.id);
  }
}