const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Reverting to Native standard fonts and widths in CSS
cssContent = cssContent.replace(/\.logo-text\s*\{[^}]*font-size:\s*\d+px;[^}]*\}/, (match) => match.replace(/font-size:\s*\d+px/, 'font-size: 22px'));

// Smaller labels to 12px
cssContent = cssContent.replace(/\.price-label\s*\{[^}]*font-size:\s*\d+px;[^}]*\}/, (match) => match.replace(/font-size:\s*\d+px/, 'font-size: 12px'));
cssContent = cssContent.replace(/\.hero-bidders\s*\{[^}]*font-size:\s*\d+px;[^}]*\}/, (match) => match.replace(/font-size:\s*\d+px/, 'font-size: 12px'));
cssContent = cssContent.replace(/\.stat-label\s*\{[^}]*font-size:\s*\d+px;[^}]*\}/, (match) => match.replace(/font-size:\s*\d+px/, 'font-size: 12px'));
cssContent = cssContent.replace(/\.product-label\s*\{[^}]*font-size:\s*\d+px;[^}]*\}/, (match) => match.replace(/font-size:\s*\d+px/, 'font-size: 12px'));
cssContent = cssContent.replace(/\.activity-sub\s*\{[^}]*font-size:\s*\d+px;[^}]*\}/, (match) => match.replace(/font-size:\s*\d+px/, 'font-size: 12px'));
cssContent = cssContent.replace(/\.feed-meta\s*\{[^}]*font-size:\s*\d+px;[^}]*\}/, (match) => match.replace(/font-size:\s*\d+px/, 'font-size: 12px'));

// Middle texts to 14-16px
cssContent = cssContent.replace(/\.rank-index\s*\{[^}]*font-size:\s*\d+px;[^}]*\}/, (match) => match.replace(/font-size:\s*\d+px/, 'font-size: 14px'));
cssContent = cssContent.replace(/\.rank-name\s*\{[^}]*font-size:\s*\d+px;[^}]*\}/, (match) => match.replace(/font-size:\s*\d+px/, 'font-size: 15px'));
cssContent = cssContent.replace(/\.feed-title\s*\{[^}]*font-size:\s*\d+px;[^}]*\}/, (match) => match.replace(/font-size:\s*\d+px/, 'font-size: 16px'));
cssContent = cssContent.replace(/\.feed-price\s*\{[^}]*font-size:\s*\d+px;[^}]*\}/, (match) => match.replace(/font-size:\s*\d+px/, 'font-size: 17px'));

// Bottom nav text 11px
cssContent = cssContent.replace(/\.nav-item span { font-size: \d+px;/g, ".nav-item span { font-size: 11px;");

// Avatars 40px
cssContent = cssContent.replace(/\.activity-icon\s*\{[^}]*width:\s*\d+px;\s*height:\s*\d+px;/g, (m) => m.replace(/\d+px/g, '40px'));
cssContent = cssContent.replace(/\.rank-avatar\s*\{[^}]*width:\s*\d+px;\s*height:\s*\d+px;/g, (m) => m.replace(/\d+px/g, '40px'));

// Feed cards fixing layout
const feedCardOld = `.feed-card {
  background: var(--bg-white);
  border-radius: var(--radius-md);
  padding: 12px;
  display: flex;
  gap: 14px;`;
const feedCardNew = `.feed-card {
  background: var(--bg-white);
  border-radius: var(--radius-md);
  padding: 16px;
  display: flex;
  gap: 16px;`;
cssContent = cssContent.replace(feedCardOld, feedCardNew);

const feedImgBoxOld = `.feed-img-box {
  width: 132px;
  height: 132px;`;
const feedImgBoxNew = `.feed-img-box {
  width: 110px;
  height: 110px;`;
cssContent = cssContent.replace(feedImgBoxOld, feedImgBoxNew);

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

            // Nav & Header Icons 28 -> 24
            modified = modified.replace(/<Search\s+size=\{28\}/g, '<Search size={24}');
            modified = modified.replace(/<Bell\s+size=\{28\}/g, '<Bell size={24}');
            modified = modified.replace(/<User\s+size=\{28\}/g, '<User size={24}');
            modified = modified.replace(/<Home\s+size=\{28\}/g, '<Home size={24}');
            modified = modified.replace(/<Flame\s+size=\{28\}/g, '<Flame size={24}');
            
            // Major Chevrons 32 -> 28
            modified = modified.replace(/<ChevronLeft\s+size=\{32\}/g, '<ChevronLeft size={28}');
            
            // Minor Chevrons 24 -> 20
            modified = modified.replace(/<ChevronRight\s+size=\{24\}/g, '<ChevronRight size={20}');
            modified = modified.replace(/<ChevronDown\s+size=\{24\}/g, '<ChevronDown size={20}');
            modified = modified.replace(/<ChevronUp\s+size=\{24\}/g, '<ChevronUp size={20}');

            if (content !== modified) {
                fs.writeFileSync(fullPath, modified);
                console.log('Updated', fullPath);
            }
        }
    }
}

processDirectory(path.join(__dirname, 'src'));
console.log('Script completed.');
