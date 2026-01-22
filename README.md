# Gridlines Studio

A lightweight, browser-based tool for adding customizable grid overlays to any image. Perfect for designers, artists, photographers, and anyone who needs precise grid references on their images.

![Gridlines Studio](https://img.shields.io/badge/Status-Active-success) ![License](https://img.shields.io/badge/License-MIT-blue) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)

## Features

- **Real-time Grid Preview** - See your grid changes instantly as you adjust settings
- **Drag & Drop Support** - Simply drop images directly onto the canvas area
- **Fully Customizable Grid**:
  - Adjustable rows and columns (1-200 each)
  - Line thickness control (1-100px)
  - Custom grid color with color picker
  - Opacity slider for transparent overlays
- **Cell Numbering** - Optional sequential numbering in each grid cell
- **High-Quality Export** - Downloads as PNG at original image resolution
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Zero Dependencies** - Pure HTML, CSS, and vanilla JavaScript

## Getting Started

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/gridlines.git
cd gridlines
```

2. Open `index.html` in your web browser

That's it! No build process, no dependencies, no installation required.

### Usage

1. **Upload an Image**
   - Click the file input and select an image, OR
   - Drag and drop an image directly onto the canvas area

2. **Customize Your Grid**
   - Set the number of rows and columns
   - Adjust line thickness
   - Pick a grid color
   - Set opacity for transparency
   - Toggle cell numbering on/off

3. **Export**
   - Click "Save image" to download your grid-overlayed image as a PNG
   - The export maintains your original image resolution

## File Structure

```
gridlines/
├── index.html      # Main HTML structure
├── styles.css      # All styling and responsive design
├── app.js          # Core application logic
└── README.md       # This file
```

## How It Works

Gridlines Studio uses the HTML5 Canvas API to render grids over images:

1. **Image Loading**: Images are loaded via FileReader API and rendered onto a canvas
2. **Grid Rendering**: Mathematical calculations determine grid line positions based on row/column counts
3. **Real-time Updates**: Any setting change triggers a complete canvas redraw
4. **Export**: Canvas content is converted to PNG data URL for download

### Key Functions

- `drawGrid()` - Renders the image with overlay grid and optional cell numbers
- `handleImage()` - Processes image uploads via file input or drag-drop
- `handleDownload()` - Exports the canvas as a PNG file
- `getSettings()` - Validates and returns current grid settings
- `hexToRgb()` - Converts hex colors to RGB for opacity handling

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires modern browser features:
- FileReader API
- Canvas API
- ES6+ JavaScript
- CSS Grid

## Customization

### Changing Default Settings

Edit the default values in `index.html`:

```html
<input id="rowsInput" type="number" value="3" />      <!-- Default rows -->
<input id="colsInput" type="number" value="3" />      <!-- Default columns -->
<input id="thicknessInput" type="number" value="2" /> <!-- Default thickness -->
<input id="colorInput" type="color" value="#ffffff" /> <!-- Default color -->
<input id="opacityInput" type="range" value="0.7" />  <!-- Default opacity -->
```

### Styling

Modify `styles.css` to customize:
- Color scheme (CSS variables in `:root`)
- Layout breakpoints
- Component styling
- Animations and transitions

### Adding Features

The `app.js` file is well-organized and easy to extend:

```javascript
// Example: Add a new grid pattern
function drawCustomPattern() {
  // Your custom pattern logic here
}
```

## Performance Considerations

- **Large Images**: Original resolution images are preserved, so very large files may take longer to process
- **Export Speed**: PNG generation depends on image size and grid complexity
- **Browser Memory**: Extremely high-resolution images (>10,000px) may be limited by browser memory

## Known Limitations

- Maximum grid dimensions: 200x200 cells
- Single image processing (no batch export)
- Export format limited to PNG
- No save/load of grid presets

## Troubleshooting

**Image won't load**
- Ensure the file is a valid image format (PNG, JPG, GIF, WebP)
- Check browser console for errors

**Export fails**
- Verify your browser allows downloads
- Check available disk space
- Try a smaller image if you hit browser memory limits

**Grid lines not visible**
- Increase opacity setting
- Choose a contrasting color
- Reduce line thickness if it's too thick

## Contributing

Contributions are welcome! Areas for improvement:
- Batch image processing
- Save/load grid presets
- Additional export formats (JPG, WebP)
- Grid pattern options (dashed, dotted, etc.)
- Undo/redo functionality

## License

MIT License - feel free to use this project for any purpose.

## Credits

Built with vanilla web technologies—no frameworks, no build tools, no complexity.

## Acknowledgments

- Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and [Unbounded](https://fonts.google.com/specimen/Unbounded) by Google Fonts
- Canvas API by MDN Web Docs

---

Made with ❤️ for designers and artists who need precision grids.
