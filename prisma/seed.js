import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Delete all products and categories to prevent duplicates
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.howItWorksStep.deleteMany();
  await prisma.service.deleteMany();
  await prisma.attendanceSolution.deleteMany({});
  await prisma.milestone.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.watchTestimonial.deleteMany();
 
  // Clear PageHero via raw SQL to avoid type dependency
  await prisma.$executeRaw`DELETE FROM "PageHero";`;

  // 1. Seed categories first
  await prisma.category.createMany({
    data: [
      {
        title: 'Luxury Watches',
        description: 'Premium Swiss-made timepieces with unmatched craftsmanship',
        icon: 'ri-time-line',
        image:
          "https://readdy.ai/api/search-image?query=luxury%20Swiss%20watches%20collection%20in%20elegant%20display%20case%2C%20premium%20timepieces%20with%20gold%20and%20silver%20finishes%2C%20high-end%20jewelry%20store%20presentation&width=600&height=400&seq=category1&orientation=landscape",
      },
      {
        title: 'Wall Clocks',
        description: 'Modern and classic wall clocks for homes and offices',
        icon: 'ri-timer-flash-line',
        image:
          "https://readdy.ai/api/search-image?query=elegant%20wall%20clocks%20collection%20in%20modern%20office%20setting%2C%20contemporary%20timepiece%20designs%2C%20professional%20business%20environment%20display&width=600&height=400&seq=category2&orientation=landscape",
      },
      {
        title: 'Smart Devices',
        description: 'Biometric and AI-powered attendance and time management systems',
        icon: 'ri-cpu-line',
        image:
          "https://readdy.ai/api/search-image?query=modern%20biometric%20attendance%20devices%20and%20smart%20time%20tracking%20systems%20in%20corporate%20office%2C%20advanced%20technology%20equipment%2C%20professional%20workplace&width=600&height=400&seq=category3&orientation=landscape",
      },
    ],
    skipDuplicates: true,
  });

  // 2. Get category IDs
  const luxuryWatches = await prisma.category.findFirst({ where: { title: 'Luxury Watches' } });
  const wallClocks = await prisma.category.findFirst({ where: { title: 'Wall Clocks' } });
  const smartDevices = await prisma.category.findFirst({ where: { title: 'Smart Devices' } });

  // 3. Seed products with categoryId (richer data set)
  await prisma.product.createMany({
    data: [
      // Luxury Watches
      {
        name: 'Royal Swiss Chronograph',
        price: 3499,
        originalPrice: 3999,
        categoryId: luxuryWatches?.id,
        rating: 5,
        description: 'Swiss precision meets timeless elegance in this masterpiece',
        image: 'https://readdy.ai/api/search-image?query=luxury%20Swiss%20chronograph%20watch%20with%20leather%20strap%2C%20premium%20timepiece%20with%20elegant%20design%2C%20high-end%20business%20watch%2C%20professional%20photography&width=400&height=500&seq=featured1&orientation=portrait',
        badges: 'Limited Edition,Swiss Made, Premium Boxed',
        tags: ['Swiss Made', 'Chronograph'], 
        featured: true,
        bestseller: true,
        type: 'limited',
      },
      {
        name: 'Heritage Gold Collection',
        price: 4999,
        originalPrice: 5499,
        categoryId: luxuryWatches?.id,
        rating: 5,
        description: 'Handcrafted gold timepiece with century-old craftsmanship',
        image: 'https://readdy.ai/api/search-image?query=luxury%20gold%20watch%20with%20intricate%20craftsmanship%2C%20heritage%20timepiece%20with%20premium%20materials%2C%20elegant%20classic%20design%2C%20high-end%20jewelry&width=400&height=500&seq=featured4&orientation=portrait',
        badges: 'Handcrafted,Gold Plated',
        bestseller: true,
      },
      {
        name: 'Royal Swiss Heritage',
        price: 4999,
        originalPrice: 5499,
        rating: 5,
        categoryId: luxuryWatches?.id,
        description: 'Handcrafted Swiss movement with 18k gold case',
        image: 'https://readdy.ai/api/search-image?query=luxury%20Swiss%20watch%20with%20gold%20case%20and%20leather%20strap%2C%20classic%20heritage%20timepiece%2C%20elegant%20design%2C%20premium%20craftsmanship%2C%20professional%20jewelry%20photography&width=400&height=500&seq=watch1&orientation=portrait',
        badges: 'Classic,Swiss Movement, 18k Gold, Sapphire Crystal',
        bestseller: false,
      },
      {
        name: 'Chronograph Master Pro',
        price: 3299,
        originalPrice: 3799,
        categoryId: luxuryWatches?.id,
        rating: 5,
        description: 'Professional chronograph for active lifestyle',
        image: 'https://readdy.ai/api/search-image?query=luxury%20sports%20chronograph%20watch%20with%20steel%20bracelet%2C%20professional%20timepiece%20for%20active%20lifestyle%2C%20modern%20sporty%20design%2C%20high-end%20watch%20photography&width=400&height=500&seq=watch2&orientation=portrait',
        badges: 'Chronograph,Steel Case,Water Resistant,sports',
        bestseller: false,
        type: 'sports',
      },
      {
        name: 'Diamond Elite Collection',
        price: 8999,
        originalPrice: 9999,
        categoryId: luxuryWatches?.id,
        rating: 5,
        description: 'Limited edition with diamond accents',
        image: 'https://readdy.ai/api/search-image?query=luxury%20diamond%20watch%20with%20precious%20stones%2C%20limited%20edition%20timepiece%2C%20elegant%20jewelry%20design%2C%20high-end%20luxury%20watch%20with%20sparkling%20diamonds&width=400&height=500&seq=watch3&orientation=portrait',
        badges: 'Diamonds,Limited Edition, Premium Box,limited',
        bestseller: false,
        type: 'limited',
      },
      {
        name: 'Executive Business',
        price: 2799,
        originalPrice: 3199,
        categoryId: luxuryWatches?.id,
        rating: 4,
        description: 'Perfect timepiece for business professionals',
        image: 'https://readdy.ai/api/search-image?query=elegant%20business%20watch%20with%20leather%20strap%2C%20professional%20executive%20timepiece%2C%20classic%20design%20for%20business%20wear%2C%20sophisticated%20watch%20photography&width=400&height=500&seq=watch4&orientation=portrait',
        badges: 'Business Style,Leather Strap,Classic Design, Classic',
        bestseller: false,
      },
      {
        name: 'Sports Titanium Pro',
        price: 3899,
        originalPrice: 4299,
        categoryId: luxuryWatches?.id,
        rating: 5,
        description: 'Lightweight titanium for extreme sports',
        image: 'https://readdy.ai/api/search-image?query=titanium%20sports%20watch%20with%20robust%20design%2C%20extreme%20sports%20timepiece%2C%20lightweight%20professional%20watch%2C%20modern%20athletic%20design&width=400&height=500&seq=watch5&orientation=portrait',
        badges: 'Titanium, Shock Resistant, GPS, sports',
        bestseller: false,
        type: 'sports',
      },
      {
        name: 'Platinum Anniversary',
        price: 12999,
        originalPrice: 14999,
        categoryId: luxuryWatches?.id,
        rating: 5,
        description: 'Commemorative platinum edition',
        image: 'https://readdy.ai/api/search-image?query=platinum%20luxury%20watch%20commemorative%20edition%2C%20premium%20timepiece%20with%20platinum%20case%2C%20exclusive%20anniversary%20design%2C%20high-end%20luxury%20watch%20photography&width=400&height=500&seq=watch6&orientation=portrait',
        badges: 'Platinum Case,Limited Edition, Anniversary Edition, Certificate',
        bestseller: true,
        type: 'limited',
      },
      {
        name: 'Heritage Gold Watch',
        price: 4999,
        description: 'Handcrafted with 18k gold accents',
        image: 'https://readdy.ai/api/search-image?query=luxury%20gold%20watch%20with%20intricate%20details%2C%20heritage%20timepiece%20with%20premium%20materials%2C%20elegant%20classic%20design%2C%20high-end%20craftsmanship%2C%20professional%20jewelry%20photography&width=400&height=500&seq=product3&orientation=portrait',
        badges: 'Gold, Heritage',
        tags: ['Gold', 'Heritage'],
        featured: true,
        bestseller: true,
        categoryId: luxuryWatches?.id,
        type: 'limited',
      },

       // Wall Clocks
       {
        name: 'Executive Wall Clock',
        price: 899,
        description: 'Modern digital display for boardrooms',
        image: 'https://readdy.ai/api/search-image?query=elegant%20executive%20wall%20clock%20with%20digital%20display%2C%20modern%20office%20timepiece%2C%20sleek%20contemporary%20design%2C%20professional%20business%20environment%2C%20clean%20background&width=400&height=600&seq=product2&orientation=portrait',
        tags: ['Digital', 'Executive'],
        featured: false,
        categoryId: wallClocks?.id,
        size: '24 inches',
      },
       {
        name: 'Executive Digital Display',
        price: 599,
        originalPrice: 699,
        categoryId: wallClocks?.id,
        rating: 5,
        description: 'Modern digital wall clock perfect for boardrooms',
        image: 'https://readdy.ai/api/search-image?query=modern%20digital%20wall%20clock%20with%20LED%20display%20for%20executive%20office%2C%20sleek%20contemporary%20design%2C%20professional%20business%20timepiece&width=400&height=500&seq=featured2&orientation=portrait',
        badges: 'LED Display, Remote Control,Multiple Time Zones,Digital',
        bestseller: false,
        size: '24 inches',
      },
      {
      
        name: 'Classic Analog Heritage',
        price: 649,
        originalPrice: 749,
        categoryId: wallClocks?.id,
        rating: 5,
        description: 'Traditional design with premium wood finish',
        image: 'https://readdy.ai/api/search-image?query=classic%20wooden%20wall%20clock%20with%20traditional%20analog%20design%2C%20elegant%20office%20timepiece%2C%20premium%20wood%20finish%2C%20sophisticated%20business%20environment&width=400&height=500&seq=clock2&orientation=portrait',
        badges: 'Wood Frame, Silent Movement, Roman Numerals',
        bestseller: false,
        size: '18 inches',
      },
      {
        name: 'Conference Room Master',
        price: 799,
        originalPrice: 899,
        categoryId: wallClocks?.id,
        rating: 4,
        description: 'Large format clock designed for meeting spaces',
        image: 'https://readdy.ai/api/search-image?query=large%20conference%20room%20wall%20clock%20with%20clear%20visibility%2C%20professional%20meeting%20room%20timepiece%2C%20modern%20corporate%20office%20design&width=400&height=500&seq=featured5&orientation=portrait',
        badges: 'Meeting Timer, Date Display, Temperature, Digital',
        bestseller: false,
        size: '30 inches',
      },
      {
        
        name: 'Vintage Industrial Clock',
        price: 799,
        originalPrice: 899,
        categoryId: wallClocks?.id,
        rating:5,
        description: 'Industrial style with metal gears and vintage appeal',
        image: 'https://readdy.ai/api/search-image?query=vintage%20industrial%20wall%20clock%20with%20metal%20gears%2C%20steampunk%20style%20timepiece%2C%20rustic%20office%20decoration%2C%20industrial%20design%20elements&width=400&height=500&seq=clock5&orientation=portrait',
        badges: 'analog, Metal Gears, Vintage Style, Industrial Design',
        bestseller: false,
        size: '20 inches',
      },
      {
        name: 'Modern Minimalist Pro',
        price: 549,
        originalPrice: 649,
        categoryId: wallClocks?.id,
        rating: 5,
        description: 'Sleek contemporary design for modern offices',
        image: 'https://readdy.ai/api/search-image?query=modern%20minimalist%20wall%20clock%20with%20sleek%20design%2C%20contemporary%20office%20timepiece%2C%20clean%20lines%2C%20professional%20modern%20workspace&width=400&height=500&seq=clock3&orientation=portrait',
        badges: 'Minimalist Design,Metal Frame,Easy Mount',
        bestseller: false,
        size: '16 inches',
      },  
      {
        name: 'Smart Office Clock',
        price: 1099,
        originalPrice: 1299,
        categoryId: wallClocks?.id,
        rating: 5,
        description: 'WiFi connected with app control and notifications',
        image: 'https://readdy.ai/api/search-image?query=smart%20wall%20clock%20with%20WiFi%20connectivity%2C%20modern%20office%20technology%2C%20app-controlled%20timepiece%2C%20futuristic%20business%20clock&width=400&height=500&seq=clock6&orientation=portrait',
        badges: 'WiFi Connected,App Control,Smart Notifications',
        bestseller: false,
        size: '22 inches',
      },
      
      // Smart Devices
      {
        name: 'Biometric Pro System',
        price: 1799,
        description: 'Advanced fingerprint recognition system',
        image: 'https://readdy.ai/api/search-image?query=modern%20biometric%20attendance%20system%20with%20fingerprint%20scanner%2C%20professional%20corporate%20time%20tracking%20device%2C%20sleek%20touchscreen%20interface%2C%20office%20technology&width=400&height=600&seq=product4&orientation=portrait',
        tags: ['Biometric', 'Professional'],
        featured: false,
        categoryId: smartDevices?.id
      },
      {
        name: 'SmartTime Enterprise',
        price: 1899,
        originalPrice: 2299,
        categoryId: smartDevices?.id,
        rating: 5,
        description: 'Advanced biometric system with AI-powered analytics',
        image: 'https://readdy.ai/api/search-image?query=advanced%20biometric%20attendance%20system%20with%20touchscreen%20display%2C%20modern%20corporate%20time%20tracking%20device%2C%20professional%20office%20technology&width=400&height=500&seq=featured3&orientation=portrait',
        badges: 'AI Powered,Cloud Ready',
        bestseller: false,
      },
      {
        name: 'Biometric Pro Max',
        price: 2499,
        originalPrice: 2799,
        categoryId: smartDevices?.id,
        rating: 5,
        description: 'Multi-modal biometric system with facial recognition',
        image: 'https://readdy.ai/api/search-image?query=advanced%20biometric%20device%20with%20facial%20recognition%20technology%2C%20modern%20security%20system%2C%20professional%20corporate%20attendance%20solution&width=400&height=500&seq=featured6&orientation=portrait',
        badges: 'Facial Recognition,Multi-modal,Security',
        bestseller: true,
      },
      {
        name: 'BioPro Enterprise Max',
        price: 2499,
        originalPrice: 2799,
        categoryId: smartDevices?.id,
        rating: 5,
        description: 'Advanced multi-modal biometric system with AI analytics',
        image: 'https://readdy.ai/api/search-image?query=advanced%20biometric%20attendance%20device%20with%20fingerprint%20scanner%20and%20touchscreen%20display%2C%20professional%20corporate%20time%20tracking%20system%2C%20modern%20office%20technology&width=400&height=500&seq=device1&orientation=portrait',
        badges: 'Multi-modal,AI Analytics,Cloud Integration, Attendance System,10000 Users,Biometric',
        bestseller: false,        
      },
      {
        name: 'FaceTime Recognition Pro',
        price: 3299,
        originalPrice: 3799,
        categoryId: smartDevices?.id,
        rating: 5,
        description: 'State-of-the-art facial recognition with temperature screening',
        image: 'https://readdy.ai/api/search-image?query=facial%20recognition%20attendance%20system%20with%20temperature%20scanner%2C%20modern%20biometric%20device%20for%20office%20entry%2C%20professional%20workplace%20security%20technology&width=400&height=500&seq=device2&orientation=portrait',
        badges: 'Facial Recognition,Temperature Check, facial, Mask Detection,50000 Users',
        bestseller: false,
      },
      // Remove invalid non-Product-shaped entries and keep only valid Product records
      {
        name: 'SmartTrack AI Suite',
        price: 1899,
        originalPrice: 2299,
        categoryId: smartDevices?.id,
        rating: 5,
        description: 'Intelligent time tracking with behavioral analytics',
        image: 'https://readdy.ai/api/search-image?query=smart%20time%20tracking%20device%20with%20AI%20capabilities%2C%20intelligent%20attendance%20system%2C%20modern%20workplace%20analytics%20technology%2C%20professional%20office%20equipment&width=400&height=500&seq=device3&orientation=portrait',
        badges: 'AI Behavior,Smart Analytics, Mobile App,5000 Users,Biometric',
        bestseller: true,
      },
      {
        name: 'Fingerprint Elite Station',
        price: 1599,
        originalPrice: 1899,
        categoryId: smartDevices?.id,
        rating:5,
        description: 'High-precision fingerprint scanner with RFID support',
        image: 'https://readdy.ai/api/search-image?query=professional%20fingerprint%20scanner%20with%20RFID%20card%20reader%2C%20biometric%20attendance%20terminal%2C%20modern%20office%20security%20device%2C%20corporate%20time%20tracking&width=400&height=500&seq=device4&orientation=portrait',
        badges: 'Fingerprint,RFID Cards,Biometric,Battery Backup,8000 Users',
        bestseller:false,
      },  
      {
        name: 'Vision AI Recognition',
        price: 4299,
        originalPrice: 4999,
        categoryId: smartDevices?.id,
        rating:5,
        description: 'Enterprise-grade facial recognition with advanced AI',
        image: 'https://readdy.ai/api/search-image?query=enterprise%20facial%20recognition%20system%20with%20advanced%20AI%20technology%2C%20professional%20biometric%20device%20for%20corporate%20security%2C%20high-end%20office%20equipment&width=400&height=500&seq=device5&orientation=portrait',
        badges: 'Advanced AI, Real-time Processing,100000 Users, Enterprise Grade',
        bestseller:true,
      },
      {
        name: 'Smart Workplace Hub',
        price: 2899,
        originalPrice: 3299,
        categoryId: smartDevices?.id,
        rating:5,
        description: 'All-in-one workplace management system with IoT integration',
        image: 'https://readdy.ai/api/search-image?query=smart%20workplace%20management%20hub%20with%20IoT%20integration%2C%20modern%20office%20technology%20center%2C%20intelligent%20building%20management%20system%2C%20professional%20tech%20device&width=400&height=500&seq=device6&orientation=portrait',
        badges: 'IoT Integration, Workplace Analytics, Smart Controls',
        bestseller:true,
      }
      
    ],
  });
  
  // Seed How It Works Steps
  await prisma.howItWorksStep.createMany({
    data: [
      {
        icon: 'ri-search-line',
        title: 'Browse Collection',
        description:
          'Explore our premium selection of Swiss watches, elegant clocks, and advanced attendance systems.',
        image:
          'https://readdy.ai/api/search-image?query=customer%20browsing%20luxury%20watch%20collection%20in%20elegant%20showroom%2C%20premium%20timepiece%20displays%2C%20sophisticated%20shopping%20experience%2C%20modern%20retail%20environment&width=600&height=400&seq=step1&orientation=landscape',
        // @ts-ignore if order column missing
        order: 1,
      },
      {
        icon: 'ri-user-line',
        title: 'Expert Consultation',
        description:
          'Get personalized recommendations from our Swiss timepiece specialists and attendance solution experts.',
        image:
          'https://readdy.ai/api/search-image?query=professional%20watch%20expert%20consulting%20with%20customer%2C%20luxury%20timepiece%20consultation%2C%20personalized%20service%2C%20elegant%20watch%20showroom%20setting&width=600&height=400&seq=step2&orientation=landscape',
        // @ts-ignore if order column missing
        order: 2,
      },
      {
        icon: 'ri-settings-3-line',
        title: 'Custom Solutions',
        description:
          'Receive tailored timepiece selections or attendance systems designed specifically for your needs.',
        image:
          'https://readdy.ai/api/search-image?query=custom%20watch%20customization%20process%2C%20professional%20timepiece%20crafting%2C%20premium%20watch%20workshop%2C%20Swiss%20precision%20work&width=600&height=400&seq=step3&orientation=landscape',
        // @ts-ignore if order column missing
        order: 3,
      },
      {
        icon: 'ri-truck-line',
        title: 'Premium Delivery',
        description:
          'Enjoy secure delivery with professional installation for attendance systems and warranty support.',
        image:
          'https://readdy.ai/api/search-image?query=premium%20delivery%20service%20for%20luxury%20watches%2C%20professional%20packaging%2C%20secure%20timepiece%20transport%2C%20elegant%20presentation&width=600&height=400&seq=step4&orientation=landscape',
        // @ts-ignore if order column missing
        order: 4,
      },
    ],
    skipDuplicates: true,
  });
  
  // Seed page hero backgrounds
  // Upsert hero background via raw SQL
  await prisma.$executeRaw`INSERT INTO "PageHero" ("slug","backgroundImage") VALUES (${"products/luxury-watches"}, ${"https://readdy.ai/api/search-image?query=luxury%20Swiss%20watches%20collection%20in%20elegant%20jewelry%20store%20display%2C%20premium%20timepieces%20with%20gold%20and%20silver%20finishes%2C%20sophisticated%20lighting%2C%20high-end%20retail%20environment%2C%20crystal%20clear%20product%20visibility&width=1920&height=1080&seq=luxury-watches-hero&orientation=landscape"}) ON CONFLICT ("slug") DO UPDATE SET "backgroundImage" = EXCLUDED."backgroundImage";`;
  
  // Seed services
  await prisma.service.createMany({
    data: [
      {
        title: 'Biometric Systems',
        description: 'Advanced fingerprint and facial recognition technology for secure attendance tracking.',
        icon: 'ri-fingerprint-line',
        features: '99.9% Accuracy,Multi-user Support,Cloud Integration,Real-time Monitoring',
        image: 'https://readdy.ai/api/search-image?query=modern%20biometric%20fingerprint%20scanner%20device%20in%20corporate%20office%2C%20professional%20attendance%20system%2C%20sleek%20black%20technology%2C%20business%20environment&width=400&height=300&seq=service1&orientation=landscape',
        price: 2499.00,
        duration: '1 year warranty',
        category: 'Biometric'
      },
      {
        title: 'Time Clock Solutions',
        description: 'Traditional and smart time clocks designed for various workplace environments.',
        icon: 'ri-time-line',
        features: 'Easy Integration,Real-time Tracking,Mobile Access,Multi-location Support',
        image: 'https://readdy.ai/api/search-image?query=digital%20time%20clock%20system%20mounted%20on%20office%20wall%2C%20modern%20workplace%20attendance%20device%2C%20professional%20corporate%20environment%2C%20clean%20design&width=400&height=300&seq=service2&orientation=landscape',
        price: 899.00,
        duration: '2 years warranty',
        category: 'Time Clock'
      },
      {
        title: 'Access Control',
        description: 'Comprehensive security solutions combining time tracking with building access management.',
        icon: 'ri-lock-line',
        features: 'Multi-level Security,Card & Mobile Access,Visitor Management,Integration Ready',
        image: 'https://readdy.ai/api/search-image?query=modern%20office%20access%20control%20system%20with%20card%20reader%2C%20corporate%20security%20entrance%2C%20professional%20building%20access%2C%20sleek%20design&width=400&height=300&seq=service3&orientation=landscape',
        price: 1899.00,
        duration: '3 years warranty',
        category: 'Access Control'
      },
      {
        title: 'Reporting & Analytics',
        description: 'Comprehensive reporting tools and analytics dashboards for workforce insights.',
        icon: 'ri-bar-chart-line',
        features: 'Custom Reports,Real-time Analytics,Export Options,Advanced Dashboards',
        image: 'https://readdy.ai/api/search-image?query=business%20analytics%20dashboard%20on%20computer%20screen%20showing%20attendance%20data%2C%20professional%20office%20environment%2C%20modern%20workplace%20reporting%20system&width=400&height=300&seq=service4&orientation=landscape',
        price: 599.00,
        duration: '1 year subscription',
        category: 'Analytics'
      },
      
      
    ],
    skipDuplicates: true,
  });

  //Attendance Solutions with proper array format
  await prisma.attendanceSolution.createMany({
  data: [
    {
      title: 'Small Business',
      description: 'Perfect for teams of 5-50 employees',
      icon: 'ri-building-2-line',
      features: 'Basic time tracking, Simple reporting, Mobile app access, Cloud storage, Email support',
      pricing: 'Starting from ₹99/month',
      image:
        'https://readdy.ai/api/search-image?query=small%20business%20office%20with%20modern%20attendance%20system%2C%20compact%20workspace%2C%20professional%20team%20environment%2C%20simple%20time%20tracking%20setup&width=600&height=400&seq=solution1&orientation=landscape'
      
    },
    {
      title: 'Enterprise',
      description: 'Comprehensive solution for large organizations',
      icon: 'ri-building-line',
      features: 'Advanced biometric systems, Multi-location support, Custom integrations, Advanced analytics, 24/7 premium support',
      pricing: 'Starting from ₹499/month',
      image:
        'https://readdy.ai/api/search-image?query=large%20corporate%20office%20with%20advanced%20biometric%20attendance%20systems%2C%20modern%20enterprise%20workplace%2C%20professional%20business%20environment&width=600&height=400&seq=solution2&orientation=landscape'
    },
    {
      title: 'Manufacturing',
      description: 'Rugged solutions for industrial environments',
      icon: 'ri-tools-line',
      features: 'Industrial-grade hardware, Shift management, Safety compliance tracking, Environmental resistance, On-site support',
      pricing: 'Starting from ₹299/month',
      image:
        'https://readdy.ai/api/search-image?query=industrial%20manufacturing%20facility%20with%20rugged%20attendance%20system%2C%20factory%20environment%2C%20workers%20using%20time%20tracking%20devices%2C%20industrial%20workplace&width=600&height=400&seq=solution3&orientation=landscape'
    }
  ],
  skipDuplicates: true
});


   // mileston history of company
   await prisma.milestone.createMany({
    data: [
        {
          year: '1985',
          title: 'The Beginning',
          description: 'Founded as a small watch repair shop in downtown Time City',
          icon: 'ri-tools-line'
        },
        {
          year: '1995',
          title: 'First Showroom',
          description: 'Opened our first luxury timepiece showroom',
          icon: 'ri-store-2-line'
        },
        {
          year: '2005',
          title: 'Digital Innovation',
          description: 'Launched our first digital attendance system',
          icon: 'ri-computer-line'
        },
        {
          year: '2015',
          title: 'Smart Solutions',
          description: 'Introduced biometric and cloud-based systems',
          icon: 'ri-fingerprint-line'
        },
        {
          year: '2024',
          title: 'AI Integration',
          description: 'Leading the future with AI-powered time management',
          icon: 'ri-robot-line'
        }
     
    ],
    skipDuplicates: true,
  });

  // Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Sarah Mitchell',
        position: 'CEO, TechCorp Solutions',
        company: 'TechCorp Solutions',
        testimonial:
          'TimeZone transformed our office attendance system completely. The biometric devices are incredibly accurate and the reporting dashboard gives us insights we never had before.',
        image:
          'https://readdy.ai/api/search-image?query=professional%20businesswoman%20CEO%20Sarah%20Mitchell%20in%20modern%20office%2C%20confident%20smile%2C%20business%20attire%2C%20corporate%20executive%20portrait%2C%20clean%20professional%20background&width=400&height=400&seq=testimonial1&orientation=squarish',
        rating: 5
      },
      {
        name: 'James Rodriguez',
        position: 'Operations Manager',
        company: 'Global Manufacturing Inc.',
        testimonial:
          'The luxury timepieces we purchased for our executive offices are stunning. The craftsmanship is exceptional and they make a perfect impression on our clients.',
        image:
          'https://readdy.ai/api/search-image?query=professional%20businessman%20James%20Rodriguez%20operations%20manager%20in%20manufacturing%20facility%2C%20confident%20professional%2C%20business%20suit%2C%20industrial%20office%20setting&width=400&height=400&seq=testimonial2&orientation=squarish',
        rating: 5
      },
      {
        name: 'Emily Chen',
        position: 'HR Director',
        company: 'Creative Studios',
        testimonial:
          'Outstanding customer service from consultation to installation. The team understood our unique requirements and delivered a perfect time management solution.',
        image:
          'https://readdy.ai/api/search-image?query=professional%20Asian%20businesswoman%20Emily%20Chen%20HR%20director%20in%20creative%20modern%20office%2C%20warm%20smile%2C%20professional%20attire%2C%20creative%20workspace%20background&width=400&height=400&seq=testimonial3&orientation=squarish',
        rating: 5
      }
    ],
    skipDuplicates: true,
  });

  // Team Members
  await prisma.teamMember.createMany({
    data: [
      {
        name: "Michael Harrison",
        position: "Founder & CEO",
        experience: "39 years in horology",
        image: "https://readdy.ai/api/search-image?query=distinguished%20CEO%20Michael%20Harrison%20in%20elegant%20business%20suit%2C%20confident%20executive%20portrait%2C%20professional%20lighting%2C%20modern%20office%20setting%2C%20mature%20businessman%20with%20gray%20hair&width=400&height=500&seq=team1&orientation=portrait",
        bio: "Started TimeZone from a passion for precision timepieces and has led the company through decades of innovation.",
        linkedin: "https://linkedin.com/in/michaelharrison",
        email: "michael@timezone.com",
      },
      {
        name: "Sarah Chen",
        position: "Head of Technology",
        experience: "15 years in tech innovation",
        image: "https://readdy.ai/api/search-image?query=professional%20Asian%20woman%20Sarah%20Chen%20technology%20director%20in%20modern%20office%2C%20confident%20smile%2C%20business%20attire%2C%20tech%20executive%20portrait%2C%20contemporary%20workspace%20background&width=400&height=500&seq=team2&orientation=portrait",
        bio: "Leads our digital transformation initiatives and development of smart attendance solutions.",
        linkedin: "https://linkedin.com/in/sarahchen",
        email: "sarah@timezone.com",
      },
      {
        name: "David Rodriguez",
        position: "Master Watchmaker",
        experience: "25 years of craftsmanship",
        image: "https://readdy.ai/api/search-image?query=skilled%20master%20watchmaker%20David%20Rodriguez%20working%20with%20precision%20tools%2C%20professional%20craftsman%20in%20workshop%2C%20focused%20on%20timepiece%20repair%2C%20traditional%20horologist%20at%20work&width=400&height=500&seq=team3&orientation=portrait",
        bio: "Our master craftsman ensuring every timepiece meets the highest standards of Swiss precision.",
        linkedin: "https://linkedin.com/in/davidrodriguez",
        email: "david@timezone.com",
      },
      {
        name: "Lisa Thompson",
        position: "Customer Experience Director",
        experience: "12 years in luxury retail",
        image: "https://readdy.ai/api/search-image?query=professional%20businesswoman%20Lisa%20Thompson%20customer%20service%20director%2C%20warm%20smile%2C%20elegant%20business%20attire%2C%20luxury%20retail%20environment%2C%20professional%20portrait&width=400&height=500&seq=team4&orientation=portrait",
        bio: "Dedicated to ensuring every client receives exceptional service and support throughout their journey.",
        linkedin: "https://linkedin.com/in/lisathompson",
        email: "lisa@timezone.com",
      },
    ],
    skipDuplicates: true,
  });

  // Watch Testimonials
  await prisma.watchTestimonial.createMany({
    data: [
      {
        name: 'Alexander Hamilton',
        position: 'CEO, Investment Bank',
        testimonial:
          'The Royal Swiss Heritage is absolutely stunning. The craftsmanship is impeccable and it has become my signature timepiece for important meetings.',
        image:
          'https://readdy.ai/api/search-image?query=professional%20businessman%20CEO%20Alexander%20Hamilton%20in%20luxury%20office%2C%20confident%20executive%20in%20expensive%20suit%2C%20sophisticated%20business%20portrait&width=400&height=400&seq=watch-testimonial1&orientation=squarish',
        rating: 5,
        watch: 'Royal Swiss Heritage',
      },
      {
        name: 'Victoria Sterling',
        position: 'Fashion Designer',
        testimonial:
          "The Diamond Elite Collection exceeded all my expectations. It's not just a watch, it's a piece of art that complements my style perfectly.",
        image:
          'https://readdy.ai/api/search-image?query=elegant%20fashion%20designer%20Victoria%20Sterling%20in%20stylish%20boutique%2C%20creative%20professional%20with%20artistic%20flair%2C%20sophisticated%20portrait&width=400&height=400&seq=watch-testimonial2&orientation=squarish',
        rating: 5,
        watch: 'Diamond Elite Collection',
      },
      {
        name: 'Marcus Rodriguez',
        position: 'Professional Athlete',
        testimonial:
          'The Sports Titanium Pro is perfect for my active lifestyle. Lightweight, durable, and incredibly accurate. Highly recommended for athletes.',
        image:
          'https://readdy.ai/api/search-image?query=professional%20athlete%20Marcus%20Rodriguez%20in%20sports%20facility%2C%20athletic%20build%2C%20confident%20sports%20professional%20portrait&width=400&height=400&seq=watch-testimonial3&orientation=squarish',
        rating: 5,
        watch: 'Sports Titanium Pro',
      },
    ],
    skipDuplicates: true,
  });


  console.log('🎉 Database seeded successfully!');
  console.log('📊 Created:');
  console.log('   - Categories: 3');
  console.log('   - Products: Multiple watches, clocks, and smart devices');
  console.log('   - Services: 6');
  console.log('   - Attendance Solutions: 6');
  console.log('   - How It Works Steps: 4');
  console.log('   - milestone: 5');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());