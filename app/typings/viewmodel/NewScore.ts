import NewScoreStepChart = require('../view/NewScoreStepChart');
import NewScoreBody = require('../view/NewScoreBody');
import NewScoreStep1 = require('../view/NewScoreStep1');
import NewScoreStep2 = require('../view/NewScoreStep2');
import NewScoreFooter = require('../view/NewScoreFooter');

var STEP1 = 1;
var STEP2 = 2;
var STEP3 = 3;

class NewScore {

  private isOriginal: boolean;
  private isStep1OK: boolean = false;
  private isStep2OK: boolean = false;
  private isStep3OK: boolean = false;
  private prevStep: number;
  private currentStep: number;

  private initializes: Function[] = [];
  private observersIsOriginal: Function[] = [];
  private observersStep1OK: Function[] = [];
  private observersStep2OK: Function[] = [];
  private observersStep3OK: Function[] = [];
  private observersCurrentStep: Function[] = [];

  /**
   * 初期化
   */
  initialize() {
    this.isOriginal = false;
    this.isStep1OK = false;
    this.isStep2OK = false;
    this.isStep3OK = false;
    this.prevStep = STEP1;
    this.currentStep = STEP1;
    this.initializes.forEach(func => setTimeout(func, 0));
  }

  /**
   * Step1からStep2へ
   * @param isOriginal
   */
  step1to2(isOriginal) {
    if (this.currentStep === STEP1) {
      this.isOriginal = isOriginal;
      this.isStep1OK = true;
      this.prevStep = this.currentStep;
      this.currentStep = STEP2;
      this.notifyIsOriginal();
      this.notifyStep1OK();
      this.notifyCurrentStep();
    }
  }

  /**
   * Step2からStep3へ
   */
  step2to3() {
    if (this.currentStep === STEP2) {
      this.prevStep = this.currentStep;
      this.currentStep = STEP3;
      this.notifyCurrentStep();
    }
  }

  /**
   * 新規作成
   */
  submit() {
    if (this.currentStep === STEP3) {
      // TODO
    }
  }

  /**
   * ステップチャート押下時の処理（前のステップ戻る）
   * @param clickedStep
   */
  clickStep(clickedStep: number) {
    if (clickedStep === STEP1 && this.currentStep !== STEP1) {
      this.prevStep = this.currentStep;
      this.currentStep = clickedStep;
    } else if (clickedStep === STEP2 && this.currentStep !== STEP2 && this.isStep1OK) {
      this.prevStep = this.currentStep;
      this.currentStep = clickedStep;
    } else if (clickedStep === STEP3 && this.currentStep !== STEP3 && this.isStep2OK) {
      this.prevStep = this.currentStep;
      this.currentStep = clickedStep;
    } else {
      return;
    }
    this.notifyCurrentStep();
  }

  /**
   * NewScoreのviewmodelとviewを生成
   * @param $stepChart
   * @param $step1
   * @param $step2
   * @param $step3
   * @param $footer
   * @returns {NewScore}
   */
  static make($stepChart: JQuery, $step1: JQuery, $step2: JQuery, $step3: JQuery, $footer: JQuery): NewScore {
    // viewとviewmodelのインスタンス生成
    var newScore = new NewScore();
    var stepChart = new NewScoreStepChart($stepChart, newScore);
    var body = new NewScoreBody($step1, $step2, $step3);
    var step1 = new NewScoreStep1($step1, newScore);
    var step2 = new NewScoreStep2($step2, newScore);
    var footer = new NewScoreFooter($footer, newScore);

    // observer登録
    newScore.addObservers(stepChart, body, step1, step2, footer);

    // viewmodelの初期化
    newScore.initialize();
    return newScore;
  }

  /**
   * オブサーバ登録
   * @param stepChart
   * @param body
   * @param step1
   * @param step2
   * @param footer
   */
  private addObservers(stepChart: NewScoreStepChart,
    body: NewScoreBody,
    step1: NewScoreStep1,
    step2: NewScoreStep2,
    footer: NewScoreFooter) {
    this.addInitializes(stepChart, stepChart.initialize);
    this.addInitializes(body, body.initialize);
    this.addInitializes(step1, step1.initialize);
    this.addInitializes(footer, footer.initialize);
    this.addObserverIsOriginal(step1, step1.activeBtn);
    this.addObserverIsOriginal(step2, step2.show);
    this.addObserverCurrentStep(stepChart, stepChart.updateActive);
    this.addObserverCurrentStep(body, body.slide);
    this.addObserverStep1OK(stepChart, stepChart.updateStep2);
    this.addObserverStep2OK(stepChart, stepChart.updateStep3);
    this.addObserverStep3OK(footer, footer.showSubmitBtn);
  }

  private addInitializes(receiver: any, func: () => void) {
    this.initializes.push(func.bind(receiver));
  }

  private addObserverIsOriginal(receiver: any, func: (isOriginal: boolean) => void) {
    this.observersIsOriginal.push(func.bind(receiver));
  }

  private addObserverStep1OK(receiver: any, func: (isStep1OK: boolean) => void) {
    this.observersStep1OK.push(func.bind(receiver));
  }

  private addObserverStep2OK(receiver: any, func: (isStep2OK: boolean) => void) {
    this.observersStep2OK.push(func.bind(receiver));
  }

  private addObserverStep3OK(receiver: any, func: (isStep3OK: boolean) => void) {
    this.observersStep3OK.push(func.bind(receiver));
  }

  private addObserverCurrentStep(receiver: any, func: (prevStep: number, nextStep: number) => void) {
    this.observersCurrentStep.push(func.bind(receiver));
  }

  private notifyIsOriginal() {
    this.observersIsOriginal.forEach(func => setTimeout(() => func(this.isOriginal), 0));
  }

  private notifyStep1OK() {
    this.observersStep1OK.forEach(func => setTimeout(() => func(this.isStep1OK), 0));
  }

  private notifyStep2OK() {
    this.observersStep2OK.forEach(func => setTimeout(() => func(this.isStep2OK), 0));
  }

  private notifyStep3OK() {
    this.observersStep3OK.forEach(func => setTimeout(() => func(this.isStep3OK), 0));
  }

  private notifyCurrentStep() {
    this.observersCurrentStep.forEach(func => setTimeout(() => func(this.prevStep, this.currentStep), 0));
  }
}

export = NewScore