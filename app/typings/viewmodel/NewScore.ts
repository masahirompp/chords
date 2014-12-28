import NewScoreStepChart = require('../view/NewScoreStepChart');
import NewScoreStep1 = require('../view/NewScoreStep1');
import NewScoreStep2 = require('../view/NewScoreStep2');

var STEP1 = 1;
var STEP2 = 2;
var STEP3 = 3;

class NewScore {

  private isOriginal: boolean;
  private isStep1Selected: boolean = false;
  private isStep2Inputed: boolean = false;
  private currentStep: number;

  private initializers: Function[] = [];
  private clickStep1Functions: Function[] = [];
  private clickStep2Functions: Function[] = [];
  private step1to2Functions: Function[] = [];
  private step2to3Functions: Function[] = [];
  private submitFunctions: Function[] = [];

  static make($stepChart: JQuery, $step1: JQuery, $step2): NewScore {
    // viewとviewmodelのインスタンス生成
    var newScore = new NewScore();
    var stepChart = new NewScoreStepChart($stepChart, newScore);
    var step1 = new NewScoreStep1($step1, newScore);
    var step2 = new NewScoreStep2($step2, newScore);

    // observer登録
    newScore.addInitializer(stepChart, stepChart.activeStep1);
    newScore.addInitializer(step1, step1.initialize);
    newScore.addClickStep1Function(stepChart, stepChart.activeStep1);
    newScore.addClickStep2Function(stepChart, stepChart.activeStep2);
    newScore.addStep1to2Function(stepChart, stepChart.activeStep2);
    newScore.addStep1to2Function(step1, step1.activeBtn);
    newScore.addStep1to2Function(step2, step2.show);
    newScore.addStep2to3Function(stepChart, stepChart.activeStep3);

    // viewmodelの初期化
    newScore.initialize();
    return newScore;
  }

  constructor() {
    this.isOriginal = false;
    this.currentStep = STEP1;
  }

  /**
   * 初期化
   */
  initialize() {
    this.initializers.forEach(func => setTimeout(func, 0));
  }

  /**
   * Step1からStep2へ
   * @param isOriginal
   */
  step1to2(isOriginal) {
    if (this.currentStep === STEP1) {
      this.isOriginal = isOriginal;
      this.isStep1Selected = true;
      this.currentStep = STEP2;
      this.step1to2Functions.forEach(func => setTimeout(() => func(this.isOriginal), 0));
    }
  }

  /**
   * Step2からStep3へ
   */
  step2to3() {
    if (this.currentStep === STEP2) {
      this.currentStep = STEP3;
      this.step2to3Functions.forEach(func => setTimeout(func, 0));
    }
  }

  /**
   * 新規作成
   */
  submit() {
    if (this.currentStep === STEP3) {
      this.submitFunctions.forEach(func => setTimeout(func, 0));
    }
  }

  /**
   * ステップチャート押下時の処理（前のステップ戻る）
   * @param clickedStep
   */
  clickStep(clickedStep: number) {
    if (clickedStep === STEP1 && this.currentStep !== STEP1) {
      this.currentStep = clickedStep;
      this.clickStep1Functions.forEach(func => setTimeout(func, 0));
      return;
    } else if (clickedStep === STEP2 && this.currentStep !== STEP2 && this.isStep1Selected) {
      this.currentStep = clickedStep;
      this.clickStep2Functions.forEach(func => setTimeout(func, 0));
      return;
    } else if (clickedStep === STEP3 && this.currentStep !== STEP3 && this.isStep2Inputed) {
      this.currentStep = clickedStep;
    }
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
