export interface MockCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  icon?: string;
  itemCount: number;
}

export interface MockBrand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo_url: string;
  productCount: number;
}

export interface MockProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  compare_at_price?: number;
  stock_quantity: number;
  attributes: Record<string, string>;
}

export interface MockProductSpecification {
  group: string;
  name: string;
  value: string;
}

export interface MockProductReview {
  id: string;
  user_name: string;
  rating: number;
  title: string;
  comment: string;
  created_at: string;
  verified_purchase: boolean;
}

export interface MockProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  short_description: string;
  price: number;
  compare_at_price?: number;
  currency: string;
  stock_quantity: number;
  status: "ACTIVE" | "DRAFT" | "OUT_OF_STOCK";
  is_featured: boolean;
  is_trending: boolean;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  is_flash_sale: boolean;
  flash_sale_end_time?: string;
  category: MockCategory;
  brand: MockBrand;
  images: string[];
  variants: MockProductVariant[];
  specifications: MockProductSpecification[];
  reviews: MockProductReview[];
  rating: number;
  review_count: number;
}

export const MOCK_CATEGORIES: MockCategory[] = [
  {
    id: "cat-laptops",
    name: "Laptops & Computers",
    slug: "laptops-computers",
    description:
      "High-performance laptops, desktop workstations, ultrabooks, and computing hardware engineered for professionals and creators.",
    image_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    icon: "Laptop",
    itemCount: 48,
  },
  {
    id: "cat-smartphones",
    name: "Smartphones & Tablets",
    slug: "smartphones-tablets",
    description:
      "Latest flagship 5G smartphones, foldable mobile devices, and high-resolution tablets with OLED displays.",
    image_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    icon: "Smartphone",
    itemCount: 64,
  },
  {
    id: "cat-audio",
    name: "Audio & Headphones",
    slug: "audio-headphones",
    description:
      "Studio-grade wireless noise-canceling headphones, audiophile in-ear monitors, and immersive Dolby Atmos sound systems.",
    image_url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
    icon: "Headphones",
    itemCount: 35,
  },
  {
    id: "cat-tvs",
    name: "Televisions & Home Theater",
    slug: "televisions-home-theater",
    description:
      "Ultra-definition 4K & 8K QD-OLED smart televisions, laser projectors, and cinematic surround sound receivers.",
    image_url: "https://images.unsplash.com/photo-1461151304256-428448b487e4?auto=format&fit=crop&w=800&q=80",
    icon: "Tv",
    itemCount: 22,
  },
  {
    id: "cat-gaming",
    name: "Gaming Consoles & VR",
    slug: "gaming-consoles-vr",
    description:
      "Next-generation gaming consoles, virtual reality headsets, high-refresh rate esports monitors, and mechanical controllers.",
    image_url: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80",
    icon: "Gamepad2",
    itemCount: 29,
  },
  {
    id: "cat-cameras",
    name: "Cameras & Drones",
    slug: "cameras-drones",
    description:
      "Professional full-frame mirrorless cameras, cinematic 8K aerial drones, and precision optical lenses.",
    image_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    icon: "Camera",
    itemCount: 18,
  },
  {
    id: "cat-home-appliances",
    name: "Home Appliances",
    slug: "home-appliances",
    description:
      "Modern stainless steel refrigerators, inverter washing machines, and smart cooling systems for luxury homes.",
    image_url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    icon: "Home",
    itemCount: 42,
  },
  {
    id: "cat-generators",
    name: "Generators & Power Systems",
    slug: "generators-power-systems",
    description:
      "Heavy-duty soundproof diesel generators, pure sine wave solar inverters, and high-capacity lithium backup units.",
    image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    icon: "Zap",
    itemCount: 25,
  },
  {
    id: "cat-kitchen",
    name: "Kitchen Appliances",
    slug: "kitchen-appliances",
    description:
      "Professional convection ovens, high-power precision blenders, smart air fryers, and espresso machines.",
    image_url: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80",
    icon: "Coffee",
    itemCount: 38,
  },
  {
    id: "cat-accessories",
    name: "Accessories & Peripherals",
    slug: "accessories-peripherals",
    description:
      "GaN fast chargers, braided Thunderbolt 4 cables, mechanical keyboards, and multi-port docking stations.",
    image_url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80",
    icon: "ShieldCheck",
    itemCount: 56,
  },
];

