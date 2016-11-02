/**
 * Created by buhe on 2016/11/2.
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
var pods = function (podFile, dependencies) {
  //fs.readFile
  var buildContent = '';
  var found = false;
  var rl = readline(podFile);
  rl.on('line', function (line, lineCount, byteCount) {
    //console.log(line);
    if (_.startsWith(line, '  # [air]')) {
      buildContent = buildContent + line + '\n';
      found = true;
      for (var key in dependencies) {
        if(dependencies[key] === ''){
          buildContent += '  pod \''+key+'\'\n';
        }else{
          buildContent += '  pod \''+key+'\',  :path => \'' + dependencies[key] + '\'\n';
        }
      }
    } else if (_.startsWith(line, '  # [/air]') && found) {
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
        console.log(e)
      })
      .on('end', function () {
        fs.writeFileSync(podFile, buildContent);
        //console.log(buildContent);
      })
  ;


}

module.exports = pods;