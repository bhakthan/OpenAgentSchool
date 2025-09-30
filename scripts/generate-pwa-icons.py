"""
PWA Icon Generator
Generates all required PWA icon sizes from a source image.

Requirements:
- Pillow (pip install Pillow)
- Source image: 512x512 PNG (transparent or solid background)

Usage:
    python scripts/generate-pwa-icons.py [source_image_path]
    
Output:
    public/icons/icon-{size}x{size}.png (8 sizes)
    public/icons/maskable-icon-{size}x{size}.png (Android adaptive icons)
    public/favicon.ico (multi-resolution)
"""

import sys
import os
from pathlib import Path

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("❌ Pillow is required. Install it with: pip install Pillow")
    sys.exit(1)

# Icon sizes required for PWA
ICON_SIZES = [
    72,   # Android Chrome (ldpi)
    96,   # Android Chrome (mdpi)
    128,  # Android Chrome (hdpi)
    144,  # Android Chrome (xhdpi)
    152,  # iOS (iPad non-retina)
    192,  # Android Chrome (xxhdpi), PWA install
    384,  # Android Chrome (xxxhdpi)
    512,  # PWA splash screen, Android Chrome
]

# Favicon sizes (for favicon.ico)
FAVICON_SIZES = [16, 32, 48]

def create_maskable_icon(img: Image.Image, size: int, safe_zone_percent: int = 80) -> Image.Image:
    """
    Create a maskable icon with safe zone for Android adaptive icons.
    The safe zone ensures the icon content is visible in any mask shape.
    
    Args:
        img: Source image
        size: Output size
        safe_zone_percent: Percentage of the icon that should be in the safe zone (default 80%)
    
    Returns:
        Maskable icon image
    """
    # Create new image with white background
    maskable = Image.new('RGBA', (size, size), (255, 255, 255, 255))
    
    # Calculate safe zone size
    safe_size = int(size * safe_zone_percent / 100)
    
    # Resize source image to fit safe zone
    img_resized = img.resize((safe_size, safe_size), Image.Resampling.LANCZOS)
    
    # Center the image
    offset = (size - safe_size) // 2
    maskable.paste(img_resized, (offset, offset), img_resized if img_resized.mode == 'RGBA' else None)
    
    return maskable

def generate_icons(source_path: str, output_dir: str = 'public/icons'):
    """
    Generate all PWA icons from source image.
    
    Args:
        source_path: Path to source image (512x512 recommended)
        output_dir: Output directory for icons
    """
    # Create output directory
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    # Load source image
    print(f"📂 Loading source image: {source_path}")
    try:
        source_img = Image.open(source_path)
    except FileNotFoundError:
        print(f"❌ Source image not found: {source_path}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error loading image: {e}")
        sys.exit(1)
    
    # Convert to RGBA if needed
    if source_img.mode != 'RGBA':
        print("⚠️  Converting image to RGBA mode...")
        source_img = source_img.convert('RGBA')
    
    # Warn if source is not 512x512
    if source_img.size != (512, 512):
        print(f"⚠️  Source image is {source_img.size[0]}x{source_img.size[1]}, recommended: 512x512")
        print("   Resizing to 512x512...")
        source_img = source_img.resize((512, 512), Image.Resampling.LANCZOS)
    
    print(f"✅ Source image loaded: {source_img.size[0]}x{source_img.size[1]}, mode: {source_img.mode}")
    
    # Generate standard icons
    print("\n🎨 Generating standard icons...")
    for size in ICON_SIZES:
        icon = source_img.resize((size, size), Image.Resampling.LANCZOS)
        icon_path = output_path / f'icon-{size}x{size}.png'
        icon.save(icon_path, 'PNG', optimize=True)
        print(f"   ✓ icon-{size}x{size}.png ({icon_path.stat().st_size // 1024}KB)")
    
    # Generate maskable icons (Android adaptive)
    print("\n🎭 Generating maskable icons (Android adaptive)...")
    for size in [192, 512]:  # Only generate maskable for common sizes
        maskable = create_maskable_icon(source_img, size, safe_zone_percent=80)
        maskable_path = output_path / f'maskable-icon-{size}x{size}.png'
        maskable.save(maskable_path, 'PNG', optimize=True)
        print(f"   ✓ maskable-icon-{size}x{size}.png ({maskable_path.stat().st_size // 1024}KB)")
    
    # Generate favicon.ico (multi-resolution)
    print("\n🌐 Generating favicon.ico...")
    favicon_images = []
    for size in FAVICON_SIZES:
        favicon_img = source_img.resize((size, size), Image.Resampling.LANCZOS)
        favicon_images.append(favicon_img)
    
    favicon_path = Path('public') / 'favicon.ico'
    favicon_images[0].save(
        favicon_path,
        format='ICO',
        sizes=[(img.size[0], img.size[1]) for img in favicon_images],
        append_images=favicon_images[1:]
    )
    print(f"   ✓ favicon.ico (16x16, 32x32, 48x48) ({favicon_path.stat().st_size // 1024}KB)")
    
    # Generate apple-touch-icon (180x180 for iOS)
    print("\n🍎 Generating Apple touch icons...")
    for size in [152, 167, 180]:
        apple_icon = source_img.resize((size, size), Image.Resampling.LANCZOS)
        apple_path = output_path / f'apple-touch-icon-{size}x{size}.png'
        apple_icon.save(apple_path, 'PNG', optimize=True)
        print(f"   ✓ apple-touch-icon-{size}x{size}.png ({apple_path.stat().st_size // 1024}KB)")
    
    # Summary
    total_size = sum(f.stat().st_size for f in output_path.glob('*.png')) + favicon_path.stat().st_size
    print(f"\n✨ Done! Generated {len(list(output_path.glob('*.png')))} icons + favicon.ico")
    print(f"📦 Total size: {total_size / 1024:.1f}KB")
    print(f"📂 Output directory: {output_path.absolute()}")
    
    # Update manifest.json reminder
    print("\n📝 Next steps:")
    print("   1. Update public/manifest.json with icon paths")
    print("   2. Update index.html with favicon and apple-touch-icon links")
    print("   3. Test icons in browser DevTools → Application → Manifest")