export const MOCK_BRANDS: MockBrand[] = [
  {
    id: "brand-apple",
    name: "Apple",
    slug: "apple",
    description:
      "Pioneering consumer electronics, personal computing, and seamless ecosystem hardware engineered for excellence.",
    logo_url: "/branding/brands/apple.svg",
    productCount: 42,
  },
  {
    id: "brand-samsung",
    name: "Samsung",
    slug: "samsung",
    description:
      "Global leader in advanced semiconductor display technology, mobile communications, and smart appliances.",
    logo_url: "/branding/brands/samsung.svg",
    productCount: 38,
  },
  {
    id: "brand-sony",
    name: "Sony",
    slug: "sony",
    description:
      "Architect of industry-standard acoustics, digital imaging sensors, and next-generation PlayStation entertainment.",
    logo_url: "/branding/brands/sony.svg",
    productCount: 31,
  },
  {
    id: "brand-bose",
    name: "Bose",
    slug: "bose",
    description:
      "Mastering psychoacoustics and active noise cancellation across premium headsets and spatial audio solutions.",
    logo_url: "/branding/brands/bose.svg",
    productCount: 16,
  },
  {
    id: "brand-lg",
    name: "LG Electronics",
    slug: "lg-electronics",
    description:
      "World-renowned innovators of self-lit OLED television panels, ultra-wide monitors, and home automation.",
    logo_url: "/branding/brands/lg.svg",
    productCount: 25,
  },
  {
    id: "brand-asus",
    name: "ASUS Republic of Gamers",
    slug: "asus-rog",
    description:
      "Extreme performance gaming notebooks, liquid-cooled graphics hardware, and high-frequency displays.",
    logo_url: "/branding/brands/asus-rog.svg",
    productCount: 20,
  },
  {
    id: "brand-hp",
    name: "HP",
    slug: "hp",
    description:
      "Enterprise computing infrastructure, high-performance Z-series workstations, and precision laser printing hardware.",
    logo_url: "/branding/brands/hp.svg",
    productCount: 28,
  },
  {
    id: "brand-dell",
    name: "Dell Technologies",
    slug: "dell",
    description:
      "Precision enterprise workstations, UltraSharp color-calibrated monitors, and scalable server infrastructure.",
    logo_url: "/branding/brands/dell.svg",
    productCount: 34,
  },
  {
    id: "brand-lenovo",
    name: "Lenovo",
    slug: "lenovo",
    description:
      "ThinkPad professional computing hardware, Legion performance architecture, and enterprise data center solutions.",
    logo_url: "/branding/brands/lenovo.svg",
    productCount: 29,
  },
  {
    id: "brand-canon",
    name: "Canon",
    slug: "canon",
    description:
      "Mastering optical precision with EOS mirrorless camera systems, RF cinema glass, and pro imaging hardware.",
    logo_url: "/branding/brands/canon.svg",
    productCount: 18,
  },
];

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: "prod-mbp-m3-max",
    name: "Apple MacBook Pro 16-inch (M3 Max, 36GB Unified Memory, 1TB SSD)",
    slug: "apple-macbook-pro-16-m3-max",
    sku: "MBP-16-M3MAX-36-1TB",
    description:
      "The 16-inch MacBook Pro with M3 Max delivers unprecedented performance for demanding workflows. Featuring a stunning Liquid Retina XDR display with up to 1600 nits peak brightness, hardware-accelerated ray tracing, up to 22 hours of battery life, and an advanced 6-speaker sound system with Spatial Audio.",
    short_description:
      "Extreme computing power for rendering, 3D modeling, and local AI workflows with 36GB unified memory.",
    price: 3850000,
    compare_at_price: 4100000,
    currency: "NGN",
    stock_quantity: 14,
    status: "ACTIVE",
    is_featured: true,
    is_trending: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_flash_sale: false,
    category: MOCK_CATEGORIES[0],
    brand: MOCK_BRANDS[0],
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80",
    ],
    variants: [
      {
        id: "var-mbp-space-black",
        name: "Space Black / 36GB / 1TB SSD",
        sku: "MBP-16-M3MAX-BLK",
        price: 3850000,
        compare_at_price: 4100000,
        stock_quantity: 9,
        attributes: { Color: "Space Black", Storage: "1TB SSD", Memory: "36GB" },
      },
      {
        id: "var-mbp-silver",
        name: "Silver / 36GB / 1TB SSD",
        sku: "MBP-16-M3MAX-SLV",
        price: 3850000,
        compare_at_price: 4100000,
        stock_quantity: 5,
        attributes: { Color: "Silver", Storage: "1TB SSD", Memory: "36GB" },
      },
    ],
    specifications: [
      { group: "Processor", name: "Chipset", value: "Apple M3 Max (14-core CPU, 30-core GPU)" },
      { group: "Display", name: "Screen Size & Type", value: "16.2-inch Liquid Retina XDR (3456 x 2234)" },
      { group: "Display", name: "Refresh Rate", value: "ProMotion adaptive up to 120Hz" },
      { group: "Memory & Storage", name: "Unified Memory", value: "36GB LPDDR5X" },
      { group: "Memory & Storage", name: "Internal SSD", value: "1TB NVMe Gen4" },
      { group: "Connectivity", name: "Ports", value: "3x Thunderbolt 4, HDMI 2.1, SDXC slot, MagSafe 3" },
      { group: "Battery", name: "Capacity & Life", value: "100Wh battery, up to 22 hours video playback" },
    ],
    reviews: [
      {
        id: "rev-1",
        user_name: "Chukwuemeka Okonkwo",
        rating: 5,
        title: "Absolute powerhouse for 4K video editing",
        comment:
          "I upgraded from an M1 Pro and the rendering speed in DaVinci Resolve is over twice as fast. The Space Black anodized finish truly resists fingerprints as advertised. Highly recommended!",
        created_at: "2026-06-15",
        verified_purchase: true,
      },
      {
        id: "rev-2",
        user_name: "Amina Yusuf",
        rating: 5,
        title: "Best display ever built into a laptop",
        comment:
          "The HDR peak brightness is blindingly sharp. Battery lasts nearly two full working days without plugging in during code compilation tasks.",
        created_at: "2026-06-28",
        verified_purchase: true,
      },
    ],
    rating: 4.9,
    review_count: 28,
  },
  {
    id: "prod-sony-wh1000xm5",
    name: "Sony WH-1000XM5 Wireless Active Noise-Canceling Headphones",
    slug: "sony-wh-1000xm5-wireless-headphones",
    sku: "SNY-WH1000XM5-BLK",
    description:
      "The Sony WH-1000XM5 headphones rewrite the rules for distraction-free listening and exceptional call clarity. With two processors controlling 8 microphones for unprecedented noise cancellation and Auto NC Optimizer that automatically optimizes cancellation based on your wearing conditions and environment.",
    short_description:
      "Industry-leading noise cancellation with 8 microphones, 30-hour battery life, and crystal clear hands-free calling.",
    price: 520000,
    compare_at_price: 580000,
    currency: "NGN",
    stock_quantity: 42,
    status: "ACTIVE",
    is_featured: true,
    is_trending: true,
    is_new_arrival: false,
    is_best_seller: true,
    is_flash_sale: true,
    flash_sale_end_time: "2026-07-15T23:59:59Z",
    category: MOCK_CATEGORIES[2],
    brand: MOCK_BRANDS[2],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
    ],
    variants: [
      {
        id: "var-sny-black",
        name: "Matte Black",
        sku: "SNY-WH1000XM5-BLK",
        price: 520000,
        compare_at_price: 580000,
        stock_quantity: 26,
        attributes: { Color: "Matte Black" },
      },
      {
        id: "var-sny-silver",
        name: "Platinum Silver",
        sku: "SNY-WH1000XM5-SLV",
        price: 520000,
        compare_at_price: 580000,
        stock_quantity: 16,
        attributes: { Color: "Platinum Silver" },
      },
    ],
    specifications: [
      { group: "Acoustics", name: "Driver Unit", value: "30mm precision carbon fiber composite" },
      { group: "Acoustics", name: "Frequency Response", value: "4Hz - 40,000Hz (JEITA)" },
      { group: "Noise Canceling", name: "Processors", value: "Integrated Processor V1 + HD Noise Canceling Processor QN1" },
      { group: "Connectivity", name: "Bluetooth Version", value: "Bluetooth 5.2 (LDAC, AAC, SBC support)" },
      { group: "Battery", name: "Playback Time", value: "Up to 30 hours with ANC ON (3 minutes fast charge for 3 hours)" },
    ],
    reviews: [
      {
        id: "rev-3",
        user_name: "Tunde Adebayo",
        rating: 5,
        title: "Silent sanctuary in noisy environments",
        comment:
          "The active noise cancellation blocks out engine hum on flights completely. Microphone quality on Zoom calls is crisp and suppresses background chatter.",
        created_at: "2026-05-19",
        verified_purchase: true,
      },
    ],
    rating: 4.8,
    review_count: 64,
  },
  {
    id: "prod-samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra (Titanium Gray, 512GB, 12GB RAM)",
    slug: "samsung-galaxy-s24-ultra-512gb",
    sku: "SAMSUNG-S24U-512-GRY",
    description:
      "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity, and possibility. Featuring a flat 6.8-inch Dynamic AMOLED 2X display with Corning Gorilla Armor that reduces reflections by 75%, powered by the customized Snapdragon 8 Gen 3 for Galaxy.",
    short_description:
      "Built with a tough titanium armor, integrated S Pen, and revolutionary 200MP Quad Tele System.",
    price: 2150000,
    compare_at_price: 2350000,
    currency: "NGN",
    stock_quantity: 19,
    status: "ACTIVE",
    is_featured: true,
    is_trending: true,
    is_new_arrival: true,
    is_best_seller: false,
    is_flash_sale: false,
    category: MOCK_CATEGORIES[1],
    brand: MOCK_BRANDS[1],
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1200&q=80",
    ],
    variants: [
      {
        id: "var-s24-titanium-gray",
        name: "Titanium Gray / 512GB",
        sku: "SAMSUNG-S24U-512-GRY",
        price: 2150000,
        compare_at_price: 2350000,
        stock_quantity: 12,
        attributes: { Color: "Titanium Gray", Storage: "512GB" },
      },
      {
        id: "var-s24-titanium-black",
        name: "Titanium Black / 512GB",
        sku: "SAMSUNG-S24U-512-BLK",
        price: 2150000,
        compare_at_price: 2350000,
        stock_quantity: 7,
        attributes: { Color: "Titanium Black", Storage: "512GB" },
      },
    ],
    specifications: [
      { group: "Processor", name: "SoC", value: "Qualcomm Snapdragon 8 Gen 3 for Galaxy (4nm)" },
      { group: "Display", name: "Screen", value: "6.8-inch QHD+ Dynamic AMOLED 2X, 2600 nits peak" },
      { group: "Camera System", name: "Main Sensor", value: "200MP f/1.7 wide + 50MP periscope telephoto (5x optical)" },
      { group: "Battery", name: "Capacity", value: "5000mAh with 45W wired fast charging & Qi wireless" },
      { group: "Build & Durability", name: "Materials", value: "Titanium frame, IP68 dust/water resistant" },
    ],
    reviews: [
      {
        id: "rev-4",
        user_name: "Folake Balogun",
        rating: 5,
        title: "The anti-reflective screen is a game changer",
        comment:
          "Using this outdoors in bright sunlight is effortless. The 5x optical zoom captures incredible detail at concerts and sports events.",
        created_at: "2026-06-22",
        verified_purchase: true,
      },
    ],
    rating: 4.9,
    review_count: 41,
  },
  {
    id: "prod-lg-g4-oled-65",
    name: "LG OLED evo G4 65-inch 4K Smart TV with Brightness Booster Max",
    slug: "lg-oled-evo-g4-65-inch-4k-tv",
    sku: "LG-OLED65G4PUA",
    description:
      "Experience cinematic perfection with the LG OLED evo G4. Powered by the α11 AI Processor 4K, this flagship Gallery Edition television delivers up to 150% higher peak brightness than conventional OLED screens with pixel-perfect infinite contrast, Dolby Vision HDR, and 144Hz VRR support for PC and console gaming.",
    short_description:
      "Self-lit OLED pixels with Brightness Booster Max, α11 AI Processor 4K, and flush wall mounting design.",
    price: 4500000,
    compare_at_price: 4900000,
    currency: "NGN",
    stock_quantity: 8,
    status: "ACTIVE",
    is_featured: true,
    is_trending: false,
    is_new_arrival: true,
    is_best_seller: false,
    is_flash_sale: false,
    category: MOCK_CATEGORIES[3],
    brand: MOCK_BRANDS[4],
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1200&q=80",
    ],
    variants: [
      {
        id: "var-lg-65",
        name: "65-Inch Gallery Edition",
        sku: "LG-OLED65G4PUA",
        price: 4500000,
        compare_at_price: 4900000,
        stock_quantity: 8,
        attributes: { Size: "65-Inch" },
      },
    ],
    specifications: [
      { group: "Display Technology", name: "Panel Type", value: "4K UHD Self-Lit OLED evo with Brightness Booster Max" },
      { group: "Processing", name: "AI Engine", value: "α11 AI Processor 4K with AI Super Upscaling" },
      { group: "Gaming", name: "VRR & Ports", value: "4x HDMI 2.1 (4K @ 144Hz), NVIDIA G-SYNC, AMD FreeSync Premium" },
      { group: "Audio", name: "Sound Output", value: "60W 4.2 Channel Acoustic AI Sound Pro with Dolby Atmos" },
    ],
    reviews: [
      {
        id: "rev-5",
        user_name: "Obinna Nwachukwu",
        rating: 5,
        title: "Unreal black levels and HDR impact",
        comment:
          "Watching 4K Blu-rays on this G4 is like having a private IMAX theater. The wall mount sits completely flush against the living room wall.",
        created_at: "2026-06-10",
        verified_purchase: true,
      },
    ],
    rating: 5.0,
    review_count: 15,
  },
  {
    id: "prod-ps5-pro",
    name: "Sony PlayStation 5 Pro Console (2TB SSD, AI Enhanced Resolution)",
    slug: "sony-playstation-5-pro-console",
    sku: "SONY-PS5-PRO-2TB",
    description:
      "Witness gaming fidelity without compromise. The PlayStation 5 Pro features a upgraded GPU with 67% more compute units than the standard PS5, advanced ray tracing capabilities, and PlayStation Spectral Super Resolution (PSSR) AI-driven upscaling for crisp 4K 60FPS+ gaming across supported titles.",
    short_description:
      "Next-gen gaming console with 2TB internal SSD, Wi-Fi 7 connectivity, and upgraded GPU architecture.",
    price: 1350000,
    compare_at_price: 1500000,
    currency: "NGN",
    stock_quantity: 33,
    status: "ACTIVE",
    is_featured: false,
    is_trending: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_flash_sale: true,
    flash_sale_end_time: "2026-07-16T23:59:59Z",
    category: MOCK_CATEGORIES[4],
    brand: MOCK_BRANDS[2],
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80",
    ],
    variants: [
      {
        id: "var-ps5-pro-digital",
        name: "2TB Pro Console",
        sku: "SONY-PS5-PRO-2TB",
        price: 1350000,
        compare_at_price: 1500000,
        stock_quantity: 33,
        attributes: { Storage: "2TB SSD" },
      },
    ],
    specifications: [
      { group: "Processing", name: "GPU & CPU", value: "AMD Radeon RDNA architecture upgraded GPU + Ryzen Zen 2 8-core CPU" },
      { group: "Storage", name: "Internal SSD", value: "2TB Custom High-Speed NVMe Gen4" },
      { group: "Connectivity", name: "Wireless & LAN", value: "Wi-Fi 7 (IEEE 802.11be), Gigabit Ethernet, Bluetooth 5.3" },
      { group: "Output", name: "Display Support", value: "HDMI 2.1 VRR, up to 8K resolution support, 120Hz output" },
    ],
    reviews: [
      {
        id: "rev-6",
        user_name: "Kenneth Eze",
        rating: 5,
        title: "Spider-Man 2 at 4K 60 FPS with ray tracing is stunning",
        comment:
          "The extra GPU horsepower means you never have to choose between Performance mode and Fidelity mode again. 2TB storage right out of the box is fantastic.",
        created_at: "2026-07-01",
        verified_purchase: true,
      },
    ],
    rating: 4.9,
    review_count: 52,
  },
  {
    id: "prod-asus-rog-zephyrus-g16",
    name: "ASUS ROG Zephyrus G16 (Intel Core Ultra 9, RTX 4090, 32GB RAM, 2TB SSD)",
    slug: "asus-rog-zephyrus-g16-rtx-4090",
    sku: "ASUS-G16-GU605MY",
    description:
      "Precision CNC aluminum unibody meets unbridled gaming and creative dominance. The ROG Zephyrus G16 houses an Intel Core Ultra 9 185H processor and NVIDIA GeForce RTX 4090 Laptop GPU within an ultra-sleek 1.49cm chassis, displayed on a 16-inch 2.5K 240Hz OLED Nebula Display with 0.2ms response time.",
    short_description:
      "Ultra-thin CNC aluminum gaming laptop with 2.5K 240Hz OLED Nebula Display and RTX 4090 graphics.",
    price: 4950000,
    compare_at_price: 5300000,
    currency: "NGN",
    stock_quantity: 6,
    status: "ACTIVE",
    is_featured: false,
    is_trending: true,
    is_new_arrival: false,
    is_best_seller: false,
    is_flash_sale: false,
    category: MOCK_CATEGORIES[0],
    brand: MOCK_BRANDS[5],
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
    ],
    variants: [
      {
        id: "var-rog-g16",
        name: "Eclipse Gray / RTX 4090 / 32GB",
        sku: "ASUS-G16-GU605MY",
        price: 4950000,
        compare_at_price: 5300000,
        stock_quantity: 6,
        attributes: { Color: "Eclipse Gray", GPU: "RTX 4090" },
      },
    ],
    specifications: [
      { group: "Processor", name: "CPU", value: "Intel Core Ultra 9 185H (16 cores, up to 5.1GHz with AI NPU)" },
      { group: "Graphics", name: "Dedicated GPU", value: "NVIDIA GeForce RTX 4090 Laptop GPU 16GB GDDR6 (115W max TGP)" },
      { group: "Display", name: "OLED Screen", value: "16-inch 2.5K (2560 x 1600) OLED, 240Hz, 0.2ms, 100% DCI-P3" },
      { group: "Memory & Storage", name: "RAM & SSD", value: "32GB LPDDR5X 7467MHz + 2TB PCIe 4.0 NVMe M.2 SSD" },
    ],
    reviews: [
      {
        id: "rev-7",
        user_name: "Daniel Ibeh",
        rating: 5,
        title: "The OLED screen ruins every other monitor",
        comment:
          "Incredible build quality and shocking thinness for an RTX 4090 laptop. Runs cool when quiet mode is enabled for normal work.",
        created_at: "2026-06-18",
        verified_purchase: true,
      },
    ],
    rating: 4.8,
    review_count: 19,
  },
];

