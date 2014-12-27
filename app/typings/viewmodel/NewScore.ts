import NewScoreStepChart = require('../view/NewScoreStepChart');

interface observer {
  receiver: any;
  func: Function;
}

class NewScore {

  static STEP1 = 1;
  static STEP2 = 2;
  static STEP3 = 3;

  private isOriginal: boolean;
  private currentStep: number;

  private initializers: observer[] = [];
  private clickStep1Functions: observer[] = [];
  private clickStep2Functions: observer[] = [];
  private step1to2Functions: observer[] = [];
  private step2to3Functions: observer[] = [];
  private submitFunctions: observer[] = [];

  static make($stepChart: JQuery): NewScore {
    // viewとviewmodelのインスタンス生成
    var newScore = new NewScore();
    var stepChart = new NewScoreStepChart($stepChart, newScore);

    // observer登録
    newScore.addInitializer(stepChart, stepChart.activeStep1);
    newScore.addClickStep1Function(stepChart, stepChart.activeStep1);
    newScore.addClickStep2Function(stepChart, stepChart.activeStep2);
    newScore.addStep1to2Function(stepChart, stepChart.activeStep2);
    newScore.addStep2to3Function(stepChart, stepChart.activeStep3);

    // viewmodelの初期化
    newScore.initialize();
    return newScore;
  }

  constructor() {
    this.isOriginal = false;
    this.currentStep = NewScore.STEP1;
  }

  /**
   * 初期化
   */
  initialize() {
    this.initializers.forEach(ob => ob.func.call(ob.receiver));
  }

  /**
   * Step1からStep2へ
   * @param isOriginal
   */
  step1to2(isOriginal) {
    if (this.currentStep === NewScore.STEP1) {
      this.isOriginal = isOriginal;
      this.currentStep = NewScore.STEP2;
      this.step1to2Functions.forEach(ob => ob.func.call(ob.receiver, this.isOriginal));
    }
  }

  /**
   * Step2からStep3へ
   */
  step2to3() {
    if (this.currentStep === NewScore.STEP2) {
      this.currentStep = NewScore.STEP3;
      this.step2to3Functions.forEach(ob => ob.func.call(ob.receiver));
    }
  }

  /**
   * 新規作成
   */
  submit() {
    if (this.currentStep === NewScore.STEP3) {
      this.submitFunctions.forEach(ob => ob.func.call(ob.receiver));
    }
  }

  /**
   * ステップチャート押下時の処理（前のステップ戻る）
   * @param clickedStep
   */
  clickStep(clickedStep: number) {
    if (clickedStep === NewScore.STEP1 && this.currentStep > NewScore.STEP1) {
      this.currentStep = clickedStep;
      this.clickStep1Functions.forEach(ob => ob.func.call(ob.receiver));
      return;
    } else if (clickedStep === NewScore.STEP2 && this.currentStep > NewScore.STEP2) {
      this.currentStep = clickedStep;
      this.clickStep2Functions.forEach(ob => ob.func.call(ob.receiver));
      return;
    }
    return false;
  }

  addInitializer(receiver: any, func: () => void) {
    this.initializers.push({
      receiver: receiver,
      func: func
    });
  }

  addClickStep1Function(receiver: any, func: () => void) {
    this.clickStep1Functions.push({
      receiver: receiver,
      func: func
    });
  }

  addClickStep2Function(receiver: any, func: () => void) {
    this.clickStep2Functions.push({
      receiver: receiver,
      func: func
    });
  }

  addStep1to2Function(receiver: any, func: (isOriginal: boolean) => void) {
    this.step1to2Functions.push({
      receiver: receiver,
      func: func
    });
  }

  addStep2to3Function(receiver: any, func: () => void) {
    this.step2to3Functions.push({
      receiver: receiver,
      func: func
    });
  }

  addSubmitFunction(receiver: any, func: () => void) {
    this.submitFunctions.push({
      receiver: receiver,
      func: func
    });
  }
}

export = NewScore