def create_placeholder_icon(size: int = 512) -> Image.Image:
    """
    Create a placeholder icon with Open Agent School branding.
    
    Args:
        size: Icon size (default 512)
    
    Returns:
        Placeholder icon image
    """
    # Create gradient background
    img = Image.new('RGBA', (size, size), (59, 130, 246, 255))  # Blue-500
    draw = ImageDraw.Draw(img)
    
    # Draw simple geometric pattern (triangle + circle)
    margin = size // 4
    
    # Triangle (representing learning/progression)
    triangle_points = [
        (size // 2, margin),           # Top
        (margin, size - margin),        # Bottom left
        (size - margin, size - margin)  # Bottom right
    ]
    draw.polygon(triangle_points, fill=(255, 255, 255, 200))
    
    # Circle (representing AI/agents)
    circle_radius = size // 6
    circle_center = (size // 2, size // 2 + margin // 2)
    draw.ellipse(
        [
            circle_center[0] - circle_radius,
            circle_center[1] - circle_radius,
            circle_center[0] + circle_radius,
            circle_center[1] + circle_radius
        ],
        fill=(255, 255, 255, 255)
    )
    
    return img

if __name__ == '__main__':
    print("🎨 PWA Icon Generator for Open Agent School\n")
    
    # Get source image path
    if len(sys.argv) > 1:
        source_path = sys.argv[1]
    else:
        # Check for default source locations
        default_sources = [
            'public/logo.png',
            'public/icon-512x512.png',
            'src/assets/logo.png',
            'assets/logo.png'
        ]
        
        source_path = None
        for path in default_sources:
            if os.path.exists(path):
                source_path = path
                print(f"📌 Using default source: {source_path}")
                break
        
        if not source_path:
            print("⚠️  No source image provided and no default found.")
            print("   Creating placeholder icon...")
            placeholder = create_placeholder_icon(512)
            placeholder_path = Path('public/icons/placeholder-512x512.png')
            placeholder_path.parent.mkdir(parents=True, exist_ok=True)
            placeholder.save(placeholder_path, 'PNG')
            source_path = str(placeholder_path)
            print(f"   ✓ Placeholder created: {source_path}")
            print("\n   💡 Tip: Replace with your own icon and re-run:")
            print(f"      python {sys.argv[0]} path/to/your/icon.png\n")
    
    # Generate icons
    generate_icons(source_path)