export const MOCK_BANNERS = [
  {
    id: "banner-hero-1",
    title: "Next-Gen Computing & AI Workstations",
    subtitle: "Engineered for uncompromising speed, precision, and endurance.",
    tagline: "NEW ARRIVALS 2026",
    cta_text: "Explore Mac & PC Flagships",
    cta_link: "/categories/laptops-computers",
    image_url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1600&q=80",
    badge: "M3 MAX & INTEL ULTRA 9",
  },
  {
    id: "banner-hero-2",
    title: "Cinematic QD-OLED & Dolby Atmos",
    subtitle: "Turn your living room into a master studio with self-lit OLED clarity.",
    tagline: "HOME THEATER REVOLUTION",
    cta_text: "Shop Televisions & Audio",
    cta_link: "/categories/televisions-home-theater",
    image_url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80",
    badge: "UP TO 150% BRIGHTER",
  },
  {
    id: "banner-hero-3",
    title: "Immersive Audio & Active Noise Canceling",
    subtitle: "Pure studio acoustic fidelity paired with 30-hour wireless endurance.",
    tagline: "PREMIUM SOUND",
    cta_text: "Discover Audiophile Gear",
    cta_link: "/categories/audio-headphones",
    image_url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1600&q=80",
    badge: "SONY WH-1000XM5 IN STOCK",
  },
  {
    id: "banner-hero-4",
    title: "Luxury Home & Kitchen Appliances",
    subtitle: "Upgrade your living space with smart inverter refrigerators and precision washing machines.",
    tagline: "SMART LIVING 2026",
    cta_text: "Shop Home Appliances",
    cta_link: "/categories/home-appliances",
    image_url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80",
    badge: "ENERGY EFFICIENT INVERTER",
  },
  {
    id: "banner-hero-5",
    title: "Uninterrupted Power & Solar Inverters",
    subtitle: "Heavy-duty soundproof generators and pure sine wave backup systems for home and enterprise.",
    tagline: "RELIABLE POWER SOLUTIONS",
    cta_text: "Explore Power Systems",
    cta_link: "/categories/generators-power-systems",
    image_url: "https://images.unsplash.com/photo-1509391365360-fa048f190586?auto=format&fit=crop&w=1600&q=80",
    badge: "HEAVY DUTY CAPACITY",
  },
];

