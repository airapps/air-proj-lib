var buildHelper = require('./android/build');
var mainfestHelper = require('./android/mainfest');
var settingsHelper = require('./android/settings');

var xprojHelper = require('./xcode/xproj');

/**
 *
 * @param settings '/Users/guguyanhua/github/airapps/android/settings.gradle'
 * @param build '/Users/guguyanhua/github/airapps/android/app/build.gradle'
 * @param manifest '/Users/guguyanhua/github/airapps/android/app/src/main/AndroidManifest.xml'
 * @param java
 * @param packages {'air-umeng':'../node_modules/air-umeng/android','air-rongcloud':'../node_modules/air-rongcloud/android'}
 * @param permissions ['android.permission.ACCESS_FINE_LOCATION','android.permission.ACCESS_COARSE_LOCATION']
 */
var android = function(settings,build,manifest,java,packages,permissions){
  buildHelper(build,packages);
  settingsHelper(settings,packages);
  mainfestHelper(manifest,permissions);
  //TODO javaHelper(java,packages);
};
/**
 *
 * @param xProj '/Users/guguyanhua/github/airapps/ios/airapps.xcodeproj/project.pbxproj'
 * @param podfile
 * @param packages
 * @param permissions {'com.apple.Push':1, 'com.apple.BackgroundModes':0}
 */
var xcode = function(xProj,podfile,packages,permissions){
  xprojHelper(xProj,permissions);
  //TODO podfileHelper(podfile,packages)
};

android('/Users/guguyanhua/github/airapps/android/settings.gradle',
    '/Users/guguyanhua/github/airapps/android/app/build.gradle',
    '/Users/guguyanhua/github/airapps/android/app/src/main/AndroidManifest.xml',
    null,
    {'air-umeng':'../node_modules/air-umeng/android','air-rongcloud':'../node_modules/air-rongcloud/android'},
    ['android.permission.ACCESS_FINE_LOCATION','android.permission.ACCESS_COARSE_LOCATION']
    );
xcode('/Users/guguyanhua/github/airapps/ios/airapps.xcodeproj/project.pbxproj',
    null,
    null,
    {'com.apple.Push':1, 'com.apple.BackgroundModes':0}
    );


module.exports = {
  android:android,
  xcode:xcode
}