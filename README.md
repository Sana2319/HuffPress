
````markdown
# 📄 HuffPress — Huffman Text Compression Tool

## 📖 Table of Contents

- [Project Overview](#project-overview)
- [Purpose](#purpose)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [How Huffman Coding Works](#how-huffman-coding-works)
- [Compression Format](#compression-format)
- [Application Structure](#application-structure)
- [Known Limitations](#known-limitations)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Author](#author)

---

## Project Overview

**HuffPress** is a browser-based, fully client-side application that performs **lossless text compression** using the **Huffman Coding algorithm**.  
It allows users to **compress and decompress `.txt` files instantly** without uploading any data to a server.

The project demonstrates practical data compression, clean UI design, and efficient client-side processing — ideal for learning, experimenting, and showcasing algorithmic concepts.

---

## Purpose

* Provide a simple, interactive tool to demonstrate **Huffman compression**.
* Enable users to compress and decompress text files directly inside the browser.
* Educate developers on tree-based compression and bit packing.
* Deliver transparent, user-friendly compression statistics.

---

## Features

### Core Functionality

- 🔹 **Compress `.txt` files** using Huffman coding  
- 🔹 **Decompress HuffPress-generated compressed files**  
- 🔹 Handles special cases:
  - Empty files  
  - Single-character files  

### UI & User Experience

- Modern, responsive **dark UI**
- Smooth animations and clean layout
- Dashboard-like compression insights:
  - Original size
  - Compressed size
  - Compression ratio
  - Space saved

### Technical Highlights

- Custom **MinHeap** implementation  
- Fully manual **Huffman tree construction**  
- Efficient **tree serialization + bit packing**  
- 100% offline  
- Zero dependencies  

---

## Technology Stack

### Core Technologies

| Category           | Tools/Technologies        |
|-------------------|---------------------------|
| Frontend          | HTML5, CSS3, JavaScript   |
| Algorithmic Logic | Custom Heap + Huffman Tree |
| File Handling     | FileReader API, Blob, Data URLs |

---

## Installation & Setup

No build tools, no installs — just run locally.

1. **Clone the repository**

```bash
git clone https://github.com/Sana2319/HuffPress.git
cd HuffPress
````

2. **Open the application**

Simply open:

```
index.html
```

—or—

Run a local server:

```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

---

## Usage Guide

### 📥 Compressing Files

1. Click **Browse Files**
2. Select a `.txt` file
3. Click **Compress**
4. A compressed file will download automatically:

```
filename_compressed.txt
```

Compression statistics will appear on the screen.

---

### 📤 Decompressing Files

1. Select any `.txt` file compressed by HuffPress
2. Click **Decompress**
3. A restored file will download:

```
filename_decompressed.txt
```

If the file is invalid, an error message will be shown.

---

## How Huffman Coding Works

Huffman Coding is a **lossless compression algorithm** that:

1. Counts frequency of each character
2. Builds a **binary tree** using a **min-heap**
3. Assigns:

   * Shorter codes to frequent characters
   * Longer codes to rare characters
4. Converts text → bitstring → packed bytes
5. Reconstructs original text using the stored tree

This reduces the average bit-length per character.

---

## Compression Format

HuffPress stores compressed files in one of three formats:

### 1️⃣ Empty File

```
zer#
```

### 2️⃣ Single Unique Character

```
one#<char>#<count>
```

### 3️⃣ General Case

```
<treeLength>#<paddingBits>#<treeString><packedBinaryData>
```

Where:

* `treeString` = serialized Huffman tree
* `paddingBits` = how many zeros were added to complete bytes
* `packedBinaryData` = compressed data

---

## Application Structure

```text
HuffPress/
│── index.html     # UI layout structure
│── styles.css     # UI styling (dark theme)
└── script.js      # Core logic: heap, Huffman, file handling
```

**Key Components**

| Component     | Description                                 |
| ------------- | ------------------------------------------- |
| MinHeap       | Custom priority queue for tree building     |
| HuffmanCodec  | Encode/decode logic + tree serialization    |
| File Handling | Reads text files, triggers downloads        |
| UI Handlers   | Button events, status updates, info display |

---

## Known Limitations

* Works only with `.txt` files.
* Can only decompress files created by HuffPress.
* Small files or highly random text may compress poorly.
* Not intended for large production-level compression tasks.

---

## Future Enhancements

* Drag-and-drop file support
* Text input mode (paste text directly)
* Visual Huffman tree generator
* Compression comparison dashboard
* Support for additional file formats

---

## License

This project is licensed under the **MIT License**.
You are free to modify and use this project with attribution.

---

## Author

**Name:** *Sana Sajjas*
**GitHub:** [Sana2319](https://github.com/Sana2319)
**Repository:** [HuffPress](https://github.com/Sana2319/HuffPress)

---

If you'd like, I can also generate:

✅ A project banner
✅ Badges (MIT / JS / HTML / Stars / Forks)
✅ A GIF demo preview

```
```