export const MOCK_TESTIMONIALS = [
  {
    id: "test-1",
    author: "Engr. Babatunde Sowande",
    role: "Senior Solutions Architect",
    company: "Lagos Tech Hub",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    content:
      "HOPSY PLAZA delivered our enterprise MacBook Pro workstations to Victoria Island within 24 hours of placing our institutional order. Every unit arrived factory sealed with complete serial verification.",
    rating: 5,
  },
  {
    id: "test-2",
    author: "Dr. Ngozi Okafor",
    role: "Head of Radiology Research",
    company: "Abuja Medical Diagnostics",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    content:
      "We rely on high-resolution 4K and 8K OLED monitors for clinical imaging reviews. HOPSY PLAZA’s product specifications and dedicated technical support are unmatched across Nigeria.",
    rating: 5,
  },
  {
    id: "test-3",
    author: "David Peters",
    role: "Executive Film Producer",
    company: "Nollywood Studios",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    content:
      "When we needed emergency high-capacity NVMe storage arrays and Sony audio hardware during a major production shoot, HOPSY PLAZA’s customer service handled our request flawlessly.",
    rating: 5,
  },
];

export interface MockFaq {
  id?: string;
  question: string;
  answer: string;
}

export const MOCK_FAQS: MockFaq[] = [
  {
    id: "faq-1",
    question: "Are all electronics sold on HOPSY PLAZA factory sealed and authentic?",
    answer:
      "Yes. Every single product listed on HOPSY PLAZA is sourced directly from original equipment manufacturers (OEMs) and authorized regional distributors. We guarantee 100% genuine, factory-sealed hardware with full manufacturer warranty coverage.",
  },
  {
    id: "faq-2",
    question: "What warranty and return protection comes with my purchase?",
    answer:
      "All purchases come with a standard 12-to-24 month manufacturer warranty depending on the brand. Additionally, HOPSY PLAZA provides a 7-day hassle-free return window for factory defects or DOA (dead on arrival) hardware.",
  },
  {
    id: "faq-3",
    question: "How fast is shipping and delivery across Nigeria?",
    answer:
      "We offer same-day or next-day express courier delivery across Lagos, Abuja, and Port Harcourt for orders placed before 2:00 PM. Nationwide deliveries to other states take between 2 to 4 business days via insured logistics partners.",
  },
  {
    id: "faq-4",
    question: "Do you offer corporate or volume ordering for institutions?",
    answer:
      "Yes! Our B2B Enterprise Division assists businesses, universities, and government institutions with volume hardware procurement, custom invoicing, and dedicated account managers.",
  },
];

