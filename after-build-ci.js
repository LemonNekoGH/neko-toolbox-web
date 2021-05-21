const rimraf = require('rimraf')

rimraf.sync('./dist/_locales')
rimraf.sync('./dist/icons')
rimraf.sync('./dist/devtools.html')
rimraf.sync('./dist/options.html')
rimraf.sync('./dist/override.html')
rimraf.sync('./dist/popup.html')
rimraf.sync('./dist/manifest.json')
