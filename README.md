# Collie DB

![CollieDB](https://github.com/LiuPengJugx/collie-db-open/blob/master/public/logo.jpg)

> CollieDB是一个由中国人民大学数据仓库与商务智能实验室自主研发的人工智能赋能的数据库管理系统。它使用机器学习技术来优化数据库的各个关键组件以提升数据库系统的各项性能，主要设计目的是针对大数据时代的复杂混合处理场景(HTAP)所带来的挑战并能够自动应对动态变化的工作负载，所涉及的核心技术包括智能查询优化、学习型索引、智能数据分区与数据压缩、数据库配置参数自调优、动态负载预测、智能索引推荐等。

[线上地址](http://10.77.110.152:9529)

目前版本为 `v4.0+` 基于 `vue-cli` 进行构建，若你想使用旧版本，可以切换分支到[tag/3.11.0](https://github.com/PanJiaChen/vue-admin-template/tree/tag/3.11.0)，它不依赖 `vue-cli`。

## 系统架构

<img src="https://github.com/LiuPengJugx/collie-db-open/blob/master/public/basic.png" alt="Architecture" style="zoom:50%;" />

- **智能查询优化**：使用机器学习、强化学习等技术，进行查询规模估算、查询代价估算、查询计划生成等，提高数据库查询执行性能。
- **智能数据分区**：使用基于图神经网络、谱聚类等先进技术，对数据进行智能的水平分区、垂直分区和混合分区，提升数据库系统处理效率。
- **智能数据压缩**：使用FM-index、CSA等紧凑数据结构，在压缩数据上直接进行查询，大幅提高查询性能，减少存储空间占用。
- **学习型索引**：基于机器学习、强化学习等技术，用模型预测来代替传统的索引构建过程，提高数据库系统索引检索效果。
- **智能索引推荐**：借助先进的深度强化学习技术，实现动态工作负载下的索引推荐，最优化索引配置，最大化提升数据库在当前索引配置下的性能。
- **数据库参数自调优**：使用机器学习、强化学习技术分析数据库参数配置和运行指标，动态地为数据库系统推荐参数配置，进而适应快速变化的工作负载。
- **动态负载预测**：基于RNN等神经网络时间序列预测技术，辅以聚类和贝叶斯方法，使系统能够精准地预测未来的工作负载并做好相应的系统自调优工作。

## Build Setup

```bash
# 克隆项目
git clone https://github.com/LiuPengJugx/collie-db-open.git

# 进入项目目录
cd collie-db-open

# 安装依赖
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```



## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT](https://github.com/PanJiaChen/vue-admin-template/blob/master/LICENSE) license.

Copyright (c) 2021-present PengJuLiu
