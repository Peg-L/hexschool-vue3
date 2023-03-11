#!/usr/bin/env sh

# 发生任何错误时终止
set -e

# 构建
npm run build

# 进入输出产物文件夹
cd dist

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# 如果你要部署在 https://Peg-L.github.io
# git push -f git@github.com:Peg-L/Peg-L.github.io.git master

# 如果你要部署在 https://Peg-L.github.io/vite-deploy-week6
git push -f git@github.com:Peg-L/vite-deploy-week6.git master:gh-pages

cd -