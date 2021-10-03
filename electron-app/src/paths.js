const fs = require('fs');
const path = require('path');

const hasWriteAccess = dir => {
  const testFilePath = path.join(dir, 'write.test');
  try {
    fs.writeFileSync(testFilePath, new Date().toISOString(), { flag: 'w+' });
    fs.unlinkSync(testFilePath);
    return true;
  } catch (err) {
    return false;
  }
};

const getAppDirectory = () => {
  switch (process.platform) {
    case 'darwin':
      return process.execPath.substring(
        0,
        process.execPath.indexOf('.app') + 4
      );
    case 'linux':
    case 'win32':
      return path.join(process.execPath, '..');
  }
};

module.exports = {
  getHomeDirectory: homePath => {
    // When a read-writeable .viewfinder folder exists above app use that
    const portableHomePath = path.join(getAppDirectory(), '..', '.viewfinder');
    if (fs.existsSync(portableHomePath)) {
      if (hasWriteAccess(portableHomePath)) {
        return portableHomePath;
      } else {
        // A path exists so it was intended to be used but we didn't have rights, so warn.
        console.log(
          `Insufficient permission to portable ViewFinder home "${portableHomePath}".`
        );
      }
    }
    // Check VIEWFINDER_HOME environment variable next
    if (process.env.VIEWFINDER_HOME !== undefined) {
      return process.env.VIEWFINDER_HOME;
    }

    // Fall back to default .viewfinder folder in users home folder
    return path.join(homePath, '.viewfinder');
  },

  getAppDirectory: getAppDirectory
};
