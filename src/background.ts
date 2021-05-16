/// <reference path="../node_modules/@types/chrome/index.d.ts"/>
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Hello from the background')

  chrome.tabs.executeScript({
    file: 'content-script.js'
  })
})
