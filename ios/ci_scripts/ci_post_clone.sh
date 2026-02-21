#!/bin/bash

echo "🚀 CI_POST_CLONE STARTING..."

# 1. Install Node.js and CocoaPods using Homebrew
# Since the environment is missing these tools, we must install them manually
echo "🍺 Installing Node and CocoaPods via Homebrew..."
brew install node
brew install cocoapods

# 2. Navigate to the project root directory
cd "$(dirname "$0")/../.." || exit 1
echo "📍 Current dir: $(pwd)"

# 3. Install npm dependencies
echo "📦 Installing npm dependencies..."
# Using --legacy-peer-deps to handle potential version conflicts
npm install --legacy-peer-deps

# 4. Install CocoaPods
echo "🍎 Installing CocoaPods..."
cd ios || exit 1
pod install

echo "✅ CI_POST_CLONE FINISHED!"
exit 0