export interface MockLayoutCardItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  oldPrice?: string;
  rating?: number;
  reviews?: number;
  category?: string;
  image_url: string;
  badge?: string;
  tag?: string;
  slug: string;
}

export const MOCK_BENTO_CATEGORIES = [
  {
    id: "bento-smart-home",
    name: "Smart Home & Voice",
    productCount: "12+ products",
    image_url: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=600&q=80",
    slug: "smart-home",
  },
  {
    id: "bento-gaming",
    name: "High-Performance Gaming",
    productCount: "8+ products",
    image_url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80",
    slug: "gaming-consoles-vr",
  },
  {
    id: "bento-vr-ar",
    name: "Virtual & Augmented Reality",
    productCount: "15+ products",
    image_url: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=800&q=80",
    slug: "gaming-consoles-vr",
    isLarge: true,
  },
  {
    id: "bento-audio",
    name: "Premium Audio & Earbuds",
    productCount: "24+ products",
    image_url: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=600&q=80",
    slug: "audio-headphones",
  },
  {
    id: "bento-photo",
    name: "Pro Photography & Action",
    productCount: "10+ products",
    image_url: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=600&q=80",
    slug: "cameras-drones",
  },
];

export const MOCK_YOU_MIGHT_LIKE_PRODUCTS: MockLayoutCardItem[] = [
  {
    id: "yml-1",
    title: "Front-Load Washer 12kg Pro",
    subtitle: "Premium stainless steel inverter direct drive drum with steam sterilization",
    price: "$899.00",
    oldPrice: "$1,050.00",
    image_url: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80",
    slug: "front-load-washer-12kg",
  },
  {
    id: "yml-2",
    title: "Laser Office Printer Pro 4K",
    subtitle: "High-speed wireless duplex color printing with Gigabit Ethernet",
    price: "$249.00",
    oldPrice: "$299.00",
    image_url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80",
    slug: "laser-office-printer-pro",
  },
  {
    id: "yml-3",
    title: "12-Function Smart Convection Oven",
    subtitle: "Digital touchscreen air fry oven with dual infrared heating elements",
    price: "$329.00",
    oldPrice: "$399.00",
    image_url: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80",
    slug: "12-function-smart-oven",
  },
  {
    id: "yml-4",
    title: "470L Stainless Steel Smart Fridge",
    subtitle: "Dual inverter cooling technology with external LED touch control panel",
    price: "$1,299.00",
    oldPrice: "$1,499.00",
    image_url: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=600&q=80",
    slug: "470l-stainless-steel-fridge",
  },
];

