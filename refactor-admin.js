const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Admin/Desktop/E-COMMERCE/apps/admin/src/app/(admin)/admin/(dashboard)';

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

    // 1. Replace imports
    if (content.includes('@hopsy/commerce/src/admin/admin.service')) {
        // Find the import block
        const regex = /import\s+{([^}]+)}\s+from\s+["']@hopsy\/commerce\/src\/admin\/admin\.service["'];/g;
        content = content.replace(regex, (match, p1) => {
            const imports = p1.split(',').map(s => s.trim()).filter(s => s);
            const typeImports = [];
            const hasAdminService = imports.includes('adminService');
            
            for (const imp of imports) {
                if (imp !== 'adminService') {
                    typeImports.push(imp);
                }
            }
            
            let newImports = '';
            if (typeImports.length > 0) {
                newImports += `import { ${typeImports.join(', ')} } from "@hopsy/commerce/src/admin/admin.types";\n`;
            }
            if (hasAdminService) {
                // Determine which actions are actually used in this file by naive regex
                const actionsUsed = [];
                const actionMappings = {
                    'getProducts': 'getProductsAction',
                    'getCategories': 'getCategoriesAction',
                    'getBrands': 'getBrandsAction',
                    'getOrders': 'getOrdersAction',
                    'getCustomers': 'getCustomersAction',
                    'getDashboardOverview': 'getDashboardOverviewAction',
                    'getInventory': 'getInventoryAction',
                    'getReviews': 'getReviewsAction',
                    'getPromotions': 'getPromotionsAction'
                };
                
                for (const [method, action] of Object.entries(actionMappings)) {
                    if (content.includes(`adminService.${method}`)) {
                        actionsUsed.push(action);
                    }
                }
                
                if (actionsUsed.length > 0) {
                    newImports += `import { ${actionsUsed.join(', ')} } from "@hopsy/commerce/src/admin/admin.actions";\n`;
                }
            }
            return newImports;
        });
        changed = true;
    }

    // 2. Replace function calls
    const actionMappings = {
        'adminService.getProducts': 'getProductsAction',
        'adminService.getCategories': 'getCategoriesAction',
        'adminService.getBrands': 'getBrandsAction',
        'adminService.getOrders': 'getOrdersAction',
        'adminService.getCustomers': 'getCustomersAction',
        'adminService.getDashboardOverview': 'getDashboardOverviewAction',
        'adminService.getInventory': 'getInventoryAction',
        'adminService.getReviews': 'getReviewsAction',
        'adminService.getPromotions': 'getPromotionsAction'
    };

    for (const [method, action] of Object.entries(actionMappings)) {
        if (content.includes(method)) {
            content = content.split(method).join(action);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated: ' + filePath);
    }
});
