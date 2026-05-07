# Hexo 常用命令汇总（含GitHub Pages管理）

本文汇总Hexo项目开发、本地调试、部署发布及GitHub版本管理的全部常用命令，适配Hexo 6\.x\+版本，结合GitHub Pages部署场景，新手可直接复制使用，无需额外配置（除个性化参数外）。

## 一、Hexo 基础命令（项目初始化与日常开发）

### 1\. 环境准备（前提）

需提前安装 Node\.js（建议14\.x\+）和 Git，安装完成后，全局安装Hexo（仅首次需要）：

```bash
# 全局安装Hexo
npm install -g hexo-cli

# 验证安装成功（查看版本）
hexo -v
```

### 2\. 创建Hexo项目（首次搭建）

```bash
# 1. 创建项目目录（my-hexo-site 可替换为你的项目名）
hexo init my-hexo-site

# 2. 进入项目目录
cd my-hexo-site

# 3. 安装项目依赖（自动生成 node_modules）
npm install
```

执行完成后，项目目录会生成默认结构（\_config\.yml、source、themes等核心文件夹）。

### 3\. 本地服务（调试预览）

```bash
# 启动本地服务（默认端口 4000）
hexo server
# 简写：hexo s

# 自定义端口（避免端口冲突，如改为 8080）
hexo server -p 8080

# 开启热重载（修改代码后自动刷新页面，无需重启服务）
hexo server --debug
```

启动后，浏览器访问 `http://localhost:4000` 即可预览网站，调试时修改文章、配置后，页面会自动同步。

### 4\. 清理生成文件（解决缓存问题）

当修改主题、配置后页面无变化，或部署后出现异常，先执行清理命令：

```bash
# 清理 public 目录（生成的静态文件）和缓存
hexo clean
```

### 5\. 生成静态网站文件

将\.md文章、主题配置等，生成可部署的静态文件（html/css/js），存放在 public 目录：

```bash
# 生成静态文件
hexo generate
# 简写：hexo g
```

### 6\. 生成并部署（一键部署到GitHub Pages）

需先配置GitHub仓库（见下文第三部分），安装部署插件后，执行：

```bash
# 安装部署插件（仅首次需要）
npm install hexo-deployer-git --save

# 一键生成+部署（先clean清理，再generate生成，最后deploy部署）
hexo clean && hexo g -d
# 简写：hexo d -g（顺序：生成→部署，建议先clean，避免缓存问题）
```

⚠️ 关键补充（解决hexo d不生成gh\-pages、不推送问题）：执行hexo d前，必须完成以下配置，否则无法自动生成gh\-pages分支和推送。

## 二、Hexo Butterfly主题安装与配置

Butterfly是Hexo热门简约主题，支持响应式、自定义配置、插件扩展，适配博客、个人网站场景，以下是完整安装、配置流程（适配最新版Butterfly）。

### 1\. 安装Butterfly主题（两种方式可选）

方式一：Git克隆（推荐，便于后续更新主题）；方式二：下载压缩包（适合网络不佳场景）。

```bash
# 方式一：Git克隆（进入Hexo项目根目录执行）
cd my-hexo-site
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly

# 方式二：下载压缩包（手动解压到themes/butterfly目录）
# 1. 下载地址：https://github.com/jerryc127/hexo-theme-butterfly/archive/refs/heads/master.zip
# 2. 解压后，将文件夹重命名为butterfly，放入themes目录下
```

### 2\. 配置主题（核心步骤）

需修改Hexo根目录的配置文件（\_config\.yml），指定使用Butterfly主题，再配置主题基础参数。

```bash
# 1. 编辑Hexo根目录 _config.yml 文件（可用IDE或命令行编辑）
# 找到 theme: 配置项，修改为 butterfly（默认是 landscape）
theme: butterfly

# 2. （可选）复制主题配置文件（便于自定义修改，不影响主题更新）
# 进入Hexo根目录，执行以下命令，生成主题自定义配置文件
cp themes/butterfly/_config.yml _config.butterfly.yml
```

说明：后续主题配置（如网站标题、头像、菜单），优先修改根目录的 `\_config\.butterfly\.yml`，避免直接修改themes/butterfly下的配置文件（更新主题时会被覆盖）。

### 3\. 安装主题依赖（必做）

Butterfly主题依赖部分插件，需在Hexo根目录执行安装命令，否则会出现页面异常、功能缺失。

```bash
# 进入Hexo项目根目录
cd my-hexo-site

# 安装主题必需依赖
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

### 4\. 预览主题效果

配置完成后，启动本地服务，查看主题是否生效，若页面异常，先执行hexo clean清理缓存。

```bash
# 清理缓存（避免配置不生效）
hexo clean

# 启动本地服务，预览主题
hexo s
```

浏览器访问 `http://localhost:4000`，即可看到Butterfly主题的默认效果，后续可通过修改配置文件自定义样式。

