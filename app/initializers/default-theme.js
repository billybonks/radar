import tokens from 'electron-test/theme/default';

export function initialize(/* application */) {
  for (const [key, value] of Object.entries(tokens)) {
    let propertyName = `--${key.replace('.', '-')}`;
    document.querySelector('body').style.setProperty(propertyName, value);
  }
}

export default {
  initialize,
};
