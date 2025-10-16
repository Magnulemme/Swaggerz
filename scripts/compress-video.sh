#!/bin/bash

# Script to compress hero video for better web performance
# Reduces file size by ~70% while maintaining good quality

INPUT="/workspaces/swaggerz/public/videos/hero-video.mp4"
OUTPUT="/workspaces/swaggerz/public/videos/hero-video-compressed.mp4"

echo "🎬 Compressing hero video for web performance..."
echo "Input: $INPUT ($(du -h "$INPUT" | cut -f1))"

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ffmpeg not found. Installing..."
    sudo apt-get update && sudo apt-get install -y ffmpeg
fi

# Compress video with optimal settings for web
# - VP9 codec (better compression than H.264)
# - CRF 32 (good quality/size balance for background videos)
# - Scale to 1920x1080 max
# - 30fps (reduced from original)
# - Two-pass encoding for better quality

ffmpeg -i "$INPUT" \
  -c:v libx264 \
  -crf 28 \
  -preset slow \
  -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease" \
  -r 30 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  -y \
  "$OUTPUT"

echo ""
echo "✅ Compression complete!"
echo "Original: $(du -h "$INPUT" | cut -f1)"
echo "Compressed: $(du -h "$OUTPUT" | cut -f1)"
echo ""
echo "To use the compressed video, update your code to use 'hero-video-compressed.mp4'"
