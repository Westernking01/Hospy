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
    let changed = false;

    // Remove old imports
    const oldImportRegex = /import\s+{[^}]*}\s+from\s+["']@hopsy\/commerce\/src\/mock-data["'];/g;
    if (content.match(oldImportRegex)) {
        content = content.replace(oldImportRegex, '');
        changed = true;
    }

    if (changed) {
        // Add new imports
        const usesProducts = content.includes('MOCK_PRODUCTS') || content.includes('MOCK_TOP_SELLING_PRODUCTS') || content.includes('MOCK_TRENDING_LAYOUT_PRODUCTS') || content.includes('MOCK_LATEST_LAUNCHES') || content.includes('MOCK_YOU_MIGHT_LIKE_PRODUCTS');
        const usesCategories = content.includes('MOCK_CATEGORIES');
        const usesBrands = content.includes('MOCK_BRANDS');
        
        if (usesProducts || usesCategories || usesBrands) {
            content = 'import { useStorefrontData } from "@/components/customer/storefront-context";\n' + content;
            
            // Inject hook inside functional components
            // This is a naive injection finding `export function Name(` or `export const Name = (`
            const funcRegex = /export\s+(?:function|const)\s+([A-Z][a-zA-Z0-9_]*)\s*=?\s*\([^)]*\)\s*(?:=>)?\s*{/g;
            content = content.replace(funcRegex, (match) => {
                return match + '\n  const { products, categories, brands } = useStorefrontData();\n';
            });
            
            // Replace usages
            content = content.replace(/MOCK_PRODUCTS/g, 'products');
            content = content.replace(/MOCK_TOP_SELLING_PRODUCTS/g, 'products');
            content = content.replace(/MOCK_TRENDING_LAYOUT_PRODUCTS/g, 'products');
            content = content.replace(/MOCK_LATEST_LAUNCHES/g, 'products');
            content = content.replace(/MOCK_YOU_MIGHT_LIKE_PRODUCTS/g, 'products');
            content = content.replace(/MOCK_CATEGORIES/g, 'categories');
            content = content.replace(/MOCK_BRANDS/g, 'brands');
            
            // Clean up any type references that were lost
            content = content.replace(/MockProduct/g, 'any');
            content = content.replace(/MockLayoutCardItem/g, 'any');
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated: ' + filePath);
    }
});
