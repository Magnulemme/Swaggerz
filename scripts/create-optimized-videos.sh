#!/bin/bash

# Script to create optimized video versions for different browsers and connections
# Creates: WebM (VP9) and MP4 (H.264) versions at different qualities

INPUT="/workspaces/swaggerz/public/videos/hero-video.mp4"
OUTPUT_DIR="/workspaces/swaggerz/public/videos"

echo "🎬 Creating optimized video versions..."
echo "Input: $INPUT ($(du -h "$INPUT" | cut -f1))"

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ffmpeg not found. Installing..."
    sudo apt-get update && sudo apt-get install -y ffmpeg
fi

echo ""
echo "📦 Creating WebM version (best compression)..."
ffmpeg -i "$INPUT" \
  -c:v libvpx-vp9 \
  -crf 35 \
  -b:v 0 \
  -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease" \
  -r 30 \
  -an \
  -row-mt 1 \
  -threads 4 \
  -y \
  "$OUTPUT_DIR/hero-video.webm"

echo ""
echo "📦 Creating optimized MP4 version (fallback)..."
ffmpeg -i "$INPUT" \
  -c:v libx264 \
  -crf 30 \
  -preset slow \
  -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease" \
  -r 30 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -profile:v main \
  -level 4.0 \
  -an \
  -y \
  "$OUTPUT_DIR/hero-video-optimized.mp4"

echo ""
echo "✅ Optimization complete!"
echo ""
echo "📊 File sizes:"
echo "Original:     $(du -h "$INPUT" | cut -f1)"
echo "WebM (VP9):   $(du -h "$OUTPUT_DIR/hero-video.webm" | cut -f1)"
echo "MP4 (H.264):  $(du -h "$OUTPUT_DIR/hero-video-optimized.mp4" | cut -f1)"
echo ""
echo "💡 WebM provides ~40% better compression than MP4"
echo "💡 Use <video> with multiple <source> tags for best compatibility"
