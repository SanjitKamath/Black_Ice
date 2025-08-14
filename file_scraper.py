import pefile
import os
import math
import json
import numpy as np
from collections import Counter
from rich.prompt import Prompt


def get_entropy(data):
    if not data:
        return 0.0
    counter = Counter(data)
    probs = [float(c) / len(data) for c in counter.values()]
    return -sum(p * math.log2(p) for p in probs)


def extract_strings(file_path, min_length=4):
    with open(file_path, "rb") as f:
        data = f.read()
    strings = []
    current = b""
    for byte in data:
        if 32 <= byte <= 126:
            current += bytes([byte])
        else:
            if len(current) >= min_length:
                strings.append(current.decode(errors="ignore"))
            current = b""
    return strings


def byte_histogram(file_path):
    with open(file_path, "rb") as f:
        data = f.read()
    hist = [0] * 256
    for byte in data:
        hist[byte] += 1
    return hist


def extract_pe_metadata(file_path):
    if not os.path.exists(file_path):
        return None

    try:
        pe = pefile.PE(file_path)
    except Exception:
        return None

    file_size = os.path.getsize(file_path)
    entropy = get_entropy(open(file_path, "rb").read())

    optional_header = pe.OPTIONAL_HEADER
    header_info = {
        "Magic": optional_header.Magic,
        "LinkerVersion": f"{optional_header.MajorLinkerVersion}.{optional_header.MinorLinkerVersion}",
        "SizeOfOptionalHeader": pe.FILE_HEADER.SizeOfOptionalHeader,
        "Subsystem": optional_header.Subsystem,
        "DLL Characteristics": optional_header.DllCharacteristics,
        "Machine": pe.FILE_HEADER.Machine,
        "Characteristics": pe.FILE_HEADER.Characteristics,
        "Compilation Timestamp": pe.FILE_HEADER.TimeDateStamp,
    }

    section_names = []
    section_entropies = []
    section_sizes = []
    for section in pe.sections:
        section_names.append(section.Name.decode(errors="ignore").strip('\x00'))
        section_entropies.append(section.get_entropy())
        section_sizes.append(section.SizeOfRawData)

    imported_dlls = []
    imported_funcs = []
    if hasattr(pe, 'DIRECTORY_ENTRY_IMPORT'):
        for entry in pe.DIRECTORY_ENTRY_IMPORT:
            imported_dlls.append(entry.dll.decode(errors="ignore"))
            for imp in entry.imports:
                if imp.name:
                    imported_funcs.append(imp.name.decode(errors="ignore"))

    exported_funcs = []
    if hasattr(pe, 'DIRECTORY_ENTRY_EXPORT'):
        for exp in pe.DIRECTORY_ENTRY_EXPORT.symbols:
            if exp.name:
                exported_funcs.append(exp.name.decode(errors="ignore"))

    strings = extract_strings(file_path)
    string_stats = {
        "Total Strings": len(strings),
        "Average Length": np.mean([len(s) for s in strings]) if strings else 0,
        "Suspicious Strings": [s for s in strings if any(k in s.lower() for k in ["cmd", "http", ".dll", "powershell", "regedit"])]
    }

    byte_hist = byte_histogram(file_path)

    result = {
        "File Size": file_size,
        "Entropy": entropy,
        "Header Info": header_info,
        "Sections": {
            "Names": section_names,
            "Entropies": section_entropies,
            "Sizes": section_sizes
        },
        "Imports": {
            "DLLs": imported_dlls,
            "Functions": imported_funcs
        },
        "Exports": exported_funcs,
        "Strings": string_stats,
        "Byte Histogram": byte_hist
    }

    return result


if __name__ == "__main__":
    path = Prompt.ask("Enter the path to a PE file (e.g., .exe, .dll)")
    features = extract_pe_metadata(path)

    if features:
        base_name = os.path.basename(path)
        json_name = f"{base_name}_features.json"
        with open(json_name, "w") as f:
            json.dump(features, f, indent=4)
        print(f"[green]Features saved to[/green] {json_name}")
    else:
        print("[red]Failed to extract features from file.[/red]")
