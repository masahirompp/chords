import NewScoreStepChart = require('../view/NewScoreStepChart');
import NewScoreStep1 = require('../view/NewScoreStep1');
import NewScoreStep2 = require('../view/NewScoreStep2');
import NewScoreBody = require('../view/NewScoreBody');

var STEP1 = 1;
var STEP2 = 2;
var STEP3 = 3;

class NewScore {

  private _isOriginal: boolean;
  private _isStep1Selected: boolean = false;
  private _isStep2Inputed: boolean = false;
  private _currentStep: number;
  private _prevStep: number;

  private initializers: Function[] = [];
  private clickStep1Functions: Function[] = [];
  private clickStep2Functions: Function[] = [];
  private step1to2Functions: Function[] = [];
  private step2to3Functions: Function[] = [];
  private submitFunctions: Function[] = [];

  static make($stepChart: JQuery, $step1: JQuery, $step2: JQuery, $step3: JQuery): NewScore {
    // viewとviewmodelのインスタンス生成
    var newScore = new NewScore();
    var stepChart = new NewScoreStepChart($stepChart, newScore);
    var body = new NewScoreBody($step1, $step2, $step3);
    var step1 = new NewScoreStep1($step1, newScore);
    var step2 = new NewScoreStep2($step2, newScore);

    // observer登録
    newScore.addInitializer(stepChart, stepChart.activeStep1);
    newScore.addInitializer(body, body.initialize);
    newScore.addInitializer(step1, step1.initialize);
    newScore.addClickStep1Function(stepChart, stepChart.activeStep1);
    newScore.addClickStep1Function(body, () => body.slide(newScore.prevStep, newScore.currentStep));
    newScore.addClickStep2Function(stepChart, stepChart.activeStep2);
    newScore.addClickStep2Function(body, () => body.slide(newScore.prevStep, newScore.currentStep));
    newScore.addStep1to2Function(stepChart, stepChart.activeStep2);
    newScore.addStep1to2Function(body, () => body.slide(newScore.prevStep, newScore.currentStep));
    newScore.addStep1to2Function(step1, () => step1.activeBtn(newScore.isOriginal));
    newScore.addStep1to2Function(step2, () => step2.show(newScore.isOriginal));
    newScore.addStep2to3Function(stepChart, stepChart.activeStep3);
    newScore.addStep2to3Function(body, () => body.slide(newScore.prevStep, newScore.currentStep));

    // viewmodelの初期化
    newScore.initialize();
    return newScore;
  }

  constructor() {
    this._isOriginal = false;
    this._prevStep = STEP1;
    this._currentStep = STEP1;
  }

  get isOriginal(): boolean {
    return this._isOriginal;
  }

  get prevStep(): number {
    return this._prevStep;
  }

  get currentStep(): number {
    return this._currentStep;
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
    if (this._currentStep === STEP1) {
      this._isOriginal = isOriginal;
      this._isStep1Selected = true;
      this._prevStep = this._currentStep;
      this._currentStep = STEP2;
      this.step1to2Functions.forEach(func => setTimeout(func, 0));
    }
  }

  /**
   * Step2からStep3へ
   */
  step2to3() {
    if (this._currentStep === STEP2) {
      this._prevStep = this._currentStep;
      this._currentStep = STEP3;
      this.step2to3Functions.forEach(func => setTimeout(func, 0));
    }
  }

  /**
   * 新規作成
   */
  submit() {
    if (this._currentStep === STEP3) {
      this.submitFunctions.forEach(func => setTimeout(func, 0));
    }
  }

  /**
   * ステップチャート押下時の処理（前のステップ戻る）
   * @param clickedStep
   */
  clickStep(clickedStep: number) {
    if (clickedStep === STEP1 && this._currentStep !== STEP1) {
      this._prevStep = this._currentStep;
      this._currentStep = clickedStep;
      this.clickStep1Functions.forEach(func => setTimeout(func, 0));
    } else if (clickedStep === STEP2 && this._currentStep !== STEP2 && this._isStep1Selected) {
      this._prevStep = this._currentStep;
      this._currentStep = clickedStep;
      this.clickStep2Functions.forEach(func => setTimeout(func, 0));
    } else if (clickedStep === STEP3 && this._currentStep !== STEP3 && this._isStep2Inputed) {
      this._prevStep = this._currentStep;
      this._currentStep = clickedStep;
    }
  }

  addInitializer(receiver: any, func: Function) {
    this.initializers.push(func.bind(receiver));
  }

  addClickStep1Function(receiver: any, func: Function) {
    this.clickStep1Functions.push(func.bind(receiver));
  }

  addClickStep2Function(receiver: any, func: Function) {
    this.clickStep2Functions.push(func.bind(receiver));
  }

  addStep1to2Function(receiver: any, func: Function) {
    this.step1to2Functions.push(func.bind(receiver));
  }

  addStep2to3Function(receiver: any, func: Function) {
    this.step2to3Functions.push(func.bind(receiver));
  }

  addSubmitFunction(receiver: any, func: Function) {
    this.submitFunctions.push(func.bind(receiver));
  }
}

export = NewScore
