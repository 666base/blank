const fs = require('node:fs');
const lines = fs.readFileSync('lint_promises.txt', 'utf8').split('\n').filter(Boolean);
let fixedFiles = 0;
for (const line of lines) {
  const [file, lineNumStr] = line.split(':');
  if (!file) continue;
  const lineNum = parseInt(lineNumStr, 10);
  const content = fs.readFileSync(file, 'utf8').split('\n');
  const targetLine = content[lineNum - 1];

  if (targetLine.includes('onClick={')) {
    content[lineNum - 1] = targetLine.replace(/onClick=\{([a-zA-Z0-9_]+)\}/, 'onClick={() => { void $1(); }}');
  } else if (targetLine.includes('onClick={() => ')) {
    content[lineNum - 1] = targetLine.replace(/onClick=\{\(\) => ([^}]+)\}/, 'onClick={() => { void $1; }}');
  } else if (targetLine.includes('(') && !targetLine.includes('void') && !targetLine.includes('await') && !targetLine.includes('return')) {
    if (!targetLine.trim().startsWith('//')) {
      content[lineNum - 1] = targetLine.replace(/^(\s*)([a-zA-Z0-9_]+\()/, '$1void $2');
    }
  }
  fs.writeFileSync(file, content.join('\n'));
  fixedFiles++;
}
console.log('Fixed ' + fixedFiles + ' lines.');
