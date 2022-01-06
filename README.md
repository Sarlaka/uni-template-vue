# uni-template-vue

## 基于 uni-app、vue2.x、vuex、uview2.x 搭建的项目模板，适用于微信小程序。

### 1. 项目安装、开发、发布

```
// 安装项目依赖
npm install

// 安装git子模块，*必须要在根目录下执行*
git submodule update --init --recursive

// 开发启动
npm run deploy:dev

// 发布到测试环境
npm run deploy:test

// 发布到生产环境
npm run deploy:prod
```

### 2. 项目目录

```
uni-template-vue         // 根目录
├── babel.config.js      //
├── package-lock.json    //
├── package.json         //
├── postcss.config.js    //
├── public               //
│   └── index.html       //
├── src                  // 开发文件目录
│   ├── App.vue          // App.vue
│   ├── config           // 配置文件目录
│   ├── main.js          // 入口文件
│   ├── manifest.json    // uni-app配置文件
│   ├── pages            // 小程序页面目录
│   ├── pages.json       // 小程序页面配置文件
│   ├── request          // 接口请求方法封装目录，包含登录获取token
│   ├── service          // 接口API目录
│   ├── static           // 静态资源目录
│   ├── store            // 全局状态管理
│   ├── styles           // 全局样式
│   ├── uni.scss         // uni.scss
│   ├── utils            // 工具方法目录
│   └── uview-ui         // uview组件目录
└── README.md            // README.md
```
