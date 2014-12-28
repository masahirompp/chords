import NewScoreStepChart = require('../view/NewScoreStepChart');
import NewScoreStep1 = require('../view/NewScoreStep1');

class NewScore {

  static STEP1 = 1;
  static STEP2 = 2;
  static STEP3 = 3;

  private isOriginal: boolean;
  private currentStep: number;

  private initializers: Function[] = [];
  private clickStep1Functions: Function[] = [];
  private clickStep2Functions: Function[] = [];
  private step1to2Functions: Function[] = [];
  private step2to3Functions: Function[] = [];
  private submitFunctions: Function[] = [];

  static make($stepChart: JQuery, $step1: JQuery): NewScore {
    // viewとviewmodelのインスタンス生成
    var newScore = new NewScore();
    var stepChart = new NewScoreStepChart($stepChart, newScore);
    var step1 = new NewScoreStep1($step1, newScore);

    // observer登録
    newScore.addInitializer(stepChart, stepChart.activeStep1);
    newScore.addInitializer(step1, step1.initialize);
    newScore.addClickStep1Function(stepChart, stepChart.activeStep1);
    newScore.addClickStep2Function(stepChart, stepChart.activeStep2);
    newScore.addStep1to2Function(stepChart, stepChart.activeStep2);
    newScore.addStep1to2Function(step1, step1.activeBtn);
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
    this.initializers.forEach(func => func());
  }

  /**
   * Step1からStep2へ
   * @param isOriginal
   */
  step1to2(isOriginal) {
    if (this.currentStep === NewScore.STEP1) {
      this.isOriginal = isOriginal;
      this.currentStep = NewScore.STEP2;
      this.step1to2Functions.forEach(func => func(isOriginal));
    }
  }

  /**
   * Step2からStep3へ
   */
  step2to3() {
    if (this.currentStep === NewScore.STEP2) {
      this.currentStep = NewScore.STEP3;
      this.step2to3Functions.forEach(func => func());
    }
  }

  /**
   * 新規作成
   */
  submit() {
    if (this.currentStep === NewScore.STEP3) {
      this.submitFunctions.forEach(func => func());
    }
  }

  /**
   * ステップチャート押下時の処理（前のステップ戻る）
   * @param clickedStep
   */
  clickStep(clickedStep: number) {
    if (clickedStep === NewScore.STEP1 && this.currentStep > NewScore.STEP1) {
      this.currentStep = clickedStep;
      this.clickStep1Functions.forEach(func => func());
      return;
    } else if (clickedStep === NewScore.STEP2 && this.currentStep > NewScore.STEP2) {
      this.currentStep = clickedStep;
      this.clickStep2Functions.forEach(func => func());
      return;
    }
    return false;
  }

  addInitializer(receiver: any, func: () => void) {
    this.initializers.push(func.bind(receiver));
  }

  addClickStep1Function(receiver: any, func: () => void) {
    this.clickStep1Functions.push(func.bind(receiver));
  }

  addClickStep2Function(receiver: any, func: () => void) {
    this.clickStep2Functions.push(func.bind(receiver));
  }

  addStep1to2Function(receiver: any, func: (isOriginal: boolean) => void) {
    this.step1to2Functions.push(func.bind(receiver));
  }

  addStep2to3Function(receiver: any, func: () => void) {
    this.step2to3Functions.push(func.bind(receiver));
  }

  addSubmitFunction(receiver: any, func: () => void) {
    this.submitFunctions.push(func.bind(receiver));
  }
}

export = NewScore
