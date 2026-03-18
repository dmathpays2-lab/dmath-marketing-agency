#!/bin/bash
# Vault Key Loader
# Loads API keys from .vault/keys/ directory

VAULT_DIR="${VAULT_DIR:-$(dirname "$0")}"

load_key() {
    local key_name="$1"
    local key_file="$VAULT_DIR/.vault/keys/$key_name"
    
    if [ ! -f "$key_file" ]; then
        echo "Error: Key '$key_name' not found in vault" >&2
        return 1
    fi
    
    base64 -d "$key_file" 2>/dev/null || cat "$key_file"
}

export_key() {
    local key_name="$1"
    local var_name="${2:-${key_name^^}_TOKEN}"
    local value=$(load_key "$key_name")
    
    if [ $? -eq 0 ]; then
        export "$var_name"="$value"
        echo "Exported $var_name"
    fi
}

# Usage examples:
#   source vault.sh && export_key github GITHUB_TOKEN
#   source vault.sh && export_key vercel
#   $(load_key github)

case "${1:-}" in
    load)
        load_key "$2"
        ;;
    export)
        export_key "$2" "$3"
        ;;
    list)
        echo "Available keys:"
        ls -1 "$VAULT_DIR/.vault/keys/" 2>/dev/null | sed 's/^/  - /'
        ;;
    *)
        echo "Usage: source vault.sh [command]"
        echo ""
        echo "Commands:"
        echo "  load <key>          - Load and decode a key"
        echo "  export <key> [var]  - Export key as environment variable"
        echo "  list                - List available keys"
        echo ""
        echo "Examples:"
        echo "  source vault.sh export github GITHUB_TOKEN"
        echo '  TOKEN=$(vault.sh load github)'
        ;;
esac