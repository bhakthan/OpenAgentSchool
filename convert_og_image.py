#!/usr/bin/env python3
"""
Convert SVG to PNG for OpenGraph social media image
Requires: pip install cairosvg pillow
"""

import os
from pathlib import Path

try:
    import cairosvg
    from PIL import Image
    import io
except ImportError:
    print("Missing dependencies. Please install:")
    print("pip install cairosvg pillow")
    exit(1)

def convert_svg_to_png():
    # Paths
    current_dir = Path(__file__).parent
    svg_path = current_dir / "public" / "images" / "og-image.svg"
    png_path = current_dir / "public" / "images" / "og-image.png"
    
    # Ensure the images directory exists
    png_path.parent.mkdir(parents=True, exist_ok=True)
    
    print(f"Converting {svg_path} to {png_path}")
    
    # Convert SVG to PNG
    png_data = cairosvg.svg2png(
        url=str(svg_path),
        output_width=1200,
        output_height=630,
        background_color="transparent"
    )
    
    # Save the PNG
    with open(png_path, "wb") as f:
        f.write(png_data)
    
    print(f"✅ Successfully created {png_path}")
    print(f"📐 Dimensions: 1200x630px (OpenGraph standard)")
    
    # Verify the image
    with Image.open(png_path) as img:
        print(f"🔍 Verified: {img.size[0]}x{img.size[1]}px, {img.mode} mode")

if __name__ == "__main__":
    convert_svg_to_png()
