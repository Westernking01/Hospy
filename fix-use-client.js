const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Admin/Desktop/E-COMMERCE/apps/storefront/src/components/customer';

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

walkSync(dir, function(filePath) {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file has "use client" anywhere except the very first line
    const useClientIndex = content.indexOf('"use client";');
    if (useClientIndex > 0) {
        content = content.replace(/"use client";\s*/, '');
        content = '"use client";\n' + content;
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed use client: ' + filePath);
    }
});
