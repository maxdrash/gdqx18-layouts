import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
const {
  customElement,
  property
} = Polymer.decorators;
let GdqTimekeeperRunner = class GdqTimekeeperRunner extends Polymer.Element {
  calcRunnerStatus(results, index) {
    if (!results) {
      return;
    }

    if (results[index] && results[index].time) {
      return results[index].time.formatted;
    }

    return 'Running';
  }

  calcRunnerStatusClass(results, index) {
    if (!results) {
      return;
    }

    if (results[index] && !results[index].forfeit) {
      return 'finished';
    }

    return '';
  }

  calcFinishHidden(results, index) {
    if (!results) {
      return;
    }

    return results[index] && !results[index].forfeit;
  }

  calcResumeHidden(results, index) {
    if (!results) {
      return;
    }

    return !results[index];
  }

  calcForfeitHidden(results, index) {
    if (!results) {
      return;
    }

    return results[index] && results[index].forfeit;
  }

  calcEditDisabled(results, runnerIndex) {
    if (!results) {
      return;
    }

    return !results[runnerIndex];
  }

  finish() {
    nodecg.sendMessage('completeRunner', {
      index: this.index,
      forfeit: false
    });
  }

  forfeit() {
    nodecg.sendMessage('completeRunner', {
      index: this.index,
      forfeit: true
    });
  }

  resume() {
    nodecg.sendMessage('resumeRunner', this.index);
  }

  editTime() {
    this.dispatchEvent(new CustomEvent('edit-time', {
      bubbles: true,
      composed: true
    }));
  }

};

tslib_1.__decorate([property({
  type: String
})], GdqTimekeeperRunner.prototype, "importPath", void 0);

tslib_1.__decorate([property({
  type: Number
})], GdqTimekeeperRunner.prototype, "index", void 0);

tslib_1.__decorate([property({
  type: Object
})], GdqTimekeeperRunner.prototype, "runner", void 0);

tslib_1.__decorate([property({
  type: Array
})], GdqTimekeeperRunner.prototype, "results", void 0);

GdqTimekeeperRunner = tslib_1.__decorate([customElement('gdq-timekeeper-runner')], GdqTimekeeperRunner);
export default GdqTimekeeperRunner;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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