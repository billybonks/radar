import Component from '@glimmer/component';
// eslint-disable-next-line no-unused-vars
import requirejsPolyfill from '@cardstack/requirejs-monaco-ember-polyfill';
import * as monaco from 'monaco-editor';
import { action } from '@ember/object';
import { timeout } from 'ember-concurrency';
import { restartableTask } from 'ember-concurrency';

/**
 * <CodeEditor> takes the following arguments:
 * @code the code to display, in string form, like 'let a = 2;'
 * @language 'javascript', 'json', etc.
 * @readOnly optional {{true}} or {{false}}. Defaults to true.
 * @updateCode optional action that is called when content of the editor changes. It receives the full code as an argument.
 * @debounceMs optional number, rate limits how often updateCode is called. Default 500.
 * @validate optional action that should return a bool. Blocks calling updateCode if it returns false. Defaults to returning true.
 */

// without this polyfill, workers won't start due to a type error accessing
// a requirejs attribute. See the polyfill package readme for details.
requirejsPolyfill();

export default class CodeEditor extends Component {
  editor; // value is set by renderEditor
  constructor() {
    super(...arguments);
  }

  // Set default debounce in milliseconds.
  // This limits how often updateCode is called.
  get debounceMs() {
    let ms = this.args.debounceMs;
    return ms !== undefined ? this.args.debounceMs : 500;
  }

  // readOnly defaults to true
  get readOnly() {
    return this.args.readOnly === false ? false : true;
  }

  // validate defaults to returning true
  get validate() {
    return (
      this.args.validate ||
      function () {
        return true;
      }
    );
  }

  get updateCode() {
    return this.args.updateCode || function () {};
  }

  @action
  renderEditor(el) {
    // This is called when the containing div has been rendered.
    // `create` constructs a code editor and inserts it into the DOM.
    // el is the element that {{did-insert}} was used on.
    let codeModel = monaco.editor.createModel(
      this.args.code,
      this.args.language || 'sql',
    );
    // let height = codeModel.getLineCount() * 20;
    // el.style.height = height.toString() + 'px';
    el.style.height = '100%';
    let editor = monaco.editor.create(el, {
      model: codeModel,
      theme: 'vs-dark',
      minimap: { enabled: false },
      wordWrap: 'on',
      scrollBeyondLastLine: false,
      wrappingIndent: 'same',
    });

    this.ro = new ResizeObserver(() => {
      editor.layout();
    });

    this.ro.observe(el.parentElement);
    // Whenever the code block's text changes, onUpdateCode will be called.
    editor.onDidChangeModelContent(this.onUpdateCode);
    // Save editor instance locally, so we can reference it in other methods
    this.editor = editor;
    console.log(editor);
  }

  @restartableTask
  *debounceAndUpdate() {
    // This is a rate limiter so that fast typing doesn't wreck things.
    yield timeout(this.debounceMs);
    let code = this.editor.getValue(); // get the current text contents of the code editor
    if (this.validate(code)) {
      this.updateCode(code);
    }
  }

  @action
  onUpdateCode() {
    this.debounceAndUpdate.perform();
  }
}
