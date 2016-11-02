// API is a bit wonky right now
var xcode = require('xcode'),
    fs = require('fs')



var updateCapabilities = function(myProj,prop,enabled){
  var PBXObject = myProj.pbxProjectSection();
  PBXObject[myProj.getFirstProject().uuid]
      ['attributes']
      ['TargetAttributes']
      [myProj.getFirstTarget().uuid]
      ['SystemCapabilities']
      [prop] = {enabled:enabled};
}


/**
 * {
 *  'com.apple.Push':0,
 *  'com.apple.BackgroundModes':1
 * }
 * @param mergedCapabilities
 */
var capabilities = function(projectPath,mergedCapabilities){
  //projectPath = '/Users/guguyanhua/github/airapps/ios/airapps.xcodeproj/project.pbxproj',
  myProj = xcode.project(projectPath);
  myProj.parse(function (err) {
    for(var key in mergedCapabilities){
      updateCapabilities(myProj,key,mergedCapabilities[key]);
    }
    fs.writeFileSync(projectPath, myProj.writeSync());
    //console.log('new project written');
  });
}

//capabilities('/Users/guguyanhua/github/airapps/ios/airapps.xcodeproj/project.pbxproj',{'com.apple.Push':1, 'com.apple.BackgroundModes':0});

module.exports = capabilities;