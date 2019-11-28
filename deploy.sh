### 
# @Description: 
 # @Author: linjy
 # @Date: 2019-08-09 22:39:03
 # @LastEditTime: 2019-08-09 22:52:12
 # @LastEditors: linjy
 ###
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 进入生成的文件夹
# cd docs/.vuepress/dist
cd dist

git init
git add -A
git commit -m '🎉deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Jecyu/Fe-Auto-Testing.git master:gh-pages

cd -