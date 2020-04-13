import { observable, action, decorate } from "mobx";
class RulesStore {
  rules = [];
  setRules(rules) {
    this.rules = rules;
  }
}
  RulesStore = decorate(RulesStore, {
    rules: observable,
    setRules: action,
});
export { RulesStore };