### 5\. 主题基础配置（常用）

编辑根目录 `\_config\.butterfly\.yml`，修改以下常用配置（无需记住，直接复制修改即可）：

```yaml
# 1. 网站基础信息
title: 你的网站标题
subtitle: 你的网站副标题
description: 你的网站描述
avatar: /img/avatar.jpg  # 头像路径（放入source/img目录）

# 2. 菜单配置（自定义导航栏）
menu:
  首页: /
  文章: /archives/
  分类: /categories/
  标签: /tags/
  关于: /about/

# 3. 主题外观（可选）
theme_color:
  enable: true
  main: '#4285f4'  # 主题主色调

# 4. 评论功能（可选，需自行配置第三方评论，如Valine）
valine:
  enable: false
  appId: 你的Valine AppId
  appKey: 你的Valine AppKey
```

### 6\. 主题更新（可选）

若使用Git克隆方式安装主题，可快速更新到最新版本：

```bash
# 进入主题目录
cd themes/butterfly

# 拉取最新主题代码
git pull

# 回到Hexo根目录，清理缓存并重启服务
cd ../
hexo clean && hexo s
```

### 7\. 常见问题

```bash
# 1. 启动服务后，页面空白/样式错乱
# 解决方案：重新安装依赖，清理缓存
npm install hexo-renderer-pug hexo-renderer-stylus --save
hexo clean && hexo s

# 2. 主题更新后，自定义配置丢失
# 解决方案：确保自定义配置都写在根目录 _config.butterfly.yml 中，而非主题目录的配置文件

# 3. 头像/图片无法显示
# 解决方案：将图片放入source/img目录，配置路径时写 /img/图片名.后缀
```

## 三、GitHub 版本管理命令（开发目录修改历史管理）

核心原则：1个GitHub仓库，2个分支（main分支存开发源码，gh\-pages分支存部署的静态文件），无需创建2个仓库。

### 1\. 初始化Git仓库（项目内首次配置）

```bash
# 进入Hexo项目目录（确保在 my-hexo-site 下）
cd my-hexo-site

# 初始化Git（仅首次执行）
git init

# 创建 .gitignore 文件（忽略无用文件，避免提交冗余）
# 直接复制以下内容到 .gitignore 文件中
cat > .gitignore << EOF
node_modules/
public/
.deploy_git/
*.log
.DS_Store
db.json
EOF
```

### 2\. 绑定GitHub远程仓库

```bash
# 替换为你的GitHub仓库地址（HTTPS或SSH均可）
git remote add origin https://github.com/你的用户名/你的仓库名.git

# 查看远程仓库是否绑定成功
git remote -v
```

### 3\. 开发源码提交与推送（管理修改历史）

每次修改文章、配置、主题后，提交到main分支，保存修改历史：

```bash
# 1. 添加所有修改的文件（. 表示全部，也可指定单个文件）
git add .

# 2. 提交修改（备注清晰，方便后续回溯，如“新增xxx文章”“修改主题配置”）
git commit -m "备注信息：新增Hexo常用命令汇总文章"

# 3. 推送到GitHub main分支（首次推送加 -u，后续可省略）
git push -u origin main
# 后续推送直接执行：git push
```

### 4\. 分支相关命令（补充）

```bash
# 查看当前分支（默认main分支）
git branch

# 查看所有分支（含远程分支，gh-pages分支由部署命令自动创建）
git branch -a

# 切换分支（如需手动操作gh-pages分支，不推荐新手）
git checkout gh-pages
```

## 四、hexo d 无法生成gh\-pages分支、不自动推送的排查与解决

核心原因：**部署插件未正确安装** 或 **\_config\.yml 中deploy配置错误**（最常见），按以下步骤逐一排查，新手可照做。

### 1\. 第一步：确认部署插件（hexo\-deployer\-git）已正确安装

这是最基础的前提，插件未安装或安装失败，hexo d会无效，无法生成gh\-pages分支。

```bash
# 1. 进入Hexo根目录（确保在my-hexo-site下）
cd my-hexo-site

# 2. 查看插件是否已安装（查看node_modules中是否有hexo-deployer-git）
ls node_modules | grep hexo-deployer-git

# 3. 若未找到（无输出），重新安装插件（必做）
npm install hexo-deployer-git --save

# 4. 安装完成后，再次验证（有输出即成功）
ls node_modules | grep hexo-deployer-git
```

补充：若安装失败，可更换npm源后重新安装（解决网络问题）：

```bash
# 更换淘宝npm源
npm config set registry https://registry.npm.taobao.org

# 重新安装插件
npm install hexo-deployer-git --save
```

### 2\. 第二步：检查 \_config\.yml 中 deploy 配置（最关键，90%的问题出在这里）

hexo d 会读取根目录 \_config\.yml 中的deploy配置，配置错误会导致无法推送、不生成gh\-pages分支，需严格按以下格式配置（缩进、参数均不能错）。

