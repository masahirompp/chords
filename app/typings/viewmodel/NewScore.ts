import Music = require('../model/Music');
import NewScoreStepChart = require('../view/NewScoreStepChart');
import NewScoreBody = require('../view/NewScoreBody');
import NewScoreStep1 = require('../view/NewScoreStep1');
import NewScoreStep2 = require('../view/NewScoreStep2');
import NewScoreFooter = require('../view/NewScoreFooter');
import Util = require('../util/Util');

var STEP1 = 1;
var STEP2 = 2;
var STEP3 = 3;

class NewScore {

  private isOriginal: boolean;
  private isStep1OK: boolean = false;
  private isStep2OK: any = null; // original title or existing data
  private isStep3OK: boolean = false;
  private currentStep: number;

  private initializes: Function[] = [];
  private observersIsOriginal: Function[] = [];
  private observersStep1OK: Function[] = [];
  private observersStep2OK: Function[] = [];
  private observersStep3OK: Function[] = [];
  private observersCurrentStep: Function[] = [];

  private keySignature = Music.HARMONICSET;

  /**
   * 初期化
   */
  initialize() {
    this.isOriginal = false;
    this.isStep1OK = false;
    this.isStep2OK = false;
    this.isStep3OK = false;
    this.currentStep = STEP1;
    this.initializes.forEach(func => setTimeout(func, 0));
  }

  /**
   * Step1からStep2へ
   * @param isOriginal
   */
  step1to2(isOriginal: boolean): void {
    if (this.currentStep === STEP1) {
      this.isOriginal = isOriginal;
      this.isStep1OK = true;
      var prev = this.currentStep;
      this.currentStep = STEP2;

      this.notifyIsOriginal(this.isOriginal);
      this.notifyStep1OK(this.isStep1OK);
      this.notifyStep2OK(this.isStep2OK);
      this.notifyCurrentStep(prev, this.currentStep);
    }
  }

  /**
   * Step2からStep3へ
   */
  step2to3() {
    if (this.currentStep === STEP2) {
      var prev = this.currentStep;
      this.currentStep = STEP3;

      this.notifyCurrentStep(prev, this.currentStep);
    }
  }

  /**
   *
   * @param title
   */
  validateStep2Original(title: string) {
    this.isStep2OK = Util.trim(title);
    this.isStep3OK = !!this.isStep2OK;

    this.notifyStep2OK(this.isStep2OK);
  }

  /**
   *
   * @param data
   */
  validateStep2Existing(data: any) {
    this.isStep2OK = data;
    this.isStep3OK = !!this.isStep2OK;

    this.notifyStep2OK(this.isStep2OK);
  }

  /**
   * 新規作成
   */
  submit() {
    if (this.currentStep === STEP3) {
      // TODO
    }
  }

  clickStepChart1() {
    if (this.currentStep === STEP1) {
      return;
    }
    this.changeStepChart(1);
    this.notifyStep1OK(this.isStep1OK);
  }

  clickStepChart2() {
    if (this.currentStep === STEP2 || !this.isStep1OK) {
      return;
    }
    this.changeStepChart(2);
    this.notifyStep2OK(this.isStep2OK);
  }

  clickStepChart3() {
    if (this.currentStep === STEP3 || !this.isStep2OK) {
      return;
    }
    this.changeStepChart(3);
  }

  private changeStepChart(nextStep: number) {
    var prev = this.currentStep;
    this.currentStep = nextStep;

    this.notifyCurrentStep(prev, this.currentStep);
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
  static factory($stepChart: JQuery, $step1: JQuery, $step2: JQuery, $step3: JQuery, $footer: JQuery): NewScore {
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
    this.addInitializes(step2, step2.initialize);
    this.addInitializes(footer, footer.initialize);
    this.addObserverIsOriginal(step1, step1.activeBtn);
    this.addObserverIsOriginal(step2, step2.show);
    this.addObserverCurrentStep(stepChart, stepChart.updateActive);
    this.addObserverCurrentStep(body, body.slide);
    this.addObserverCurrentStep(footer, footer.showNextStepBtn);
    this.addObserverStep1OK(stepChart, stepChart.updateStep2);
    this.addObserverStep1OK(footer, footer.showNextStep2Btn);
    this.addObserverStep2OK(stepChart, stepChart.updateStep3);
    this.addObserverStep2OK(footer, footer.showNextStep3Btn);
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

  private notifyIsOriginal(isOriginal: boolean) {
    this.observersIsOriginal.forEach(func => setTimeout(() => func(isOriginal), 0));
  }

  private notifyStep1OK(isStep1OK: boolean) {
    this.observersStep1OK.forEach(func => setTimeout(() => func(isStep1OK), 0));
  }

  private notifyStep2OK(isStep2OK: boolean) {
    this.observersStep2OK.forEach(func => setTimeout(() => func(isStep2OK), 0));
  }

  private notifyStep3OK(isStep3OK: boolean) {
    this.observersStep3OK.forEach(func => setTimeout(() => func(isStep3OK), 0));
  }

  private notifyCurrentStep(prevStep: number, nextStep: number) {
    this.observersCurrentStep.forEach(func => setTimeout(() => func(prevStep, nextStep), 0));
  }
}

export = NewScore
