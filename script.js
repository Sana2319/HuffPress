// ===== DOM helpers =====

const fileInput = document.getElementById("fileInput");
const fileNameLabel = document.getElementById("fileName");
const compressBtn = document.getElementById("compressButton");
const decompressBtn = document.getElementById("decompressButton");
const statusMsg = document.getElementById("statusText");
const infoBox = document.getElementById("infoText");

function setStatus(text) {
    statusMsg.textContent = text;
}

function setInfo(text) {
    infoBox.textContent = text || "";
}

// show selected file name
fileInput.addEventListener("change", () => {
    if (fileInput.files[0]) {
        fileNameLabel.textContent = fileInput.files[0].name;
        setStatus("File selected. Choose Compress or Decompress.");
    } else {
        fileNameLabel.textContent = "No file selected";
        setStatus("Waiting for a file...");
        setInfo("");
    }
});

// ===== MinHeap implementation =====

class MinHeap {
    constructor() {
        this.items = [];
    }

    size() {
        return this.items.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    push(value) {
        this.items.push(value);
        this.bubbleUp();
    }

    top() {
        return this.items[0];
    }

    pop() {
        if (this.isEmpty()) return;
        const lastIndex = this.size() - 1;
        this.items[0] = this.items[lastIndex];
        this.items.pop();
        this.bubbleDown();
    }

    bubbleUp() {
        let index = this.size() - 1;

        while (index > 0) {
            const parentIndex = Math.trunc((index - 1) / 2);
            const current = this.items[index];
            const parent = this.items[parentIndex];

            if (parent[0] <= current[0]) {
                break;
            }

            this.items[parentIndex] = current;
            this.items[index] = parent;
            index = parentIndex;
        }
    }

    bubbleDown() {
        let index = 0;
        const n = this.size();

        while (index < n) {
            const current = this.items[index];
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;

            if (leftIndex >= n && rightIndex >= n) break;

            if (rightIndex >= n) {
                const left = this.items[leftIndex];
                if (current[0] <= left[0]) break;

                this.items[leftIndex] = current;
                this.items[index] = left;
                index = leftIndex;
            } else {
                const left = this.items[leftIndex];
                const right = this.items[rightIndex];

                if (current[0] <= left[0] && current[0] <= right[0]) break;

                if (left[0] < right[0]) {
                    this.items[leftIndex] = current;
                    this.items[index] = left;
                    index = leftIndex;
                } else {
                    this.items[rightIndex] = current;
                    this.items[index] = right;
                    index = rightIndex;
                }
            }
        }
    }
}

// ===== Huffman codec =====

class HuffmanCodec {
    // build table: char -> code
    buildCodeMap(node, currentCode) {
        if (typeof node[1] === "string") {
            this.codeMap[node[1]] = currentCode;
            return;
        }
        this.buildCodeMap(node[1][0], currentCode + "0");
        this.buildCodeMap(node[1][1], currentCode + "1");
    }

    // tree -> string
    treeToString(node) {
        if (typeof node[1] === "string") {
            return "'" + node[1];
        }
        return "0" + this.treeToString(node[1][0]) + "1" + this.treeToString(node[1][1]);
    }

    // string -> tree
    stringToTree(treeString) {
        const node = [];
        if (treeString[this.position] === "'") {
            this.position++;
            node.push(treeString[this.position]);
            this.position++;
            return node;
        }
        this.position++;
        node.push(this.stringToTree(treeString));
        this.position++;
        node.push(this.stringToTree(treeString));
        return node;
    }

    encode(text) {
        const heap = new MinHeap();
        const freqMap = new Map();

        for (let ch of text) {
            freqMap.set(ch, (freqMap.get(ch) || 0) + 1);
        }

        // empty
        if (freqMap.size === 0) {
            const finalString = "zer#";
            const message =
                "Compression done.\n" +
                "Note: file was empty, so HuffPress saved only minimal metadata.";
            return [finalString, message];
        }

        // only one unique character
        if (freqMap.size === 1) {
            let onlyChar = null;
            let count = 0;
            for (const [ch, freq] of freqMap) {
                onlyChar = ch;
                count = freq;
            }
            const finalString = "one#" + onlyChar + "#" + count.toString();
            const message =
                "Compression done.\n" +
                "Special case: file has only one unique character.";
            return [finalString, message];
        }

        // fill heap: [frequency, char]
        for (const [ch, freq] of freqMap) {
            heap.push([freq, ch]);
        }

        // build Huffman tree
        while (heap.size() >= 2) {
            const left = heap.top();
            heap.pop();
            const right = heap.top();
            heap.pop();
            heap.push([left[0] + right[0], [left, right]]);
        }

        const huffmanTree = heap.top();
        heap.pop();

        this.codeMap = {};
        this.buildCodeMap(huffmanTree, "");

        // text -> bit string
        let bitString = "";
        for (let ch of text) {
            bitString += this.codeMap[ch];
        }

        // pad bits to multiple of 8
        const paddingBits = (8 - (bitString.length % 8)) % 8;
        for (let i = 0; i < paddingBits; i++) {
            bitString += "0";
        }

        // bits -> packed string
        let packedText = "";
        for (let i = 0; i < bitString.length;) {
            let value = 0;
            for (let j = 0; j < 8; j++, i++) {
                value *= 2;
                value += bitString[i] - "0";
            }
            packedText += String.fromCharCode(value);
        }

        const treeString = this.treeToString(huffmanTree);
        const treeLength = treeString.length;

        // final format: treeLength#paddingBits#treeString + packedText
        const finalString =
            treeLength.toString() +
            "#" +
            paddingBits.toString() +
            "#" +
            treeString +
            packedText;

        const message = "Compression done.";
        return [finalString, message];
    }

