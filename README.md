# PhotoEditorApp

A web-based photo editor built with React + TypeScript (Vite), with a Python backend (FastAPI) for image processing.

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

1. Click **File → Open** and choose an image, or **File → New** to create a blank canvas.
2. Use the **Image** menu to rotate or flip the image.
3. Click **File → Save** to download as PNG, or **File → Save as** to choose a name and format.
4. Click **File → Properties** to see the image's name, size and dimensions.

### Features

| Feature | Status |
|---|---|
| File → New, Open, Save, Save as, Properties | ✅ Done |
| File → Quit | In progress |
| Image → Rotate left/right, Flip horizontal/vertical (Python) | ✅ Done |
| Colour palette | ✅ Done |
| Thresholding experiment (Python) | ✅ Done |
| Filters (Gaussian, Sobel, Binary, Otsu) in the app | Planned |
