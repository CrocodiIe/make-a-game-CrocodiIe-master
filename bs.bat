REM This batchfile starts browser-sync in the current directory
REM If browser-sync is not installed, you probably have to download node.js and then run:
REM npm install -g browser-sync
browser-sync start --server --browser "Chrome" --files "*.html, stylesheets/*.css, scripts/*.js" 
