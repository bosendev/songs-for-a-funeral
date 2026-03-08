#!/bin/bash

echo "🔨 Building assets..."
npm run build

echo "🔄 Switching to production environment..."
cp .env .env.local.bak
cp .env.production .env
ddev restart

echo "⚙️ Generating static site..."
ddev craft ssg/static/generate

echo "📄 Generating work index..."
curl https://songs-for-a-funeral.ddev.site/work -o storage/static/work/index.html

echo "🗺️ Generating sitemap..."
curl https://songs-for-a-funeral.ddev.site/sitemap.xml -o storage/static/sitemap.xml

echo "🔄 Restoring local environment..."
cp .env.local.bak .env
ddev restart

echo "📁 Copying uploads..."
cp -r web/uploads storage/static/uploads

echo "✅ Ready to deploy — drag storage/static/ to Netlify"