export const MOCK_TOP_SELLING_PRODUCTS: MockLayoutCardItem[] = [
  {
    id: "top-1",
    title: "Mechanical Keyboard Pro RGB",
    subtitle: "Hot-swappable tactile mechanical switches with aircraft-grade aluminum frame",
    price: "$149.00",
    oldPrice: "$189.00",
    rating: 4.9,
    reviews: 328,
    image_url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    slug: "mechanical-keyboard-pro",
  },
  {
    id: "top-2",
    title: "Mirrorless Camera 4K Pro Sensor",
    subtitle: "Professional full-frame mirrorless digital camera with 61MP sensor & IBIS",
    price: "$1,499.00",
    oldPrice: "$1,699.00",
    rating: 5.0,
    reviews: 142,
    image_url: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80",
    slug: "mirrorless-camera-4k",
  },
  {
    id: "top-3",
    title: "Studio Wireless ANC Headphones",
    subtitle: "Active noise cancelling over-ear studio acoustics with 40mm neodymium drivers",
    price: "$299.00",
    oldPrice: "$349.00",
    rating: 4.8,
    reviews: 519,
    image_url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80",
    slug: "studio-wireless-headphones",
  },
  {
    id: "top-4",
    title: "Smart Air Purifier HEPA H13",
    subtitle: "Room air purification with real-time laser PM2.5 sensor & quiet night mode",
    price: "$399.00",
    oldPrice: "$459.00",
    rating: 4.9,
    reviews: 215,
    image_url: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80",
    slug: "smart-air-purifier-hepa",
  },
];