```yaml
# 1. 打开根目录 _config.yml 文件（用IDE或记事本编辑）
# 2. 找到最底部的deploy配置，修改为以下内容（替换成你的仓库地址）
deploy:
  type: git  # 固定值，不能改，指定部署方式为git
  repo: https://github.com/你的用户名/你的仓库名.git  # 替换成你的GitHub仓库地址（HTTPS/SSH均可）
  branch: gh-pages  # 固定值，指定推送到gh-pages分支（自动生成该分支）
  message: Site updated: {{ now("YYYY-MM-DD HH:mm:ss") }}  # 可选，自定义提交信息，可省略
```

⚠️ 重点注意（缩进错误会直接导致配置失效）：

- deploy: 后面的参数（type、repo、branch），必须缩进 **2个空格**（不能用Tab，YAML格式对缩进敏感）；

- repo地址必须正确，可从GitHub仓库复制（仓库页面 → Code → 复制HTTPS地址）；

- branch必须写 gh\-pages（小写，不能写错），hexo d会自动在GitHub仓库创建该分支。

### 3\. 第三步：确认已生成静态文件（public目录）

hexo d 本质是推送 hexo g 生成的public目录内容，若未生成public目录，部署会无效，无任何推送操作。

```bash
# 1. 先执行清理命令（避免缓存导致public目录异常）
hexo clean

# 2. 生成public目录（必须执行，否则无内容可推送）
hexo g

# 3. 查看public目录是否生成（有输出即成功）
ls public
```

若ls public无输出，说明hexo g执行失败，需检查是否有报错（如主题配置错误），解决后重新执行hexo g。

### 4\. 第四步：确认GitHub仓库已绑定（本地与远程仓库连接正常）

若本地未绑定GitHub远程仓库，hexo d无法推送内容，自然不会生成gh\-pages分支。

```bash
# 1. 查看本地是否已绑定远程仓库（有origin相关输出即正常）
git remote -v

# 2. 若无输出（未绑定），重新绑定（替换成你的仓库地址）
git remote add origin https://github.com/你的用户名/你的仓库名.git

# 3. 再次验证绑定是否成功
git remote -v
```

### 5\. 第五步：重新执行部署命令（验证配置是否生效）

完成以上4步后，执行以下命令，即可自动生成gh\-pages分支并推送内容：

```bash
# 一键清理、生成、部署（推荐，避免缓存问题）
hexo clean && hexo g -d
```

执行后，查看终端输出：若出现「Branch \&\#39;gh\-pages\&\#39; set up to track remote branch \&\#39;gh\-pages\&\#39; from \&\#39;origin\&\#39;」，说明gh\-pages分支已自动创建并推送成功。

### 6\. 常见异常补充（若仍失败）

```bash
# 异常1：终端提示「fatal: could not read Username for 'https://github.com': No such device or address」
# 解决方案：GitHub仓库地址改用SSH格式（需提前配置SSH密钥），替换repo地址为：
# git@github.com:你的用户名/你的仓库名.git

# 异常2：执行hexo d无任何提示，也无报错
# 解决方案：删除根目录的 .deploy_git 文件夹，重新执行 hexo clean && hexo g -d

# 异常3：提示「permission denied」（权限不足）
# 解决方案：检查GitHub仓库权限，确保当前账号有推送权限，或重新配置SSH密钥
```

## 五、日常开发标准流程（推荐）

```bash
# 1. 进入Hexo项目目录
cd my-hexo-site

# 2. 启动本地服务，调试文章/配置
hexo s

# 3. 修改完成后，清理缓存、生成静态文件
hexo clean && hexo g

# 4. 提交开发源码到GitHub（保存修改历史）
git add .
git commit -m "修改xxx内容"
git push

# 5. 部署到GitHub Pages，让网站生效
hexo d
```

## 六、常见问题补充命令

```bash
# 1. 撤销本地修改（未git add的情况下）
git checkout -- 文件名（如 _config.yml）

# 2. 撤销git add的文件（已add未commit）
git reset HEAD 文件名

# 3. 查看提交历史（回溯修改记录）
git log

# 4. 强制推送（谨慎使用！仅当远程分支与本地冲突，且确认本地正确时）
git push -f origin main

# 5. 安装主题后，更新主题依赖
cd themes/你的主题名
npm install
```

## 七、关键注意事项

- 部署前需在 Hexo 配置文件 `\_config\.yml` 中，配置deploy参数（仓库地址、分支为gh\-pages）。

- public目录和node\_modules目录无需提交到GitHub，已在\.gitignore中忽略。

- 若部署后GitHub Pages无法访问，检查仓库Settings → Pages，确认分支为gh\-pages、目录为/root。

- 每次部署前建议先执行hexo clean，避免缓存导致的部署异常。

> （注：文档部分内容可能由 AI 生成）
