#!/bin/bash

# Simple build script for the resume website
echo "Building Jason Yu's Resume Website..."

# Check if sass is installed
if ! command -v sass &> /dev/null; then
    echo "Installing Sass..."
    npm install -g sass
fi

# Compile SCSS to CSS
echo "Compiling SCSS to CSS..."
sass scss/resume.scss css/resume.css

# Create minified version
echo "Creating minified CSS..."
sass scss/resume.scss css/resume.min.css --style compressed

# Minify JavaScript (simple approach)
echo "Minifying JavaScript..."
if command -v uglifyjs &> /dev/null; then
    uglifyjs js/resume.js -o js/resume.min.js
else
    echo "UglifyJS not found, copying JS file without minification..."
    cp js/resume.js js/resume.min.js
fi

echo "Build completed successfully!"
echo "You can now open index.html in your browser or run 'python3 -m http.server 8000' to serve locally."
