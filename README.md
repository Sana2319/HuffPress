
# HuffPress — Huffman Text Compression Tool

## Live Demo
[Click here to use HuffPress online](https://huffpress.netlify.app/)

## Table of Contents

* [Project Overview](#project-overview)
* [Purpose](#purpose)
* [Features](#features)
* [Technology Stack](#technology-stack)
* [Installation & Setup](#installation--setup)
* [Usage Guide](#usage-guide)
* [How Huffman Coding Works](#how-huffman-coding-works)
* [Compression Format](#compression-format)
* [Application Structure](#application-structure)
* [Key Components](#key-components)
* [Known Limitations](#known-limitations)
* [License](#license)
* [Author](#author)

---

## Project Overview

HuffPress is a client-side text compression tool that uses Huffman Encoding to compress and decompress `.txt` files directly in the browser. It is secure, lightweight, and requires no backend.

---

## Purpose

* Demonstrate practical Huffman Encoding.
* Provide an offline text compression utility.
* Teach concepts like heaps, binary trees, and bit-level packing.
* Show compression stats such as size, ratio, and savings.

---

## Features

### Core Features

* Lossless `.txt` compression and decompression
* Handles empty files and single-character files
* Shows:

  * Original size
  * Compressed size
  * Compression ratio

### UI Features

* Clean and responsive dark UI
* Works completely offline
* Very lightweight, no dependencies

### Technical Features

* Custom Min-Heap
* Huffman tree creation
* Tree serialization + bit packing
* 100% client-side JavaScript

---

## Technology Stack

| Category     | Technologies                |
| ------------ | --------------------------- |
| Frontend     | HTML, CSS, JavaScript       |
| Algorithm    | Huffman Encoding, Min-Heap  |
| Browser APIs | FileReader, Blob, Data URLs |

---

## Installation & Setup

### Clone the repository

```bash
git clone https://github.com/Sana2319/HuffPress.git
cd HuffPress
```

### Run the application

Open directly:

```
index.html
```

---

## Usage Guide

### Compressing

1. Click **Browse Files**
2. Select a `.txt` file
3. Click **Compress**
4. A file named `<filename>_compressed.txt` will download

### Decompressing

1. Upload a HuffPress-generated compressed file
2. Click **Decompress**
3. A file named `<filename>_decompressed.txt` will download

---

## How Huffman Coding Works

1. Count frequency of each character
2. Insert all characters into a Min-Heap
3. Build a Huffman tree by merging smallest nodes
4. Assign shorter bit-codes to more frequent characters
5. Convert text → bitstring → byte-packed output
6. Serialize the tree + metadata for decompression
7. Reverse process to decode

---

## Compression Format

### Empty File

```
zer#
```

### Single Unique Character

```
one#<char>#<count>
```

### Normal Huffman Compression

```
<treeLength>#<paddingBits>#<treeString><packedBinaryData>
```

---

## Application Structure

```
HuffPress/
├── index.html
├── styles.css
└── script.js
```

---

## Key Components

| Component     | Description                            |
| ------------- | -------------------------------------- |
| MinHeap       | Extracts lowest-frequency nodes        |
| HuffmanCodec  | Encoding, decoding, serialization      |
| File Handling | Upload, read, and download files       |
| UI Logic      | Buttons, status text, and info display |

---

## Known Limitations

* Only supports `.txt` files
* Can only decompress files produced by HuffPress
* Small or random text may not compress much
* Not intended for large-scale production compression

---

## License

MIT License

---

## Author

**Sana Sajjad**

GitHub: [https://github.com/Sana2319](https://github.com/Sana2319)
Repository: [HuffPress](https://github.com/Sana2319/HuffPress)

