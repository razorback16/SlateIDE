#!/bin/bash

# Script to generate icons with macOS-specific padding
# 1. Generate all icons from regular SVG
# 2. Generate macOS icons from padded SVG to temp directory
# 3. Copy only icon.icns to replace the regular one
# 4. Clean up temp files

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REGULAR_SVG="$PROJECT_ROOT/assets/images/slate-logo.svg"
MACOS_SVG="$PROJECT_ROOT/assets/images/slate-logo-mac.svg"
ICONS_DIR="$PROJECT_ROOT/src-tauri/icons"
TEMP_DIR="$PROJECT_ROOT/.temp-icons"

echo "🚀 Starting icon generation process..."

# Step 1: Generate all icons from regular SVG
echo "📱 Generating all platform icons from regular SVG..."
tauri icon "$REGULAR_SVG" --output "$ICONS_DIR"

# Step 2: Generate macOS icons from padded SVG to temp directory
echo "🍎 Generating macOS icons with padding to temp directory..."
mkdir -p "$TEMP_DIR"
tauri icon "$MACOS_SVG" --output "$TEMP_DIR"

# Step 3: Copy only the macOS icon file (icon.icns) to replace the regular one
echo "🔄 Replacing macOS icon with padded version..."
if [ -f "$TEMP_DIR/icon.icns" ]; then
    cp "$TEMP_DIR/icon.icns" "$ICONS_DIR/icon.icns"
    echo "✅ Successfully replaced icon.icns with padded version"
else
    echo "❌ Error: icon.icns not found in temp directory"
    exit 1
fi

# Step 4: Clean up temp files
echo "🧹 Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

echo "🎉 Icon generation completed successfully!"
echo "   - All platform icons generated from: $REGULAR_SVG"
echo "   - macOS icon (icon.icns) replaced with padded version from: $MACOS_SVG"
