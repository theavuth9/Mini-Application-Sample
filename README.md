# Mini-Application-Sample

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### How to set bar title
```js
created() {
  // set bar title
  this.$bridge.callHandler("setBarTitle", { title: "Home Page" });
},
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
