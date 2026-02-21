#!/bin/bash

echo "🚀 CI_POST_CLONE STARTING..."

# 1. Přidání cest k Homebrew a Node (Tohle ti chybí!)
export PATH=/usr/local/bin:/opt/homebrew/bin:$PATH

# Kontrola, jestli už node vidíme
echo "📍 Node version: $(node -v)"
echo "📍 NPM version: $(npm -v)"

# 2. Najít kořen projektu
cd "$(dirname "$0")/../.." || exit 1
echo "📍 Current dir: $(pwd)"

# 3. Instalace závislostí
echo "📦 Installing npm dependencies..."
# Použijeme --legacy-peer-deps pro jistotu
npm install --legacy-peer-deps

# 4. Instalace Podů
echo "🍎 Installing CocoaPods..."
cd ios || exit 1

# V Xcode Cloudu je někdy potřeba použít bundle exec nebo specifikovat cestu
pod install

echo "✅ CI_POST_CLONE FINISHED!"
exit 0