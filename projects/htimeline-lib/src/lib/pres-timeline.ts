export class PRESTimeline {

    base: HTMLElement;
    periodContainer: HTMLElement;
    cardContainer: HTMLElement;
    activePeriod: HTMLElement;
    activeCard: HTMLElement;
    activePeriodIndex: number;
    activeCardIndex: number;
    periodData: HTMLElement[];
    cardData: HTMLElement[];
    color: object;
    timelineNodeContainer: HTMLElement;
    timelineData: HTMLElement[];

    constructor(target: HTMLElement, color: object) {

        // this.__process_stylesheet(document.styleSheets[0]);

        this.base = target;
        this.color = color;
        // console.log(this.color);
        this.periodContainer = this.base.querySelector('.periods-container');
        this.cardContainer = this.base.querySelector('.cards-container');
        this.timelineNodeContainer = this.base.querySelector('.timeline-container .timeline');
        // this.activePeriod = $(this.base).querySelector('.periods-container section.active');
        this._parseData();
        this._initialColor();
        this._generateTimeline();
        this._setStateClasses();
        this._assignBtn();
        this._adjustPeriodContainer();
        this._adjustCardContainer();
        // console.log(this.cardData);
    }

    private indexInParent(node: HTMLElement) {
        const children = node.parentNode.childNodes;
        let num = 0;
        for (let i = 0; i < children.length; i++) {
            if (children[i] === node) {
                return num;
            }
            if (children[i].nodeType === 1) {
                num++;
            }
        }
        return -1;
    }

    private addClass(elements: any, myClass: string) {

        // if there are no elements, we're done
        if (!elements) { return; }

        // if we have a selector, get the chosen elements
        if (typeof (elements) === 'string') {
            elements = document.querySelectorAll(elements);
        } else if (elements.tagName) {
            elements = [elements];
        }

        // add class to all chosen elements
        for (let i = 0; i < elements.length; i++) {

            // if class is not already found
            if ((' ' + elements[i].className + ' ').indexOf(' ' + myClass + ' ') < 0) {

                // add class
                elements[i].className += ' ' + myClass;
            }
        }
    }

    private removeClass(elements: any, myClass: string) {

        // if there are no elements, we're done
        if (!elements) { return; }

        // if we have a selector, get the chosen elements
        if (typeof (elements) === 'string') {
            elements = document.querySelectorAll(elements);
        } else if (elements.tagName) {
            elements = [elements];
        }

        // create pattern to find class name
        const reg = new RegExp('(^| )' + myClass + '($| )', 'g');

        // remove class from all chosen elements
        for (let i = 0; i < elements.length; i++) {
            elements[i].className = elements[i].className.replace(reg, ' ');
        }
    }

    _parseData() {
        const base = this.base;
        const periods = Array.from(base.querySelector('.periods-container').getElementsByTagName('section'));
        for (const section of periods) {
            section['period'] = section.getAttribute('period');
            section['index'] = this.indexInParent(section);
        }
        this.periodData = periods;
        const data = Array.from(base.querySelector('.cards-container').getElementsByTagName('section'));
        this.cardData = data;
        for (const section of data) {
            section['period'] = section.getAttribute('period');
            section['index'] = this.indexInParent(section);
        }
        // #assign initial entry point (active items);
        this.activePeriod = this.periodData[0];
        this.activePeriodIndex = 0;
        this.activeCard = this.cardData[0];
        this.activeCardIndex = 0;
    }

    _setStateClasses() {
        // # periods
        this.removeClass(this.base.querySelector('.periods-container section.active'), 'active');
        this.removeClass(this.base.querySelector('.periods-container section.prev'), 'prev');
        this.removeClass(this.base.querySelector('.periods-container section.next'), 'next');
        console.log('setclass: ' + this.activePeriod['index']);
        this.addClass(this.activePeriod, 'active');
        // console.log(this.activePeriod.index);
        // this.activePeriodIndex = this.activePeriod.index;
        if (this.activePeriod.previousElementSibling) {
            this.addClass(this.activePeriod.previousElementSibling, 'prev');
            this.removeClass(this.base.querySelector('.periods-container .btn-back'), 'hide');
        } else {
            this.addClass(this.base.querySelector('.periods-container .btn-back'), 'hide');
        }
        if (this.activePeriod.nextElementSibling) {
            this.addClass(this.activePeriod.nextElementSibling, 'next');
            this.removeClass(this.base.querySelector('.periods-container .btn-next'), 'hide');
        } else {
            this.addClass(this.base.querySelector('.periods-container .btn-next'), 'hide');
        }

        // ## cards
        this.removeClass(this.base.querySelector('.cards-container section.active'), 'active');
        this.removeClass(this.base.querySelector('.cards-container section.prev'), 'prev');
        this.removeClass(this.base.querySelector('.cards-container section.next'), 'next');
        this.addClass(this.activeCard, 'active');
        // this.activeCardIndex - this.activeCard.index;
        if (this.activeCard.previousElementSibling) {
            this.addClass(this.activeCard.previousElementSibling, 'prev');
        }
        if (this.activeCard.nextElementSibling) {
            this.addClass(this.activeCard.nextElementSibling, 'next');
        }

        // ## timeline
        this.removeClass(this.base.querySelector('.timeline li.active'), 'active');
        // let findNode = $(this.base).querySelector('.timeline ol li')[this.activeCard.index];
        this.addClass(this.timelineData[this.activeCard['index']], 'active');

        const timelineB = this.base.querySelector('.timeline-container .btn-back');
        const timelineN = this.base.querySelector('.timeline-container .btn-next');
        // console.log($(timelineN));
        if (this.activeCardIndex === 0) {
            this.addClass(timelineB, 'hide');
        } else {
            this.removeClass(timelineB, 'hide');
        }
        if (this.activeCardIndex >= this.cardData.length - 1) {
            this.addClass(timelineN, 'hide');
        } else {
            this.removeClass(timelineN, 'hide');
        }
    }
    // ## timeline generater
    _generateTimeline() {
        // ## create node list
        const htmlWrap = document.createElement('ol');
        this.timelineNodeContainer.appendChild(htmlWrap);
        const wrap = this.timelineNodeContainer.querySelector('ol');
        const numNode: number = this.cardData.length;
        for (let i = 0; i < numNode; i++) {
            const li = document.createElement('li');
            li.className = this.cardData[i]['period'];
            li.style.borderColor = this.cardData[i]['color'];
            const el = wrap.appendChild(li);
        }
        // ## width of timeline
        const nodeW = 200;
        wrap.style.width = `${nodeW * numNode - 16}px`;
        const nodeList = Array.from(this.base.querySelector('.timeline ol').getElementsByTagName('li'));
        this.timelineData = nodeList;
    }
    // ## assign button actions
    _assignBtn() {
        const periodPrev = this.base.querySelector('.periods-container .btn-back');
        const periodNext = this.base.querySelector('.periods-container .btn-next');
        periodPrev.addEventListener('click', () => {
            if (this.activePeriodIndex > 0) {
                // console.log('prev')
                this.activePeriodIndex -= 1;
                this.activePeriod = this.periodData[this.activePeriodIndex];
                this._chainActions('period');
                this._setStateClasses();
            }
            this._adjustPeriodContainer();
        });
        periodNext.addEventListener('click', () => {
            if (this.activePeriodIndex < this.periodData.length - 1) {
                // console.log('next' + this.activePeriodIndex)
                this.activePeriodIndex += 1;
                this.activePeriod = this.periodData[this.activePeriodIndex];
                this._chainActions('period');
                this._setStateClasses();
            }
            this._adjustPeriodContainer();

        });
        const timelinePrev = this.base.querySelector('.timeline-container .btn-back');
        const timelineNext = this.base.querySelector('.timeline-container .btn-next');
        timelinePrev.addEventListener('click', () => {
            if (this.activeCardIndex > 0) {
                this.activeCardIndex -= 1;
                this.activeCard = this.cardData[this.activeCardIndex];
                this._chainActions('timeline');
                this._setStateClasses();
            }
            this._adjustCardContainer();
            this._adjustPeriodContainer();
        });
        timelineNext.addEventListener('click', () => {
            if (this.activeCardIndex < this.cardData.length - 1) {
                this.activeCardIndex += 1;
                this.activeCard = this.cardData[this.activeCardIndex];
                this._chainActions('timeline');
                this._setStateClasses();
            }
            this._adjustCardContainer();
            this._adjustPeriodContainer();
        });

        // ## assign each timeline li
        for (let i = 0; i < this.timelineData.length; i++) {
            this.timelineData[i].addEventListener('click', () => {
                this.activeCardIndex = this.cardData[i]['index'];
                this.activeCard = this.cardData[this.activeCardIndex];
                this._chainActions('timeline');
                this._setStateClasses();
                this._adjustCardContainer();
                this._shiftTimeline();
            });
        }
    }
    // ## color ##
    _initialColor() {

        for (let i = 0; i < this.periodData.length; i++) {
            const p = this.periodData[i]['period'];
            this.periodData[i]['color'] = this.color[p];
            const temp = this.periodData[i];
            temp.style.borderColor = temp['color'];
            (temp.querySelector('.year') as HTMLElement).style.color = temp['color'];

            // ## color for timeline items, this part utilize the period name as class which will be add to the li later

            // ### cross browser bug fix
            const sbstyle = document.createElement('style');
            document.head.appendChild(sbstyle);
            (sbstyle.sheet as CSSStyleSheet).insertRule('li.' + p + '.active { background-color: ' + this.color[p] + ' !important } ', 0);
            (sbstyle.sheet as CSSStyleSheet).insertRule('li.' + p + '::before { background-color: ' + this.color[p] + ' } ', 0);
            (sbstyle.sheet as CSSStyleSheet).insertRule('li.' + p + '::after { background-color: ' + this.color[p] + ' } ', 0);

        }
        for (let i = 0; i < this.cardData.length; i++) {
            const p = this.cardData[i]['period'];
            this.cardData[i]['color'] = this.color[p];
            const temp = this.cardData[i];
            temp.style.borderColor = temp['color'];
            (temp.querySelector('.year') as HTMLElement).style.color = temp['color'];
        }
    }

    _adjustPeriodContainer() {
        const activeH = this.activePeriod.offsetHeight;
        this.periodContainer.style.height = `${activeH}px`;
        console.log('top adjusted');
    }
    _adjustCardContainer() {
        const activeH = this.activeCard.offsetHeight + 24;
        this.cardContainer.style.height = `${activeH}px`;
        console.log('bot adjusted');
    }
    _shiftTimeline() {
        // #### We need to fix this part if using this component in different sizes ####
        const timelineW = (this.base.querySelector('.timeline-container') as HTMLElement).offsetWidth;
        const timelinePadding = 210;
        const timelineCenter = 300;
        const liWidth = 16;
        const activeNodeX = this.timelineData[this.activeCardIndex].offsetLeft;
        const finalPos = -activeNodeX + timelinePadding;
        this.timelineNodeContainer.style.left = `${finalPos}px`;
        console.log(activeNodeX);
    }
    _chainActions(state: string) {
        switch (state) {
            case 'period':
                console.log('period');
                if (this.activePeriod['period'] !== this.activeCard['period']) {
                    // ## find the closest li with the active period;
                    const ta: HTMLElement[] = [];
                    for (let i = 0; i < this.cardData.length; i++) {
                        const temp = this.cardData[i];
                        if (this.activePeriod['period'] === temp['period']) { ta.push(temp); }
                    }
                    this.activeCard = ta[0];
                    this.activeCardIndex = ta[0]['index'];
                }

                break;
            case 'timeline':
                console.log('timeline');
                if (this.activeCard['period'] !== this.activePeriod['period']) {
                    let ta: HTMLElement;
                    for (let i = 0; i < this.periodData.length; i++) {
                        const temp = this.periodData[i];
                        if (this.activeCard['period'] === temp['period']) { ta = temp; }
                    }
                    this.activePeriod = ta;
                    this.activePeriodIndex = ta['index'];

                }

                break;
        }
        this._shiftTimeline();
        this._adjustCardContainer();
    }


}