export const MOCK_TRENDING_LAYOUT_PRODUCTS: MockLayoutCardItem[] = [
  {
    id: "tr-1",
    title: "Ultra Slate Phone 15 Pro",
    subtitle: "Titanium chassis 5G flagship with triple 48MP periscope telephoto lens",
    category: "Smartphones",
    price: "$999.00",
    rating: 4.9,
    image_url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    slug: "ultra-slate-phone-15-pro",
  },
  {
    id: "tr-2",
    title: "ProBook X14 Ultra Laptop",
    subtitle: "14-inch OLED 120Hz display with M3 Max workstation processor & 32GB RAM",
    category: "Laptops",
    price: "$1,399.00",
    rating: 4.8,
    image_url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80",
    slug: "probook-x14-ultra-laptop",
  },
  {
    id: "tr-3",
    title: "CyberWatch Series 9 Titanium",
    subtitle: "Advanced health tracking with ECG sensor, GPS navigation & sapphire glass",
    category: "Wearables",
    price: "$429.00",
    rating: 4.9,
    image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    slug: "cyberwatch-series-9",
  },
  {
    id: "tr-4",
    title: "Quantum Fold 5G Smartphone",
    subtitle: "7.6-inch foldable AMOLED Infinity flex display with multitasking pen support",
    category: "Smartphones",
    price: "$1,199.00",
    rating: 4.7,
    image_url: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    slug: "quantum-fold-5g",
  },
];

export const MOCK_LATEST_LAUNCHES: MockLayoutCardItem[] = [
  {
    id: "la-1",
    title: "AirBuds Case Pro USB-C",
    subtitle: "Active noise cancelling earbuds with spatial audio & MagSafe charging case",
    price: "$199.00",
    image_url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    slug: "airbuds-case-pro",
  },
  {
    id: "la-2",
    title: "SportWatch Rugged 45mm",
    subtitle: "Extreme endurance GPS multi-sport watch with 100m water resistance rating",
    price: "$349.00",
    image_url: "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=600&q=80",
    slug: "sportwatch-rugged-45mm",
  },
  {
    id: "la-3",
    title: "Gaming Headset 7.1 Surround",
    subtitle: "Ultra-low latency 2.4GHz wireless esports headset with detachable mic",
    price: "$179.00",
    image_url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    slug: "gaming-headset-71",
  },
  {
    id: "la-4",
    title: "Titanium Watch Series 9 Elite",
    subtitle: "Ultra-slim aerospace grade titanium smartwatch with always-on retina display",
    price: "$449.00",
    image_url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=600&q=80",
    slug: "titanium-watch-series-9",
  },
];

