import Animation from '../classes/Animation';

export default class Paragraph extends Animation{
  constructor({element, elements}){
    super({
      element,
      elements
    });

    this.elementLinesSpans = ({ 
      append: true, 
      element: this.element
    });
  }
  
  animateIn() {
    this.timelineIn = GSAP.timeline({
      delay: 0.5
    })
    GSAP.set(this.element, {
      autoAlpha: 1
    })

    each(this.elementsLines, (line, index) => {
      this.timelineIn.fromTo(line, {
        y: '100%'
      }, {
         delay: index * 0.2,
        duration: 1.5,
        ease: 'expo.out',
        y: '0%'
      }, 0)
    })

  }

  animateOut() {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }

  onResize() {
    this.elementsLines = calculate(this.elementLinesSpans);
  }
}