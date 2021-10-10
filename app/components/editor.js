import Component from '@glimmer/component';
import { action } from '@ember/object';
window.requirejs.s = {
  contexts: {
    _: {
      config: ''
    }
  }
}


import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// // the order of imports matters!

// requirejsContext();

//

monaco.languages.registerCompletionItemProvider('sql', {
  provideCompletionItems: () => {
    var suggestions = [{
      label: 'SELECT',
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'SELECT',
    }];
    return { suggestions: suggestions };
  }
});

export default class EditorComponent extends Component {
  @action
  renderEditor(element) {
    this.editor = monaco.editor.create(element, {
      value: this.args.value,
      language: 'sql',
      theme: 'vs-dark',
    });
    this.editor.onDidChangeModelContent(() => {
      let editorContents = this.editor.getModel().getValue();
      this.args.onValueChange(editorContents);
    });
  }
}


