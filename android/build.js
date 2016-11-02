/**
 * Created by buhe on 2016/11/1.
 */
var fs = require('fs');
var readline = require('linebyline');
var _ = require('lodash');


/**
 * 1. check dependency item existed
 * 2. add new dependency when dependency not existed
 *
 * dependencies ['air-umeng','air-rongcloud']
 */
var buildGradle = function (gradleFile, dependencies) {
  //fs.readFile
  var buildContent = '';
  var found = false;
  var rl = readline(gradleFile);
  rl.on('line', function (line, lineCount, byteCount) {
    if (_.startsWith(line, 'dependencies {')) {
      found = true;
      buildContent = buildContent + line + '\n';
      buildContent = buildContent
          + '    compile fileTree(include: [\'*.jar\'], dir: \'libs\')\n'
          + '    compile \'com.android.support:appcompat-v7:23.1.1\'\n'
          + '    compile \'com.facebook.react:react-native:+\'\n'
          + '    compile project(\':react-native-config\')\n';
      for (var key in dependencies) {
        buildContent = buildContent + '    compile project(\':' + dependencies[key] + '\')\n';
      }
    } else if (_.startsWith(line, '}') && found) {
      buildContent = buildContent + line + '\n';
      found = false;
    } else if (found) {
      //ignore content
    } else {
      buildContent = buildContent + line + '\n';
    }
  })
      .on('error', function (e) {
        // something went wrong
        //console.log(JSON.stringify(e))
      })
      .on('end', function () {
        fs.writeFileSync(gradleFile, buildContent);
        //console.log(buildContent);
      })
  ;


}

//buildGradle('/Users/guguyanhua/github/airapps/android/app/build.gradle', ['air-umeng', 'air-rongcloud']);

module.exports = buildGradle;