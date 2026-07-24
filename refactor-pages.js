const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Admin/Desktop/E-COMMERCE/apps/storefront/src/app/(customer)';

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
    let changed = false;

    // Remove old imports
    const oldImportRegex = /import\s+{[^}]*}\s+from\s+["']@hopsy\/commerce\/src\/mock-data["'];/g;
    if (content.match(oldImportRegex)) {
        content = content.replace(oldImportRegex, '');
        changed = true;
    }
    
    const singleImports = /import\s+MOCK_[A-Z_]+\s+from\s+["']@hopsy\/commerce\/src\/mock-data["'];/g;
    if (content.match(singleImports)) {
        content = content.replace(singleImports, '');
        changed = true;
    }

    if (changed) {
        const usesProducts = content.includes('MOCK_PRODUCTS') || content.includes('MOCK_TOP_SELLING_PRODUCTS');
        const usesCategories = content.includes('MOCK_CATEGORIES');
        const usesBrands = content.includes('MOCK_BRANDS');
        
        if (usesProducts || usesCategories || usesBrands) {
            content = 'import { useStorefrontData } from "@/components/customer/storefront-context";\n' + content;
            
            // Fix use client
            if (content.includes('"use client";')) {
                content = content.replace(/"use client";\s*/g, '');
                content = '"use client";\n' + content;
            }
            
            const funcRegex = /export\s+default\s+function\s+([A-Z][a-zA-Z0-9_]*)\s*\([^)]*\)\s*{/g;
            content = content.replace(funcRegex, (match) => {
                return match + '\n  const { products, categories, brands, loading } = useStorefrontData();\n  if (loading) return <div>Loading...</div>;\n';
            });
            
            content = content.replace(/MOCK_PRODUCTS/g, 'products');
            content = content.replace(/MOCK_TOP_SELLING_PRODUCTS/g, 'products');
            content = content.replace(/MOCK_CATEGORIES/g, 'categories');
            content = content.replace(/MOCK_BRANDS/g, 'brands');
            
            content = content.replace(/MockProduct/g, 'any');
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated: ' + filePath);
    }
});
