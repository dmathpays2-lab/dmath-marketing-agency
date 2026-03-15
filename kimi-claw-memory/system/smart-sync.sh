#!/bin/bash
# smart-sync.sh - Sync files to correct GitHub repos based on folder

cd /root/.openclaw/workspace

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔄 Smart Sync Starting...${NC}"

# Sync businesses/more-mito/ → more-mito-health repo
if [ -d "businesses/more-mito" ]; then
    echo -e "${BLUE}📤 Syncing More MITO files...${NC}"
    cd /root/.openclaw/workspace/github-memory/more-mito-health || exit
    cp -r /root/.openclaw/workspace/businesses/more-mito/* . 2>/dev/null
    git add . >/dev/null 2>&1
    git commit -m "Auto-sync: More MITO updates $(date '+%Y-%m-%d %H:%M')" >/dev/null 2>&1 || true
    git push >/dev/null 2>&1 || echo "⚠️  More MITO push failed"
    echo -e "${GREEN}✅ More MITO synced${NC}"
    cd /root/.openclaw/workspace
fi

# Sync businesses/think-energy/ → think-energy-business repo
if [ -d "businesses/think-energy" ]; then
    echo -e "${BLUE}📤 Syncing Think Energy files...${NC}"
    cd /root/.openclaw/workspace/github-memory/think-energy-business || exit
    cp -r /root/.openclaw/workspace/businesses/think-energy/* . 2>/dev/null
    git add . >/dev/null 2>&1
    git commit -m "Auto-sync: Think Energy updates $(date '+%Y-%m-%d %H:%M')" >/dev/null 2>&1 || true
    git push >/dev/null 2>&1 || echo "⚠️  Think Energy push failed"
    echo -e "${GREEN}✅ Think Energy synced${NC}"
    cd /root/.openclaw/workspace
fi

# Sync businesses/mca/ → american-backbone-mca repo
if [ -d "businesses/mca" ]; then
    echo -e "${BLUE}📤 Syncing MCA files...${NC}"
    cd /root/.openclaw/workspace/github-memory/american-backbone-mca || exit
    cp -r /root/.openclaw/workspace/businesses/mca/* . 2>/dev/null
    git add . >/dev/null 2>&1
    git commit -m "Auto-sync: MCA updates $(date '+%Y-%m-%d %H:%M')" >/dev/null 2>&1 || true
    git push >/dev/null 2>&1 || echo "⚠️  MCA push failed"
    echo -e "${GREEN}✅ MCA synced${NC}"
    cd /root/.openclaw/workspace
fi

# Sync system/ and shared/ → dmath-marketing-agency/kimi-claw-memory
if [ -d "system" ] || [ -d "shared" ]; then
    echo -e "${BLUE}📤 Syncing System & Shared files...${NC}"
    cd /root/.openclaw/workspace/github-memory/dmath-marketing-agency/kimi-claw-memory || exit
    
    # Create system folder if not exists
    mkdir -p system shared
    cp -r /root/.openclaw/workspace/system/* system/ 2>/dev/null
    cp -r /root/.openclaw/workspace/shared/* shared/ 2>/dev/null
    
    git add . >/dev/null 2>&1
    git commit -m "Auto-sync: System updates $(date '+%Y-%m-%d %H:%M')" >/dev/null 2>&1 || true
    git push >/dev/null 2>&1 || echo "⚠️  System push failed"
    echo -e "${GREEN}✅ System & Shared synced${NC}"
    cd /root/.openclaw/workspace
fi

echo -e "${GREEN}🎉 Smart Sync Complete!${NC}"
