# PhotoEditorApp

A web-based photo editor built with React + TypeScript (Vite), with a Python backend (FastAPI + OpenCV/NumPy) for image processing.

## Requirements

- [Node.js](https://nodejs.org) (current LTS version)
- [Python](https://www.python.org) 3.10 or newer
- Git

## Installation

The app needs **two servers running at the same time**: the Python backend and the frontend. Use two terminals.

### 1. Clone the repository

```bash
git clone https://github.com/MoZy-ctrl/PhotoEditorApp.git
cd PhotoEditorApp
```

### 2. Python backend (terminal 1)

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

- Windows: `.venv\Scripts\activate`
- macOS/Linux: `source .venv/bin/activate`

Install dependencies and start the API:

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

The API runs on http://localhost:8000. You can test it at http://localhost:8000/docs.

### 3. Frontend (terminal 2)

From the project root:

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

### Thresholding experiment (optional)

With the virtual environment active, from `backend/`:

```bash
python binary_threshold.py
```

Results are saved in `backend/results/`.

## Usage

1. **File → Open** to choose an image, or **File → New** to create a blank canvas with custom size and colour.
2. Pick a tool in the sidebar:
   - **Brush** – draw with the selected colour and brush size
   - **Eraser** – removes strokes and restores the image underneath
   - **Select** – drag a rectangle, then use **Image → Crop**
   - **Picker** – click the image to pick a colour
   - **Shapes** – rectangle, ellipse or line, with optional fill colour
3. **Image** menu: rotate, flip, resize and crop.
4. **Filters** in the sidebar: Binary, Gaussian, Sobel and Otsu (processed in Python).
5. **View → Zoom in / Zoom out** to change the display size.
6. **Undo / Redo** in the header to step back and forth through changes.
7. **File → Save** downloads as PNG, **File → Save as** lets you choose name and format (PNG/JPG).
8. **File → Properties** shows the image's name, size and dimensions.

## Features

| Requirement | Feature | Status |
|---|---|---|
| File | New, Open, Save, Save as, Properties, Quit | ✅ Done |
| Clipboard | Copy, Paste, Cut | ❌ Not implemented |
| Image | Rectangular selection, Crop, Resize | ✅ Done |
| Image | Rotate left/right, Flip horizontal/vertical (Python) | ✅ Done |
| Image | Lasso and polygon selection | ❌ Not implemented |
| Tools | Zoom in/out | ✅ Done |
| Tools | Eraser, Color picker, Brush | ✅ Done |
| Tools | Filters: Gaussian, Sobel, Binary (Python) | ✅ Done |
| Tools | Histogram thresholding – Otsu's method (Python) | ✅ Done |
| Tools | Textured brushes, Text box | ❌ Not implemented |
| Shapes | Rectangle, ellipse, line, outline and fill colour | ✅ Done |
| Colors | Colour palette, brush size | ✅ Done |
| Extra | Undo / Redo | ✅ Done |
| Optional | Layers, Snapchat filters | ❌ Not implemented |

> Tools and colours are placed in the sidebar instead of top menus for quicker access.
