// To be used by gulp or on a server.
// Used to build a map of the /data folder in JSON

import fs from 'fs';
import path from 'path';

export default function dirTree(dirName) {
  let stats = fs.lstatSync(dirName),
      info = {
          path: dirName,
          name: path.basename(dirName)
      };

  if (stats.isDirectory()) {
    info.type = "folder";
    info.children = fs.readdirSync(dirName).map(function(child) {
        return dirTree(dirName + '/' + child);
    });
  } else if (stats.isFile()) {
    // Assuming it's a file. In real life it could be a symlink or
    // something else!
    info.type = "file";
  } else {
    info.type = "other"
  }

  return info;
}
