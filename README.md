# sudot.net

使用 [Hexo](https://hexo.io) 将 md 文件生成静态页面

使用 [Jerry Wong](https://github.com/jerryc127) 修改的主题 [Butterfly](https://github.com/jerryc127/hexo-theme-butterfly)，使用文档很完整很详细，点击[查看使用文档](https://demo.jerryc.me/posts/21cfbf15/)

## 感想

本来是想自己做一个 go 语言基于解析 md 文件来生成静态文件的应用，也以此来学习和练习 go 语言，  
但是：

1. 审美能力太弱，无法做出好看的主题
2. 在使用 flutter 的过程中偶然看见一个博客使用 hexo 和一款主题搭配很好看，又让我有了使用 hexo 来部署的想法
3. 自己做一时半会儿也做不好，既然也是基于解析 md 文件生成静态文件，和不先实际的试试 hexo 呢，就是最后还是自己做，那也可以借鉴 hexo 优秀的地方

于是，此项目由最初的 java 更改为 go，现在又更改成 html 了。 哈哈哈 😄

## 目录结构

```
sudot.github.io
├──.deploy_xxx           ── 使用 hexo deploy 时提交到各指定平台的临时目录
├──node_modules          ── npm 管理的本项目插件或工具在本地存储的目录
├──public                ── 使用 hexo generate 编译 source 目录后生成的可部署静态文件
├──scaffolds             ── 新建文章时使用到的模板存放目录
├──scripts               ── hexo 扩展脚本
├──source                ── 资源目录。除 _posts 目录，已下划线(_)开始的的文件或文件夹和隐藏的文件将会被忽略。Markdown 和 HTML 文件会被解析并放到 public 文件夹，而其他文件会被拷贝过去。
|   ├──_data             ── 在我这个站点中，使用的 Butterfly 主题的配置文件目录
|   └──_posts            ── 存放原始文章的目录(hexo官方叫写作目录)。即所有书写的文章都应放在此目录下。
├──themes                ── 存放渲染站点的主题文件
├──_config.butterfly.yml ── Butterfly 主题的配置文件
├──_config.yml           ── hexo 的配置文件
├──.gitignore            ── git 对文件跟踪规则的配置文件
├──db.json               ── 使用 hexo generate 产生的缓存文件，官方建议此文件只存于本地，但如果内置参数 permalink 使用了 id 属性，最好是随配置文件一起备份或提交。
├──LICENSE               ── 使用 hexo init xxx 生成项目时默认出现的，表示 hexo-starter ： https://github.com/hexojs/hexo-starter 项目的开源许可协议
├──package-lock.json     ── 项目依赖实际使用的版本，npm官方建议随项目提交，但是Windows平台和mac平台此文件会有细微差别，所以我个人是不提交。
├──package.json          ── npm依赖管理文件
└──README.md             ── 本项目说明文件
```

## 操作步骤

1. 安装 nodejs
   下载地址：https://nodejs.org/zh-cn/download/  
   配置国内镜像用于加速下载依赖

   ```
   npm config set registry http://registry.npmmirror.com
   npm config set disturl https://npmmirror.com/mirrors/node/
   ```

2. 拉取此配置仓库

   ```
   git clone -b hexo git@github.com:sudot/sudot.github.io.git
   ```

3. 拉取笔记仓库

   ```
   git clone git@github.com:sudot/_post.git sudot.github.io/source/_posts
   ```

4. 安装项目依赖

   ```
   npm install
   ```

5. 创建文章

   命令：`hero new <名称>`

   命令：`hero new <文件夹>/<文件名> '标题'`

   简写：`hexo n <名称>`

6. 本地预览

   命令：`npm run dev` 或 `hexo server` 或 `npx hexo server`

   简写：`hexo s` 或 `npx hexo s`

7. 发布

   命令：`npm run build` 或 `hexo generate --deploy` 或 `hexo deploy --generate`

   简写：`hexo g -d` 或 `hexo d -g`

## 扩展部分

### 扩展文章图片支持本地显示

修改原因: markdown 天然对图片的嵌入支持不好，导致编辑器中和 hexo 部署后图片路径无法统一，而单纯修改 hexo 配置文件 `_config.yml` 中 `post_asset_folder` 为 `true` 也起不到很好的作用。

现象如下(文章的顶部图片未正常加载)：  
![文章的顶部图片未正常加载](images/replace-images-link-bad.png)

修改结果：本地预览和部署后可以使用相同的本地图片资源。优化后的效果如下：

![](images/replace-images-link-html.png)  
![](images/replace-images-link-good.png)

修改方式：

1. 修改 hexo 配置文件 `_config.yml` 中 `post_asset_folder` 为 `true`
   ```
   post_asset_folder: true
   ```
2. 增加过滤脚本。  
    在项目根目录`scripts`中，新增 `scripts\replace-images-link.js` 脚本，用于过滤符合存储规则的图片引用路径。
   ```
   top_img: 'Java开发入坑前端指南/20191125203657.png'
   cover: 'Java开发入坑前端指南/20191125203657.png'
   ![WorldWideWeb 模拟界面](Java开发入坑前端指南/1574242158505.png)
   ```
   替换为
   ```
   top_img: '/p/xxx/20191125203657.png'
   cover: '/p/xxx/20191125203657.png'
   ![WorldWideWeb 模拟界面](/p/xxx/1574242158505.png)
   ```
3. 按如下设置方式设置 typora 的图片引用
   ![](images/typora-images-setting.png)  
   ![](images/replace-images-link-good.png)

### 扩展文章引入支持 Markdown 语法

修改原因: markdown 文件中引入本地的另一个 markdown 文件，在本地可以正常显示，但是发布后路径引用错误。若使用 hexo 的标签方式引入，本地又无法显示了。

修改方式：

1. 修改 hexo 配置文件 `_config.yml` 中 `post_asset_folder` 为 `true`
   ```
   post_asset_folder: true
   ```
2. 增加过滤脚本。  
    在项目根目录`scripts`中，新增 `scripts\replace-post-link.js` 脚本，用于过滤符合规则的文章引用路径。
   ```
   - [配件说明](02-配件说明.md)
   - [COUNTIF](../../excel/COUNTIF.md)
   ```
   替换为
   ```
   [配件说明](/p/xxx/)
   [COUNTIF](/p/xxx/)
   ```

### 添加文章复制到其他平台发布的功能

> 此功能利用 `juice` 库，可以将文章复制为需要的格式，
> 但是 `juice` 和 `cheerio` 不支持浏览器中直接运行，
> 所以安装 `browserify` 工具将 `juice` 和 `cheerio` 转换为浏览器可用的 js 文件

1. 安装 browserify：`npm i browserify`

2. 将 juice 打包成浏览器可识别的 js 文件：`npx browserify -r juice -s juice > themes\Butterfly\source\js\third-party\juice.min.js`

3. 将 cheerio 打包成浏览器可识别的 js 文件：`npx browserify -r cheerio -s cheerio > themes\Butterfly\source\js\third-party\cheerio.min.js`

4. `themes\Butterfly\_config.yml` 中增加 `CDN: juice: /js/third-party/juice.min.js`

   ```yaml
   CDN:
     juice: /js/third-party/juice.min.js
     cheerio: /js/third-party/cheerio.min.js
   ```

5. `\themes\Butterfly\layout\includes\additional-js.pug` 增加 `script(src=url_for(theme.CDN.juice))` 和 `script(src=url_for(theme.CDN.cheerio))`

6. `themes/Butterfly/layout/includes/rightside.pug` 中增加复制按钮 `button#copy_to_wechat_mp(type="button" title=_p("rightside.copy_to_wechat_mp"))`

7. `themes\Butterfly\source\js\main.js` 中绑定按钮点击事件 `$rightsideEle.on('click', '#copy_to_wechat_mp', () => {})`