    decode(encodedText) {
        let index = 0;
        let firstPart = "";

        while (index < encodedText.length && encodedText[index] !== "#") {
            firstPart += encodedText[index];
            index++;
        }

        if (index === encodedText.length) {
            alert("Invalid file. This does not look like a HuffPress compressed file.");
            return null;
        }

        // empty case
        if (firstPart === "zer") {
            const decoded = "";
            const message = "Decompression done.\nOriginal text was empty.";
            return [decoded, message];
        }

        // single character case
        if (firstPart === "one") {
            let rest = encodedText.slice(index + 1);
            let charPart = "";
            let i = 0;
            while (rest[i] !== "#") {
                charPart += rest[i];
                i++;
            }
            const oneChar = charPart;
            rest = rest.slice(i + 1);
            const length = parseInt(rest, 10);
            let decoded = "";
            for (let j = 0; j < length; j++) {
                decoded += oneChar;
            }
            const message = "Decompression done.\nSingle character file restored.";
            return [decoded, message];
        }

        // normal case
        let rest = encodedText.slice(index + 1);
        const treeLength = parseInt(firstPart, 10);

        // padding bits
        let paddingPart = "";
        let k = 0;
        while (rest[k] !== "#") {
            paddingPart += rest[k];
            k++;
        }
        const paddingBits = parseInt(paddingPart, 10);
        rest = rest.slice(k + 1);

        // tree string
        const treeString = rest.slice(0, treeLength);
        const packedText = rest.slice(treeLength);

        this.position = 0;
        const huffmanTree = this.stringToTree(treeString);

        // packed string -> bits
        let bitString = "";
        for (let i = 0; i < packedText.length; i++) {
            const charCode = packedText.charCodeAt(i);
            let localBits = "";
            for (let j = 7; j >= 0; j--) {
                const bit = (charCode >> j) & 1;
                localBits += bit;
            }
            bitString += localBits;
        }

        // remove padding
        if (paddingBits > 0) {
            bitString = bitString.slice(0, -paddingBits);
        }

        // bits -> text
        let decoded = "";
        let node = huffmanTree;

        for (let bit of bitString) {
            node = bit === "1" ? node[1] : node[0];

            if (typeof node[0] === "string") {
                decoded += node[0];
                node = huffmanTree;
            }
        }

        const message = "Decompression done.";
        return [decoded, message];
    }
}

// ===== Main functions =====

function validateTxtFile() {
    const file = fileInput.files[0];
    if (!file) {
        alert("Please choose a .txt file first.");
        return null;
    }
    const parts = file.name.split(".");
    const ext = parts[parts.length - 1].toLowerCase();
    if (ext !== "txt") {
        alert("Only .txt files are supported. Please upload a .txt file.");
        return null;
    }
    return file;
}

function downloadTextFile(name, text) {
    const link = document.createElement("a");
    link.href = "data:application/octet-stream," + encodeURIComponent(text);
    link.download = name;
    link.click();
}

function showCompressionStats(originalText, compressedText) {
    const originalBytes = new Blob([originalText]).size;
    const compressedBytes = new Blob([compressedText]).size;

    const originalBits = originalBytes * 8;
    const compressedBits = compressedBytes * 8;

    const ratio = compressedBits / originalBits * 100;
    const saved = 100 - ratio;

    const lines = [
        "Original size:   " + originalBytes + " bytes",
        "Compressed size: " + compressedBytes + " bytes",
        "",
        "Estimated compression ratio: " + ratio.toFixed(2) + " %",
        "Estimated space saved:       " + saved.toFixed(2) + " %"
    ];

    setInfo(lines.join("\n"));
}

// Compress

compressBtn.addEventListener("click", () => {
    const file = validateTxtFile();
    if (!file) return;

    const reader = new FileReader();

    setStatus("Reading file and preparing to compress...");
    setInfo("");

    reader.onload = function (event) {
        const text = event.target.result;

        if (!text || text.length === 0) {
            setStatus("File is empty. HuffPress will still create a tiny compressed file.");
        } else if (file.size < 500) {
            setStatus("Note: file is small. Compressed size may be similar to original.");
        } else {
            setStatus("Compressing using Huffman coding...");
        }

        const codec = new HuffmanCodec();
        const [compressedText, message] = codec.encode(text);

        const baseName = file.name.split(".")[0];
        downloadTextFile(baseName + "_compressed.txt", compressedText);

        setStatus(message);
        showCompressionStats(text, compressedText);
    };

    reader.onerror = function () {
        setStatus("Error reading file.");
        setInfo("");
    };

    reader.readAsText(file, "UTF-8");
});

// Decompress

decompressBtn.addEventListener("click", () => {
    const file = validateTxtFile();
    if (!file) return;

    const reader = new FileReader();

    setStatus("Reading file and preparing to decompress...");
    setInfo("");

    reader.onload = function (event) {
        const text = event.target.result;

        const codec = new HuffmanCodec();
        const result = codec.decode(text);

        if (!result) {
            setStatus("Could not decompress. Make sure this file was created by HuffPress.");
            setInfo("");
            return;
        }

        const [decodedText, message] = result;

        const baseName = file.name.split(".")[0];
        downloadTextFile(baseName + "_decompressed.txt", decodedText);

        setStatus(message);

        const originalBytes = new Blob([decodedText]).size;
        const lines = [
            "Recovered text size: " + originalBytes + " bytes",
            "",
            "You can open the new file and compare it with the original."
        ];
        setInfo(lines.join("\n"));
    };

    reader.onerror = function () {
        setStatus("Error reading file.");
        setInfo("");
    };

    reader.readAsText(file, "UTF-8");
});
