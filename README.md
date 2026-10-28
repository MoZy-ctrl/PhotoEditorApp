# PhotoEditorApp

A web-based photo editor built with React + TypeScript (Vite), with a Python backend for image processing.

## Requirements

- [Node.js](https://nodejs.org) (current LTS version)
- [Python](https://www.python.org) 3.10 or newer
- Git

## Installation

### 1. Clone the repository

```bash
git clone <repo-url>
cd PhotoEditorApp
```

### 2. Frontend

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

### 3. Python backend

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

- Windows: `.venv\Scripts\activate`
- macOS/Linux: `source .venv/bin/activate`

Install dependencies and run the thresholding experiment:

```bash
pip install -r requirements.txt
python binary_threshold.py
```

Results are saved in `backend/results/`.