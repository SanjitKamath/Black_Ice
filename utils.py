import pefile
import pandas as pd
import numpy as np
import joblib

# List of PE header features used for classification
PE_FEATURES = [
    'Machine', 'NumberOfSections', 'TimeDateStamp', 'PointerToSymbolTable',
    'NumberOfSymbols', 'SizeOfOptionalHeader', 'Characteristics',
    'Magic', 'MajorLinkerVersion', 'MinorLinkerVersion', 'SizeOfCode',
    'AddressOfEntryPoint', 'BaseOfCode', 'ImageBase', 'SectionAlignment',
    'FileAlignment', 'MajorOperatingSystemVersion', 'MinorOperatingSystemVersion',
    'MajorImageVersion', 'MinorImageVersion', 'MajorSubsystemVersion',
    'MinorSubsystemVersion', 'SizeOfImage', 'SizeOfHeaders', 'CheckSum',
    'Subsystem', 'DllCharacteristics', 'SizeOfStackReserve', 'SizeOfStackCommit',
    'SizeOfHeapReserve', 'SizeOfHeapCommit', 'LoaderFlags', 'NumberOfRvaAndSizes'
]

def extract_pe_features(file_path):
    """
    Extract PE header features from an executable file.
    Returns a Pandas DataFrame containing one row of features.
    """
    try:
        pe = pefile.PE(file_path)
        features = {
            'Machine': pe.FILE_HEADER.Machine,
            'NumberOfSections': pe.FILE_HEADER.NumberOfSections,
            'TimeDateStamp': pe.FILE_HEADER.TimeDateStamp,
            'PointerToSymbolTable': pe.FILE_HEADER.PointerToSymbolTable,
            'NumberOfSymbols': pe.FILE_HEADER.NumberOfSymbols,
            'SizeOfOptionalHeader': pe.FILE_HEADER.SizeOfOptionalHeader,
            'Characteristics': pe.FILE_HEADER.Characteristics,
            'Magic': pe.OPTIONAL_HEADER.Magic,
            'MajorLinkerVersion': pe.OPTIONAL_HEADER.MajorLinkerVersion,
            'MinorLinkerVersion': pe.OPTIONAL_HEADER.MinorLinkerVersion,
            'SizeOfCode': pe.OPTIONAL_HEADER.SizeOfCode,
            'AddressOfEntryPoint': pe.OPTIONAL_HEADER.AddressOfEntryPoint,
            'BaseOfCode': pe.OPTIONAL_HEADER.BaseOfCode,
            'ImageBase': pe.OPTIONAL_HEADER.ImageBase,
            'SectionAlignment': pe.OPTIONAL_HEADER.SectionAlignment,
            'FileAlignment': pe.OPTIONAL_HEADER.FileAlignment,
            'MajorOperatingSystemVersion': pe.OPTIONAL_HEADER.MajorOperatingSystemVersion,
            'MinorOperatingSystemVersion': pe.OPTIONAL_HEADER.MinorOperatingSystemVersion,
            'MajorImageVersion': pe.OPTIONAL_HEADER.MajorImageVersion,
            'MinorImageVersion': pe.OPTIONAL_HEADER.MinorImageVersion,
            'MajorSubsystemVersion': pe.OPTIONAL_HEADER.MajorSubsystemVersion,
            'MinorSubsystemVersion': pe.OPTIONAL_HEADER.MinorSubsystemVersion,
            'SizeOfImage': pe.OPTIONAL_HEADER.SizeOfImage,
            'SizeOfHeaders': pe.OPTIONAL_HEADER.SizeOfHeaders,
            'CheckSum': pe.OPTIONAL_HEADER.CheckSum,
            'Subsystem': pe.OPTIONAL_HEADER.Subsystem,
            'DllCharacteristics': pe.OPTIONAL_HEADER.DllCharacteristics,
            'SizeOfStackReserve': pe.OPTIONAL_HEADER.SizeOfStackReserve,
            'SizeOfStackCommit': pe.OPTIONAL_HEADER.SizeOfStackCommit,
            'SizeOfHeapReserve': pe.OPTIONAL_HEADER.SizeOfHeapReserve,
            'SizeOfHeapCommit': pe.OPTIONAL_HEADER.SizeOfHeapCommit,
            'LoaderFlags': pe.OPTIONAL_HEADER.LoaderFlags,
            'NumberOfRvaAndSizes': pe.OPTIONAL_HEADER.NumberOfRvaAndSizes
        }
        return pd.DataFrame([features])[PE_FEATURES]
    except Exception as e:
        print(f"❌ Error parsing PE file: {e}")
        return None
