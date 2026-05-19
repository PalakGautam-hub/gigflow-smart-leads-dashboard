const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../frontend/src');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

const replacements = [
  // DashboardLayout
  {
    regex: /style=\{\{\s*background:\s*['"]#0d0a1a['"]\s*\}\}/g,
    replace: `style={{ backgroundColor: 'var(--bg-base)' }}`
  },
  {
    regex: /style=\{\{\s*background:\s*['"]rgba\(18, 12, 35, 0\.96\)['"][^\}]+\}\}/g,
    replace: `className="card"`
  },
  // Remove most inline styles matching background: rgba(255,255,255,0.04) and borders
  {
    regex: /style=\{\{\s*background:\s*['"]rgba\(255,255,255,0\.0[34568]\)['"],\s*border:[^\}]+backdropFilter:[^\}]+\}\}/g,
    replace: `className="card"`
  },
  // Text colors
  {
    regex: /style=\{\{\s*color:\s*['"]#e2d9f3['"]\s*\}\}/g,
    replace: `style={{ color: 'var(--text-primary)' }}`
  },
  {
    regex: /style=\{\{\s*color:\s*['"]#f0eaff['"]\s*\}\}/g,
    replace: `style={{ color: 'var(--text-primary)' }}`
  },
  {
    regex: /style=\{\{\s*color:\s*['"]#6b5f87['"]\s*\}\}/g,
    replace: `style={{ color: 'var(--text-muted)' }}`
  },
  {
    regex: /style=\{\{\s*color:\s*['"]#a89cc8['"]\s*\}\}/g,
    replace: `style={{ color: 'var(--text-secondary)' }}`
  },
  {
    regex: /style=\{\{\s*color:\s*['"]#4a3f6b['"]\s*\}\}/g,
    replace: `style={{ color: 'var(--text-muted)' }}`
  },
  {
    regex: /style=\{\{\s*color:\s*['"]#7c6fa0['"]\s*\}\}/g,
    replace: `style={{ color: 'var(--text-secondary)' }}`
  },
  {
    regex: /style=\{\{\s*color:\s*['"]#c4b5fd['"]\s*\}\}/g,
    replace: `style={{ color: 'var(--accent-purple)' }}`
  },
  {
    regex: /style=\{\{\s*color:\s*['"]#a78bfa['"]\s*\}\}/g,
    replace: `style={{ color: 'var(--accent-violet)' }}`
  },
  // Backgrounds
  {
    regex: /style=\{\{\s*background:\s*['"]rgba\(139,92,246,0\.08\)['"][^\}]*\}\}/g,
    replace: `style={{ background: 'var(--glow-violet)' }}`
  },
  {
    regex: /style=\{\{\s*background:\s*['"]rgba\(139,92,246,0\.12\)['"][^\}]*\}\}/g,
    replace: `style={{ background: 'var(--border-glow)' }}`
  },
  {
    regex: /style=\{\{\s*background:\s*['"]rgba\(255,255,255,0\.0[23456]\)['"]\s*\}\}/g,
    replace: `style={{ background: 'var(--bg-card)' }}`
  },
  {
    regex: /style=\{\{\s*borderBottom:\s*['"]1px solid rgba\(139,92,246,0\.12\)['"]\s*\}\}/g,
    replace: `style={{ borderBottom: '1px solid var(--border-subtle)' }}`
  },
  {
    regex: /style=\{\{\s*borderTop:\s*['"]1px solid rgba\(139,92,246,0\.12\)['"]\s*\}\}/g,
    replace: `style={{ borderTop: '1px solid var(--border-subtle)' }}`
  },
  {
    regex: /style=\{\{\s*borderBottom:\s*['"]1px solid rgba\(255,255,255,0\.04\)['"]\s*\}\}/g,
    replace: `style={{ borderBottom: '1px solid var(--border-subtle)' }}`
  },
  {
    regex: /style=\{\{\s*borderTop:\s*['"]1px solid rgba\(255,255,255,0\.05\)['"]\s*\}\}/g,
    replace: `style={{ borderTop: '1px solid var(--border-subtle)' }}`
  },
  {
    regex: /background:\s*['"]rgba\(18, 12, 35, 0\.92\)['"]/g,
    replace: `background: 'var(--bg-sidebar)'`
  },
  {
    regex: /background:\s*['"]rgba\(26, 19, 48, 0\.95\)['"]/g,
    replace: `background: 'var(--bg-sidebar)'`
  }
];

walk(dir, (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  replacements.forEach(r => {
    content = content.replace(r.regex, r.replace);
  });
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Updated', filePath);
  }
});
