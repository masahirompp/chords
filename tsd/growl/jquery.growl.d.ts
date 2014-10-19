///<reference path="../jquery/jquery.d.ts" />

interface JQGrowlOptions {
  title?: string;
  message?: string;
  namespace?: string;
  duration?: number;
  close?: string;
  location?: string;
  style?: string;
  size?: string;
}

interface JQGrowlStatic {
  (option?:JQGrowlOptions): void;
  error:(option?:JQGrowlOptions) => void;
  notice:(option?:JQGrowlOptions) => void;
  warning:(option?:JQGrowlOptions) => void;
}

interface JQueryStatic {
  growl?: JQGrowlStatic;
}
