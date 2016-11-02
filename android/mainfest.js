/**
 * Created by buhe on 2016/11/1.
 */
var XML = require('pixl-xml'),
    fs = require('fs');

var updatePermission = function(manifest,permissionList){

  var parser = null;
  try {
    parser = new XML.Parser( manifest, { preserveAttributes: true });
  }
  catch (err) {
    throw err;
  }
  var doc = parser.getTree();
  doc['uses-permission'] = [];
  for(var key in permissionList){
    doc['uses-permission'].push({"_Attribs":{ 'android:name': permissionList[key] }});
  }
  //console.log( parser.compose() );
  fs.writeFileSync(manifest, parser.compose());
}


//updatePermission('/Users/guguyanhua/github/airapps/android/app/src/main/AndroidManifest.xml'
//    ,['android.permission.ACCESS_FINE_LOCATION','android.permission.ACCESS_COARSE_LOCATION']);

module.exports = updatePermission;