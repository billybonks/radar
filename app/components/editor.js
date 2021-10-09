import Component from '@glimmer/component';
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
  renderEditor(element) {
    monaco.editor.create(element, {
      value: `select * `,
      language: 'sql',
      theme: 'vs-dark',
    });
  }
}
