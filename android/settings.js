/**
 * Created by buhe on 2016/11/1.
 */

var fs = require('fs');

var addProjectInclude = function(settings,packages){
  var content = 'include \':app\'\n'
  +'include \':react-native-config\'\n'
  + 'project(\':react-native-config\').projectDir = new File(settingsDir, \'../node_modules/react-native-config/android\')\n';

  for(var projName in packages) {
    var add = '\ninclude \':' + projName + '\'';
    add += '\n'
    add += 'project(\':' + projName + '\').projectDir = new File(settingsDir, \'' + packages[projName] + '\')'
    content  = content + add;
  }
  fs.writeFileSync(settings,content);
}

//addProjectInclude('/Users/guguyanhua/github/airapps/android/settings.gradle','react-native-config','../node_modules/react-native-config/android');


module.exports = addProjectInclude;