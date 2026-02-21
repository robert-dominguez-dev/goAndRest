# Navigate to the project directory
cd "$CI_PRIMARY_REPOSITORY_PATH" || exit 1
echo "CURRENT DIRECTORY: $(pwd)"

# Install Node.js and CocoaPods
echo "NODE INSTALLATION..."
brew install node
echo "COCOAPODS INSTALLATION..."
brew install cocoapods

# Install npm dependencies
echo "NPM DEPENDENCIES AND PODS INSTALLATION..."
npm run deps

exit 0
