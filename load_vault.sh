#!/bin/bash
# Load all vault keys as environment variables

WORKSPACE="${WORKSPACE:-$(dirname "$0")}"
VAULT_DIR="$WORKSPACE/.vault/keys"

if [ ! -d "$VAULT_DIR" ]; then
    echo "Error: Vault directory not found at $VAULT_DIR"
    exit 1
fi

for key_file in "$VAULT_DIR"/*; do
    if [ -f "$key_file" ]; then
        key_name=$(basename "$key_file")
        # Use python to decode since bash can't do the encoding easily
        key_value=$(python3 -c "
import base64
import sys
with open('$key_file', 'r') as f:
    encoded = f.read().strip()
    decoded = base64.b64decode(encoded).decode()
    print(decoded[::-1])
")
        export_var="${key_name^^}_TOKEN"
        export "$export_var"="$key_value"
        echo "✅ Loaded $export_var"
    fi
done

