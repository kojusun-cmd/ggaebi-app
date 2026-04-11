const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// CSS replacements
cssContent = cssContent.replace(/\.logo-text \{\s*font-family/g, ".logo-text {\n  font-size: 25px;\n  font-family");
// We can use regex to replace specific properties
cssContent = cssContent.replace(/\.logo-text\s*\{[^}]*font-size:\s*22px;[^}]*\}/, (match) => match.replace('22px', '25px'));
cssContent = cssContent.replace(/\.price-label\s*\{[^}]*font-size:\s*11px;[^}]*\}/, (match) => match.replace('11px', '13px'));
cssContent = cssContent.replace(/\.hero-bidders\s*\{[^}]*font-size:\s*12px;[^}]*\}/, (match) => match.replace('12px', '14px'));
cssContent = cssContent.replace(/\.stat-label\s*\{[^}]*font-size:\s*11px;[^}]*\}/, (match) => match.replace('11px', '13px'));
cssContent = cssContent.replace(/\.product-label\s*\{[^}]*font-size:\s*12px;[^}]*\}/, (match) => match.replace('12px', '13px'));
cssContent = cssContent.replace(/\.rank-index\s*\{[^}]*font-size:\s*14px;[^}]*\}/, (match) => match.replace('14px', '16px'));
cssContent = cssContent.replace(/\.rank-name\s*\{[^}]*font-size:\s*14px;[^}]*\}/, (match) => match.replace('14px', '16px'));
cssContent = cssContent.replace(/\.activity-sub\s*\{[^}]*font-size:\s*12px;[^}]*\}/, (match) => match.replace('12px', '13px'));
cssContent = cssContent.replace(/\.nav-item span { font-size: 10px;/g, ".nav-item span { font-size: 12px;");

// Avatars
cssContent = cssContent.replace(/\.activity-icon\s*\{[^}]*width:\s*36px;\s*height:\s*36px;/g, (m) => m.replace(/36px/g, '46px'));
cssContent = cssContent.replace(/\.rank-avatar\s*\{[^}]*width:\s*36px;\s*height:\s*36px;/g, (m) => m.replace(/36px/g, '46px'));

fs.writeFileSync(cssPath, cssContent);

function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = content;

            // Icon replacements inside tags
            // E.g. <Search size={24} to <Search size={28}
            modified = modified.replace(/<Search\s+size=\{24\}/g, '<Search size={28}');
            modified = modified.replace(/<Bell\s+size=\{24\}/g, '<Bell size={28}');
            modified = modified.replace(/<User\s+size=\{22\}/g, '<User size={28}');
            modified = modified.replace(/<Home\s+size=\{22\}/g, '<Home size={28}');
            modified = modified.replace(/<Flame\s+size=\{22\}/g, '<Flame size={28}'); // Flame icon in bottom nav maybe?
            modified = modified.replace(/<Search\s+size=\{22\}/g, '<Search size={28}'); 
            
            // Chevrons
            modified = modified.replace(/<ChevronLeft\s+size=\{28\}/g, '<ChevronLeft size={32}');
            modified = modified.replace(/<ChevronLeft\s+size=\{24\}/g, '<ChevronLeft size={28}');
            modified = modified.replace(/<ChevronRight\s+size=\{18\}/g, '<ChevronRight size={24}');
            modified = modified.replace(/<ChevronDown\s+size=\{20\}/g, '<ChevronDown size={24}');
            modified = modified.replace(/<ChevronUp\s+size=\{18\}/g, '<ChevronUp size={24}');
            
            if (content !== modified) {
                fs.writeFileSync(fullPath, modified);
                console.log('Updated', fullPath);
            }
        }
    }
}

processDirectory(path.join(__dirname, 'src'));
console.log('Script completed.');
