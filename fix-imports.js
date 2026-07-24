const fs = require('fs');

const files = [
    'c:/Users/Admin/Desktop/E-COMMERCE/apps/storefront/src/components/customer/testimonials.tsx',
    'c:/Users/Admin/Desktop/E-COMMERCE/apps/storefront/src/components/customer/faq-accordion.tsx',
    'c:/Users/Admin/Desktop/E-COMMERCE/apps/storefront/src/components/customer/hero-slider.tsx'
];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (f.includes('testimonials')) {
        content = 'import { MOCK_TESTIMONIALS } from "@hopsy/commerce/src/mock-data";\n' + content;
    } else if (f.includes('faq-accordion')) {
        content = 'import { MOCK_FAQS } from "@hopsy/commerce/src/mock-data";\n' + content;
    } else if (f.includes('hero-slider')) {
        content = 'import { MOCK_BANNERS } from "@hopsy/commerce/src/mock-data";\n' + content;
    }
    fs.writeFileSync(f, content, 'utf8');
});
