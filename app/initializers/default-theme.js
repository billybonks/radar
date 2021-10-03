import tokens from 'electron-test/theme/default';

export function initialize(/* application */) {
  for (const [key, value] of Object.entries(tokens.colours)) {
    let propertyName = `--${key.replace('.','-')}`;
    document.querySelector('body').style.setProperty(propertyName, value)
    console.log(propertyName);
  }
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  initialize,
};
