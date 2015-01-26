class EditScore {

  private initializes: Function[] = [];

  constructor() {

  }

  initialize() {

    this.initializes.forEach(func => setTimeout(func, 0));
  }

  static factory($score: JQuery) {
    var edit = new EditScore();

    edit.initialize();
    return edit;
  }

  private addObservers() {

  }

  private addInitializes(receiver: any, func: () => void) {
    this.initializes.push(func.bind(receiver));
  }
}

export = EditScore