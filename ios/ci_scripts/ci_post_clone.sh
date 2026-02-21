#!/bin/bash

echo "🚀 CI_POST_CLONE STARTING..."

# Najít kořen projektu
cd "$(dirname "$0")/../.." || exit 1
echo "📍 Current dir: $(pwd)"

# Instalace závislostí
echo "📦 Installing npm dependencies..."
npm install --frozen-lockfile || npm install

# Instalace Podů
echo "🍎 Installing CocoaPods..."
cd ios || exit 1
pod install

echo "✅ CI_POST_CLONE FINISHED!"
exit 0