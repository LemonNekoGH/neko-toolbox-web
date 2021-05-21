const rimraf = require('rimraf')
const fs = require('fs/promises')

rimraf.sync('./dist/_locales')
rimraf.sync('./dist/icons')
rimraf.sync('./dist/devtools.html')
rimraf.sync('./dist/options.html')
rimraf.sync('./dist/override.html')
rimraf.sync('./dist/popup.html')
rimraf.sync('./dist/manifest.json')

fs.appendFile('./dist/CNAME', 'toolbox.lemonneko.moe').then()
