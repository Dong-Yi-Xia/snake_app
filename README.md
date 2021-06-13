# Snake App
https://dong-yi-xia.github.io/snake_app/

## Resource
setInterval() and clearInterval() and setTimeOut() and clearTimeout()
https://www.w3schools.com/jsref/met_win_setinterval.asp 
https://www.w3schools.com/jsref/met_win_clearinterval.asp

HTMLAudioElement<br>
https://www.w3schools.com/tags/ref_av_dom.asp
https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio

localStorage<br>
https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem

sound Effect<br>
https://mixkit.co/free-sound-effects


## Note
React Class
setState works in an asynchronous way. That means after calling setState the this.state variable is not immediately changed. Use setState callback.  setState(updater, callback)

```javascript
this.setState({ 
    name:'value'  
},() => { 
    console.log(this.state.name); 
}); 
```

### Deploy on GitHub Page with React
npm install gh-pages / npm add gh-pages<br>

In package.json<br>
"homepage": "https://username.github.io/repoName",<br>

Inside the script tag add<br>
"predeploy": "npm run build", or "predeploy": "yarn build",<br>
"deploy": "gh-pages -d build"<br>

In the terminal<br>
npm run deploy / yarn deploy<br>
Git add. Git commit. Git push<br>

In github pages. Select gh-pages branch.<br>
