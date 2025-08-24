import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles, Star, MapPin, Phone, Mail, Clock, Menu, X, CheckCircle, Instagram, Facebook } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/logo.png";
import footerPath from "@assets/footer.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { NO_IMAGE } from "@/lib/constants";
import type { HomeContent } from "@shared/schema";

// Helper function to convert Google Drive URLs to direct image URLs
const convertGoogleDriveUrl = (url: string | null | undefined): string => {
  if (!url) return NO_IMAGE;
  
  // If it's already a direct Google Drive URL, return as is
  if (url.includes('drive.google.com/uc')) {
    return url;
  }

  // Extract the file ID from the sharing URL
  const match = url.match(/\/d\/(.*?)\/view/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }

  return url;
};

// Helper function to get image URL (proxy for Google Drive)
const getImageUrl = (url: string | null | undefined): string => {
  if (!url) return NO_IMAGE;
  
  const convertedUrl = convertGoogleDriveUrl(url);
  
  // If it's a Google Drive URL, use our proxy
  if (convertedUrl.includes('drive.google.com')) {
    return `/api/proxy-image?url=${encodeURIComponent(convertedUrl)}`;
  } else {
    // For other URLs, use directly
    return convertedUrl;
  }
};

export const Box = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<'services' | 'pricing'>('services');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [homeContent, setHomeContent] = useState<HomeContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHomePage, setIsHomePage] = useState(true);
  const { currentLanguage, setCurrentLanguage } = useLanguage();

  // Translation content
    const translations = {
    de: {
      nav: {
        home: "Home",
        services: "Dienstleistungen",
        products: "Produkte",
        gallery: "Galerie",
        pricing: "Preise",
        pricelist: "Preisliste",
        contact: "Kontakt",
        bookNow: "TERMIN BUCHEN"
      },
      hero: {
        title: "MiuNa",
        subtitle: "Ein moderner Nagelstudio in Aarau",
        description: "Qualität – Prestige – Verantwortung definieren unsere Marke",
        bookAppointment: "TERMIN BUCHEN"
      },
                          about: {
         title: "Über Uns",
         description: "Willkommen bei MiuNa – Ihr Nagelziel im Herzen von Aarau!\n\nGelegen im pulsierenden Stadtzentrum von Aarau, an der Tellistrasse 67, bietet unser Nagelstudio die perfekte Kombination aus Komfort, Behaglichkeit und Qualität. Ob Sie eine schnelle Maniküre, eine entspannende Pediküre oder ein einzigartiges Nageldesign suchen – unser professionelles und freundliches Team steht Ihnen zur Verfügung.\n\nHaben Sie Schwierigkeiten bei der Entscheidung? Keine Sorge – unser erfahrenes Team berät Sie gerne!\n\nIn einer modernen, sauberen Umgebung mit Augenmerk auf Details und Hygiene sorgen wir dafür, dass Sie nicht nur schöne Nägel bekommen, sondern auch eine entspannende und angenehme Erfahrung erleben.\n\nKommen Sie vorbei und lassen Sie Ihre Nägel glänzen!",
         address: "Adresse",
         addressValue: "Tellistrasse 67, 5004 Aarau",
         hotline: "Telefon",
         hotlineValue: "+41 76 482 89 08",
         openingHours: "Öffnungszeiten",
         openingHoursValue: "Montag - Freitag: 9:00-19:00\nSamstag: 8:00-18:00",
         contactUs: "KONTAKT AUFNEHMEN"
       },
      safety: {
        title: "Sie Sind In\nGuten Händen",
        description1: "Unsere diplomierten Nageltechniker verwenden nur die höchste Qualität, sterilisierte Werkzeuge und hochwertige Produkte. Wir halten die strengsten Hygienestandards ein, um Ihre Sicherheit und Ihr Wohlbefinden zu gewährleisten.",
        description2: "Von unserem krankenhausgerechten Sterilisationsprozess bis zu unseren umweltfreundlichen Nagellacken wird jedes Detail sorgfältig für Ihre Gesundheit und die Umwelt abgewogen.",
        licensed: "Diplomiert & Zertifiziert",
        licensedDesc: "Alle unsere Techniker sind professionell ausgebildet und zertifiziert",
        experience: ""
      },
      lookbook: {
        title: "Schauen Sie Sich Unser Lookbook An",
        subtitle: "Entdecken Sie die neuesten Nagelkunst-Trends und klassische Eleganz in unserer kuratierten Sammlung wunderschöner Nageldesigns.",
        artistic: "Titel",
        artisticDesc: "Untertitel",
        classic: "Titel",
        classicDesc: "Untertitel",
        seasonal: "Titel",
        seasonalDesc: "Untertitel",
        viewGallery: "VOLLSTÄNDIGE GALERIE ANSEHEN"
      },
              feelBetter: {
          title: "Schön Aussehen.\nBesser Fühlen.",
          description1: "Bei MiuNa glauben wir, dass schöne Nägel mehr sind als nur eine ästhetische Wahl – es ist ein Ausdruck der Selbstfürsorge und des Vertrauens.",
          description2: "Unsere Behandlungen sind so konzipiert, dass sie nicht nur Ihr Aussehen verbessern, sondern auch einen Moment der Entspannung und Verjüngung in Ihrem hektischen Leben bieten.",
          bookNow: "JETZT BUCHEN"
        },
              servicesSection: {
          title: "Dienstleistungen & Preise",
          ourServices: "Dienstleistungen",
          pricingPackages: "Preise & Pakete",
          nailCare: "Nagelpflege",
          nailCareDesc: "Neue Modellierung Gel/Acryl, Maniküre, Nageldesign, Shellac",
          footCare: "Fußpflege",
          footCareDesc: "Füße reinigen, peelen, Zehennägel lackieren, entspannende Behandlungen",
          eyelashExtensions: "Acrylic/Gel",
          eyelashDesc: "",
          waxing: "BIAB",
          waxingDesc: "",
          newAcryl: "Gellack Füße",
          newAcrylDesc: "----",
          fillAcryl: "Gellack Hände",
          fillAcrylDesc: "----",
          ombreFrench: "Gellack French",
          ombreFrenchDesc: "----",
          pedicureShellac: "Gellack entfernen",
          pedicureShellacDesc: "----",
          manicureShellac: "Gellack entfernen + neu",
          manicureShellacDesc: "----",
          specialPackage: "Spezialpaket-Deal",
          specialDesc: "Erhalten Sie eine vollständige Maniküre + Pediküre Kombination zum besten Preis!",
          bookSave: "Jetzt Buchen & Sparen €"
        },
      gallery: {
        title: "Unsere Galerie",
        creative: "Titel",
        elegant: "Titel",
        modern: "Titel",
        vibrant: "Titel"
      },
      products: {
        title: "Ausgewählte Produkte",
        nailPolish: "Titel",
        nailPolishDesc: "Untertitel",
        careTools: "Titel",
        careToolsDesc: "Untertitel",
        gelPolish: "Titel",
        gelPolishDesc: "Untertitel",
        artSupplies: "Titel",
        artSuppliesDesc: "Untertitel",
        booking: "JETZT BUCHEN"
      },
      styledBy: {
        title: "Von Uns Gestylt, Von Ihnen Getragen",
        subtitle: "Echte Kunden, echte Ergebnisse",
        tagUs: "Markieren Sie uns @miuna, um vorgestellt zu werden!",
        followUs: "FOLGEN SIE UNS",
        instagram: "Folgen Sie uns auf Instagram",
        facebook: "Folgen Sie uns auf Facebook"
      },
      testimonials: {
        title: "Kundenfeedback",
        testimonial1: "Fantastischer Service und wunderschöne Nägel! Ich war noch nie so glücklich mit den Ergebnissen.",
        testimonial2: "Die Atmosphäre ist so beruhigend, und das Personal ist absolut professionell. Sehr empfehlenswert!",
        testimonial3: "Eine perfekte Erfahrung! Meine Nägel sehen makellos aus, und das Personal war so einladend.",
        testimonial4: "Jedes Detail war perfekt. Die Qualität des Services hier ist unübertroffen. Ich komme wieder!",
        testimonial5: "Dieser Ort ist fantastisch! Meine Nägel haben noch nie so gut ausgesehen, und das Team ist so freundlich.",
        testimonial6: "So eine wunderbare Erfahrung jedes Mal, wenn ich hierher komme. Große Ergebnisse und fantastischer Service!"
      },
              footer: {
          title: "MiuNa",
          description: "Premium Nagelstudio in Aarau, das außergewöhnliche Schönheitsdienstleistungen mit Qualität und Prestige bietet.",
                   contact: "Kontakt",
           openingHours: "Öffnungszeiten",
           monday: "Montag - Freitag: 9:00-19:00 ",
           saturday: "Samstag: 8:00-18:00",
           sunday: "Sonntag: Geschlossen",
           copyright: "© 2024 MiuNa Nails & Beauty Aarau. Alle Rechte vorbehalten."
        }
    },
    en: {
                   nav: {
        home: "Home",
        services: "Services",
        products: "Products",
        gallery: "Gallery",
        pricing: "Pricing",
        pricelist: "Price List",
        contact: "Contact",
        bookNow: "BOOK NOW"
      },
      hero: {
        title: "Chic & Elegant",
        subtitle: "A modern nail salon in Leeuwarden",
        description: "Quality - Prestige - Responsibility define our brand",
        bookAppointment: "BOOK APPOINTMENT"
      },
             about: {
         title: "About Us",
         description: "Welcome to MiuNa – Your Nail Destination in the Heart of Aarau!\n\nLocated in the vibrant city center of Aarau, at Tellistrasse 67, our nail salon offers the perfect combination of convenience, comfort, and quality. Whether you're looking for a quick manicure, a relaxing pedicure, or a custom nail design – our professional and friendly team is here for you.\n\nHaving trouble making up your mind? No worries – our experienced team will be happy to advise you!\n\nWith a clean, modern space and strong attention to detail and hygiene, we're committed to giving you not only beautiful nails but also a relaxing and enjoyable experience.\n\nCome visit us and let your nails shine!",
                 address: "Address",
        addressValue: "Tellistrasse 67, 5004 Aarau",
        hotline: "Hotline",
        hotlineValue: "+41 76 482 89 08",
        openingHours: "Opening Hours",
        openingHoursValue: "Monday - Friday: 9:00-19:00\nSaturday: 8:00-18:00",
         contactUs: "CONTACT US"
       },
      safety: {
        title: "You're In\nSafe Hands",
        description1: "Our licensed nail technicians use only the highest quality, sterilized tools and premium products. We maintain the strictest hygiene standards to ensure your safety and well-being.",
        description2: "From our hospital-grade sterilization process to our eco-friendly nail polishes, every detail is carefully considered for your health and the environment.",
        licensed: "Licensed & Certified",
        licensedDesc: "All our technicians are professionally trained and certified",
        experience: ""
      },
      lookbook: {
        title: "View Our Lookbook",
        subtitle: "Discover the latest nail art trends and classic elegance in our curated collection of stunning nail designs.",
        artistic: "<Title>",
        artisticDesc: "<Sub-Title>",
        classic: "<Title>",
        classicDesc: "<Sub-Title>",
        seasonal: "<Title>",
        seasonalDesc: "<Sub-Title>",
        viewGallery: "VIEW FULL GALLERY"
      },
      feelBetter: {
        title: "Look Good.\nFeel Better.",
        description1: "At MiuNa, we believe that beautiful nails are more than just an aesthetic choice – they're an expression of self-care and confidence.",
        description2: "Our treatments are designed not just to enhance your appearance, but to provide a moment of relaxation and rejuvenation in your busy life.",
        bookNow: "BOOK NOW"
      },
      servicesSection: {
        title: "Services & Pricing",
        ourServices: "Our Services",
        pricingPackages: "Pricing & Packages",
        nailCare: "Nail Care",
        nailCareDesc: "New modelling gel/acrylic, manicure, nail design, Shellac",
        footCare: "Foot Care",
        footCareDesc: "Clean feet, exfoliate, paint toenails, relaxing treatments",
        eyelashExtensions: "Acrylic/Gel",
        eyelashDesc: "Artificial nails and extensions",
        waxing: "BIAB",
        waxingDesc: "Builder In A Bottle technique",
        newAcryl: "Gel polish feet",
        newAcrylDesc: "----",
        fillAcryl: "Gel polish hands",
        fillAcrylDesc: "----",
        ombreFrench: "Gel polish French",
        ombreFrenchDesc: "----",
        pedicureShellac: "Gel polish removal",
        pedicureShellacDesc: "----",
        manicureShellac: "Gel polish removal +reapplication",
        manicureShellacDesc: "----",
        specialPackage: "Special Package Deal",
        specialDesc: "Get a full manicure + pedicure combo for the best value!",
        bookSave: "Book Now & Save €"
      },
      gallery: {
        title: "Our Gallery",
        creative: "Title",
        elegant: "Title",
        modern: "Title",
        vibrant: "Title"
      },
      products: {
        title: "Featured Products",
        nailPolish: "Title",
        nailPolishDesc: "Sub-Title",
        careTools: "Title",
        careToolsDesc: "Sub-Title",
        gelPolish: "Title",
        gelPolishDesc: "Sub-Title",
        artSupplies: "Title",
        artSuppliesDesc: "Sub-Title",
        booking: "BOOKING NOW"
      },
      styledBy: {
        title: "Styled By Us, Worn By You",
        subtitle: "Real clients, real results",
        tagUs: "Tag us @nailsofthenetherlands to be featured!",
        followUs: "FOLLOW US",
        instagram: "Follow on Instagram",
        facebook: "Follow on Facebook"
      },
      testimonials: {
        title: "Customer Feedback",
        testimonial1: "Fantastic service and beautiful nails! I've never been happier with the results.",
        testimonial2: "The ambiance is so calming, and the staff are absolute professionals. Highly recommended!",
        testimonial3: "A perfect experience! My nails look flawless, and the staff were so welcoming.",
        testimonial4: "Every detail was perfect. The quality of service here is unmatched. I'll be back!",
        testimonial5: "This place is amazing! My nails have never looked this good, and the team is so friendly.",
        testimonial6: "Such a wonderful experience every time I come here. Great results and fantastic service!"
      },
      footer: {
        title: "MiuNa",
        description: "Premium nail salon in Aarau.",
                 contact: "Contact",
         openingHours: "Opening Hours",
         monday: "Monday - Friday: 9:00-19:00",
         saturday: "Saturday: 8:00-18:00",
         sunday: "Sunday: Closed",
         copyright: "© 2024 MiuNa Nails & Beauty Aarau. All rights reserved."
      }
    }
  };

  const t = translations[currentLanguage];

  // Fetch home content from API
  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/home-content');
        if (response.ok) {
          const data = await response.json();
          setHomeContent(data);
        }
      } catch (error) {
        console.error('Failed to fetch home content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeContent();
  }, []);

  // Get content sections from API data
  const heroSection = homeContent.find(item => item.section === 'hero');
  const aboutSection = homeContent.find(item => item.section === 'about');
  const safetySection = homeContent.find(item => item.section === 'safety');
  const lookbookSection = homeContent.find(item => item.section === 'lookbook');
  const feelBetterSection = homeContent.find(item => item.section === 'feel-better');
  const servicesSection = homeContent.find(item => item.section === 'services');
  const productsSection = homeContent.find(item => item.section === 'products');
  const styledBySection = homeContent.find(item => item.section === 'styled-by');

  // Helper function to get images from section content
  const getSectionImages = (section: HomeContent | undefined, count: number): string[] => {
    if (section?.content) {
      try {
        let images;
        // Handle both string (JSON) and already-parsed array
        if (typeof section.content === 'string') {
          images = JSON.parse(section.content);
        } else if (Array.isArray(section.content)) {
          images = section.content;
        }
        
        if (Array.isArray(images)) {
          const processedImages = images.slice(0, count).map(img => {
            // Handle both string URLs and objects with image property
            const imageUrl = typeof img === 'string' ? img : (img?.image || '');
            return getImageUrl(imageUrl);
          });
          // Fill remaining slots with NO_IMAGE if needed
          while (processedImages.length < count) {
            processedImages.push(NO_IMAGE);
          }
          return processedImages;
        }
      } catch (e) {
        console.error('Failed to parse section images:', e);
      }
    }
    // Fallback to placeholder images
    return Array(count).fill(NO_IMAGE);
  };

  // Helper function to get lookbook items with titles and subtitles
  const getLookbookItems = (section: HomeContent | undefined): Array<{image: string, title: string, subtitle: string}> => {
    if (section?.content) {
      try {
        let items;
        // Handle both string (JSON) and already-parsed array
        if (typeof section.content === 'string') {
          items = JSON.parse(section.content);
        } else if (Array.isArray(section.content)) {
          items = section.content;
        }
        
        if (Array.isArray(items)) {
          return items.slice(0, 3).map(item => {
            if (typeof item === 'string') {
              // Old format - just image URL
              return {
                image: getImageUrl(item),
                title: 'Title',
                subtitle: 'Sub-Title'
              };
            } else if (typeof item === 'object') {
              // New format - object with image, title, subtitle
              return {
                image: getImageUrl(item?.image || ''),
                title: item?.title || 'Title',
                subtitle: item?.subtitle || 'Sub-Title'
              };
            }
            return {
              image: NO_IMAGE,
              title: 'Title',
              subtitle: 'Sub-Title'
            };
          });
        }
      } catch (e) {
        console.error('Failed to parse lookbook items:', e);
      }
    }
    // Fallback to placeholder items
    return Array(3).fill(null).map(() => ({
      image: NO_IMAGE,
      title: 'Title',
      subtitle: 'Sub-Title'
    }));
  };

  // Hero images - use API data if available, fallback to NO_IMAGE placeholders
  const heroImages = getSectionImages(heroSection, 5);
  
  // Lookbook items (3 items with image, title, subtitle)
  const lookbookItems = getLookbookItems(lookbookSection);
  
  
  // Products images (4 images)
  const productsImages = getSectionImages(productsSection, 4);
  
  // Styled by Us images (4 images)
  const styledByImages = getSectionImages(styledBySection, 4);
  
  // Services images (4 service icons)
  const serviceImages = getSectionImages(servicesSection, 4);

  // Auto-cycle through carousel images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);



  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'pricing') {
      setActiveTab('pricing');
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-beige-300 dark:border-gray-700 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={logoPath} 
                alt="MiuNa Logo" 
                className="h-40 w-50 object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className={`font-medium transition-colors duration-200 ${
                  isHomePage 
                    ? 'text-beige-500 dark:text-beige-400 font-semibold transition-colors duration-200 border-b-2 border-beige-500' 
                    : 'text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400'
                }`}
              >
                {t.nav.home}
              </button>
              <Link href="/pricelist">
                <button className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
                  {t.nav.pricelist}
                </button>
              </Link>
              <Link href="/gallery">
                <button className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
                  {t.nav.gallery}
                </button>
              </Link>
              <Link href="/products">
                <button className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
                  {t.nav.products}
                </button>
              </Link>
              <Link href="/contact">
                <button className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
                  {t.nav.contact}
                </button>
              </Link>
              
              <Button 
                onClick={() => window.open('https://wa.me/', '_blank')}
                className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-6 py-2 rounded-full font-semibold"
              >
                {t.nav.bookNow}
              </Button>
              
              {/* Language Flags */}
              <div className="flex items-center space-x-2">
              <button 
                  onClick={() => setCurrentLanguage('en')}
                  className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-200 hover:scale-110 ${
                    currentLanguage === 'en' ? 'border-beige-500 shadow-md' : 'border-gray-300 hover:border-beige-400'
                  }`}
                  title="English"
                >
                  <svg className="w-full h-full" viewBox="0 0 60 40" fill="none">
                    <rect width="60" height="40" fill="#012169"/>
                    <path d="M0 0L60 40M60 0L0 40" stroke="white" strokeWidth="6"/>
                    <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4"/>
                    <path d="M30 0V40M0 20H60" stroke="white" strokeWidth="12"/>
                    <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="8"/>
                  </svg>
              </button>
              <button 
                  onClick={() => setCurrentLanguage('de')}
                  className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-200 hover:scale-110 ${
                    currentLanguage === 'de' ? 'border-beige-500 shadow-md' : 'border-gray-300 hover:border-beige-400'
                  }`}
                  title="Deutsch"
                >
                  <svg className="w-full h-full" viewBox="0 0 60 40" fill="none">
                    <rect width="60" height="13.33" fill="#000000"/>
                    <rect y="13.33" width="60" height="13.33" fill="#DD0000"/>
                    <rect y="26.66" width="60" height="13.34" fill="#FFCE00"/>
                  </svg>
              </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-beige-300 dark:border-gray-700 shadow-lg">
              <div className="flex flex-col space-y-4 p-6">
                <button 
                  onClick={() => scrollToSection('home')}
                  className={`font-medium text-left transition-colors duration-200 ${
                    isHomePage 
                      ? 'text-beige-500 dark:text-beige-400 font-semibold transition-colors duration-200 border-b-2 border-beige-500' 
                      : 'text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400'
                  }`}
                >
                  {t.nav.home}
                </button>
                <Link href="/pricelist">
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium text-left transition-colors duration-200"
                  >
                    {t.nav.pricelist}
                  </button>
                </Link>
                <Link href="/gallery">
                <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium text-left transition-colors duration-200"
                >
                    {t.nav.gallery}
                </button>
                </Link>
                <Link href="/products">
                <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium text-left transition-colors duration-200"
                >
                    {t.nav.products}
                </button>
                </Link>
                <Link href="/contact">
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium text-left transition-colors duration-200"
                  >
                    {t.nav.contact}
                  </button>
                </Link>
                
                <Button 
                  onClick={() => window.open('https://wa.me/', '_blank')}
                  className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-6 py-2 rounded-full font-semibold w-full"
                >
                  {t.nav.bookNow}
                </Button>
                
                {/* Mobile Language Flags */}
                <div className="flex items-center justify-center space-x-4 pt-2">
                  <button 
                    onClick={() => setCurrentLanguage('en')}
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-200 hover:scale-110 ${
                      currentLanguage === 'en' ? 'border-beige-500 shadow-md' : 'border-gray-300 hover:border-beige-400'
                    }`}
                    title="English"
                  >
                    <svg className="w-full h-full" viewBox="0 0 60 40" fill="none">
                      <rect width="60" height="40" fill="#012169"/>
                      <path d="M0 0L60 40M60 0L0 40" stroke="white" strokeWidth="6"/>
                      <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4"/>
                      <path d="M30 0V40M0 20H60" stroke="white" strokeWidth="12"/>
                      <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="8"/>
                    </svg>
                  </button>
                  <button 
                    onClick={() => setCurrentLanguage('de')}
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-200 hover:scale-110 ${
                      currentLanguage === 'de' ? 'border-beige-500 shadow-md' : 'border-gray-300 hover:border-beige-400'
                    }`}
                    title="Deutsch"
                  >
                    <svg className="w-full h-full" viewBox="0 0 60 40" fill="none">
                      <rect width="60" height="13.33" fill="#000000"/>
                      <rect y="13.33" width="60" height="13.33" fill="#DD0000"/>
                      <rect y="26.66" width="60" height="13.34" fill="#FFCE00"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Banner Section */}
      <section id="home" className="relative min-h-[600px] h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-beige-100 via-beige-50 to-beige-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden pt-16">
        {/* Carousel Background Images */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-20' : 'opacity-0'
              }`}
            >
              <img 
                src={image}
                alt={`Luxury nail spa background ${index + 1}`} 
            className="w-full h-full object-cover"
          />
            </div>
          ))}
        </div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Heart className="absolute top-[10%] left-[5%] text-[#A5C185] w-8 h-8 animate-float opacity-40" />
          <Sparkles className="absolute top-[20%] right-[10%] text-[#87BF6F] w-6 h-6 animate-bounce-gentle opacity-50" />
          <Star className="absolute bottom-[30%] left-[10%] text-[#A5C185] w-5 h-5 animate-pulse-gentle opacity-30" />
          <Heart className="absolute bottom-[15%] right-[5%] text-[#87BF6F] w-6 h-6 animate-float animation-delay-2000 opacity-40" />
        </div>
        
        <div className="text-center z-10 w-full max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative">
              <img 
                src={logoPath} 
                alt="MiuNa Logo" 
                className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 object-contain animate-pulse-gentle rounded-full border-4 border-[#A5C185] p-3 sm:p-4 md:p-5 bg-white shadow-2xl"
              />
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#A5C185] animate-bounce-gentle" />
              </div>
            </div>
          </div>
          
                      <h1 className="text-4xl sm:text-5xl md:text-6xl font-ephesis font-bold text-white mb-4 sm:mb-5 animate-fade-in-up drop-shadow-2xl">
              {t.hero.title}
            </h1>
          
          <p className="text-xl sm:text-2xl text-white font-medium mb-4 sm:mb-6 animate-fade-in-up animation-delay-200 drop-shadow-lg">
            {t.hero.subtitle}
          </p>
          
          <p className="text-base sm:text-lg text-white mb-6 sm:mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-400 drop-shadow-lg">
            {t.hero.description}
          </p>
          
          <Button 
            onClick={() => window.open('https://wa.me/', '_blank')}
            size="lg" 
            className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-6 sm:px-8 md:px-10 py-2 sm:py-3 text-base sm:text-lg rounded-full animate-fade-in-up animation-delay-400"
          >
            {t.hero.bookAppointment}
          </Button>
        </div>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-2 sm:space-x-3">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-[#A5C185] scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="contact" className="py-12 md:py-20 relative overflow-hidden min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/background-1.png" 
            alt="About section background" 
            className="w-54 h-64 md:w-1/2 md:h-full object-cover absolute left-1/2 top-1/3 md:top-0 md:left-2/3 transform -translate-x-1/2 -translate-y-1/2 md:transform-none rounded-lg md:rounded-none"
            onError={(e) => {
              console.error('Failed to load background image:', e);
              // Fallback to gradient if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Fallback gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-beige-50 via-beige-100 to-beige-200 dark:from-gray-800 dark:to-gray-700"></div>
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80"></div>
        </div>
        


        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
                          <h2 className="text-5xl font-ephesis font-bold text-miuna-600 mb-8">
              {t.about.title}
            </h2>
              <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-8 leading-relaxed">
                {t.about.description}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#A5C185] rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">{t.about.address}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">{t.about.addressValue}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#A5C185] rounded-full flex items-center justify-center shadow-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">{t.about.hotline}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">{t.about.hotlineValue}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#A5C185] rounded-full flex items-center justify-center shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 dark:text-neutral-200">{t.about.openingHours}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">{t.about.openingHoursValue}</p>
                  </div>
                </div>
              </div>
              
                            <Button 
                onClick={() => window.open('https://wa.me/', '_blank')}
                className="mt-8 mb-8 md:mb-0 bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                {t.about.contactUs}
              </Button>
            </div>
            
            <div className="relative animate-fade-in-up animation-delay-200 mt-8 md:mt-0">
                <div className="w-full h-64 md:h-96 bg-gradient-to-br from-beige-200 to-beige-300 rounded-3xl shadow-2xl overflow-hidden">
                <img 
                  src={getImageUrl(aboutSection?.image)} 
                  alt="Elegant spa room with modern décor and relaxing ambiance" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Elegant overlay with spa room details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
                  {aboutSection?.title || "Image Title"}
                </h3>
                <p className="text-beige-100 drop-shadow-md">
                  {aboutSection?.subtitle || "Image Subtitle"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* You're in Safe Hands Section */}
      <section className="py-20 bg-[#F0F7ED]/60 dark:bg-gray-900/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src={getImageUrl(safetySection?.image)}
                alt="Professional nail technician at work" 
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-beige-500 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold">{safetySection?.title || ""}</div>
                <div className="text-sm uppercase tracking-wide">{safetySection?.subtitle || t.safety.experience}</div>
              </div>
            </div>
            
            <div>
              <h2 className="text-5xl font-ephesis font-bold text-miuna-600 mb-6 leading-tight">
                {t.safety.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {t.safety.description1}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {t.safety.description2}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-beige-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-beige-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-beige-800 dark:text-beige-200 text-lg">{t.safety.licensed}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{t.safety.licensedDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook Section */}
      <section className="py-20 bg-gradient-to-r from-beige-50 to-beige-100 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-ephesis font-bold text-miuna-600 mb-6">{t.lookbook.title}</h2>
            <p className="text-xl text-beige-600 dark:text-beige-300 max-w-3xl mx-auto">
              {t.lookbook.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {lookbookItems.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                <img 
                  src={item.image}
                  alt={`Lookbook ${index + 1}: ${item.title}`} 
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-beige-100">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-beige-500 hover:bg-beige-600 text-white px-12 py-4 rounded-full text-lg font-semibold">
              {t.lookbook.viewGallery}
            </Button>
          </div>
        </div>
      </section>

      {/* Look Good Feel Better Section */}
      <section className="py-20 bg-[#F5F2EF]/60 dark:bg-gray-900/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-ephesis font-bold text-miuna-600 mb-6 leading-tight">
                {t.feelBetter.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {t.feelBetter.description1}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {t.feelBetter.description2}
              </p>
              <Button className="bg-beige-500 hover:bg-beige-600 text-white px-8 py-3 rounded-full font-semibold">
                {t.feelBetter.bookNow}
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src={getImageUrl(feelBetterSection?.image)}
                alt="Relaxing salon interior" 
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-6 -left-6 bg-beige-500 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold">{feelBetterSection?.title || ""}</div>
                <div className="text-sm uppercase tracking-wide">{feelBetterSection?.subtitle || ""}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Pricing Section with Tabs */}
      <section id="services" className="py-20 bg-gradient-to-tr from-beige-50 via-beige-100 to-beige-200 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8A876' fill-opacity='0.3'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Floating Service Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-12 w-16 h-16 bg-[#D4E4C4] rounded-full flex items-center justify-center animate-float opacity-20">
            <Heart className="w-8 h-8 text-[#A5C185]" />
          </div>
          <div className="absolute top-32 right-16 w-12 h-12 bg-[#C3DFB7] rounded-full flex items-center justify-center animate-bounce-gentle opacity-25">
            <Sparkles className="w-6 h-6 text-[#A5C185]" />
          </div>
          <div className="absolute bottom-40 left-20 w-14 h-14 bg-[#D4E4C4] rounded-full flex items-center justify-center animate-pulse-gentle opacity-20">
            <Star className="w-7 h-7 text-[#A5C185]" />
          </div>
          <div className="absolute bottom-20 right-24 w-18 h-18 bg-[#C3DFB7] rounded-full flex items-center justify-center animate-float animation-delay-2000 opacity-15">
            <Heart className="w-9 h-9 text-[#A5C185]" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
                      <h2 className="text-5xl font-ephesis font-bold text-miuna-600 text-center mb-16">{t.servicesSection.title}</h2>
          
          <div className="w-full">
            <div className="flex justify-center mb-12">
              <div className="grid w-full max-w-md grid-cols-2 h-14 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg">
                <button 
                  onClick={() => setActiveTab('services')}
                  className={`rounded-full text-lg font-semibold transition-all duration-300 ${
                    activeTab === 'services' 
                      ? 'bg-beige-500 text-miuna-600' 
                      : 'text-gray-800 dark:text-gray-100 hover:text-beige-500 bg-white dark:bg-gray-800 border-2 border-gray-600 dark:border-gray-600 px-4'
                  }`}
                >
                  {t.servicesSection.ourServices}
                </button>
                <button 
                  onClick={() => setActiveTab('pricing')}
                  className={`rounded-full text-lg font-semibold transition-all duration-300 ${
                    activeTab === 'pricing' 
                      ? 'bg-beige-500 text-miuna-600' 
                      : 'text-gray-800 dark:text-gray-100 hover:text-beige-500 bg-white dark:bg-gray-800 border-2 border-gray-600 dark:border-gray-600 px-4'
                  }`}
                >
                  {t.servicesSection.pricingPackages}
                </button>
              </div>
            </div>

            <div id="pricing"></div>

            {activeTab === 'services' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Nail Care */}
            <Card className="bg-gradient-to-br from-beige-50 to-beige-100 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center p-6 group overflow-hidden">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-beige-100 to-beige-200 rounded-full flex items-center justify-center group-hover:animate-bounce-gentle overflow-hidden">
                  <img 
                    src={serviceImages[0]} 
                    alt="Nail care" 
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                {t.servicesSection.nailCare}
              </CardTitle>
              <CardDescription className="text-neutral-600 dark:text-neutral-300 mb-4">
                {t.servicesSection.nailCareDesc}
              </CardDescription>
            </Card>

            {/* Foot Care */}
            <Card className="bg-gradient-to-br from-miuna-50 to-miuna-100 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center p-6 group overflow-hidden">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-200 rounded-full flex items-center justify-center group-hover:animate-bounce-gentle overflow-hidden">
                  <img 
                    src={serviceImages[1]} 
                    alt="Foot care spa" 
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                {t.servicesSection.footCare}
              </CardTitle>
              <CardDescription className="text-neutral-600 dark:text-neutral-300 mb-4">
                {t.servicesSection.footCareDesc}
              </CardDescription>
            </Card>

            {/* Eyelash Extensions */}
            <Card className="bg-gradient-to-br from-beige-50 to-beige-100 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center p-6 group overflow-hidden">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-beige-500 rounded-full flex items-center justify-center group-hover:animate-bounce-gentle overflow-hidden">
                  <img 
                    src={serviceImages[2]} 
                    alt="Eyelash extensions" 
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                {t.servicesSection.eyelashExtensions}
              </CardTitle>
              <CardDescription className="text-neutral-600 dark:text-neutral-300 mb-4">
                {t.servicesSection.eyelashDesc}
              </CardDescription>
            </Card>

            {/* Waxing */}
            <Card className="bg-gradient-to-br from-miuna-50 to-miuna-100 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center p-6 group overflow-hidden">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-miuna-500 rounded-full flex items-center justify-center group-hover:animate-bounce-gentle overflow-hidden">
                  <img 
                    src={serviceImages[3]} 
                    alt="Waxing services" 
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                {t.servicesSection.waxing}
              </CardTitle>
              <CardDescription className="text-neutral-600 dark:text-neutral-300 mb-4">
                {t.servicesSection.waxingDesc}
              </CardDescription>
            </Card>
              </div>
            </div>

            )}

            {activeTab === 'pricing' && (
            <div className="space-y-8">
              {/* Menu Boxes - Top Row */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {/* Hand Care Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-dashed border-miuna-300">
                  <h3 className="text-2xl font-ephesis text-miuna-600 mb-4 text-center">Handpflege (Hand Care)</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-dashed border-miuna-200">
                      <span className="text-gray-700 dark:text-gray-300">Maniküre</span>
                      <span className="font-semibold text-miuna-600">30.-</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-dashed border-miuna-200">
                      <span className="text-gray-700 dark:text-gray-300">Maniküre mit Shellac</span>
                      <span className="font-semibold text-miuna-600">65.-</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-700 dark:text-gray-300">Maniküre mit Nagellack</span>
                      <span className="font-semibold text-miuna-600">55.-</span>
                    </div>
                  </div>
                </div>

                {/* Foot Care Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-dashed border-miuna-300">
                  <h3 className="text-2xl font-ephesis text-miuna-600 mb-4 text-center">Fussflege (Foot Care)</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-dashed border-miuna-200">
                      <span className="text-gray-700 dark:text-gray-300">Pediküre</span>
                      <span className="font-semibold text-miuna-600">60.-</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-dashed border-miuna-200">
                      <span className="text-gray-700 dark:text-gray-300">Pediküre mit Shellac</span>
                      <span className="font-semibold text-miuna-600">90.-</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-dashed border-miuna-200">
                      <span className="text-gray-700 dark:text-gray-300">Pediküre mit Nagellack</span>
                      <span className="font-semibold text-miuna-600">85.-</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-700 dark:text-gray-300">Pediküre mit Verlängerung</span>
                      <span className="font-semibold text-miuna-600">130.-</span>
                    </div>
                  </div>
                </div>

                {/* Nail Modeling Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-dashed border-miuna-300">
                  <h3 className="text-2xl font-ephesis text-miuna-600 mb-4 text-center">Nagelmodellage mit Acryl/Gel</h3>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-miuna-500 mb-2">ohne Verlängerung:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Mit Acryl/Gel Natur</span>
                        <span className="font-semibold text-miuna-600">65.-</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Mit Acryl/Gel Make-up</span>
                        <span className="font-semibold text-miuna-600">70.-</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Mit French/Babyboomer</span>
                        <span className="font-semibold text-miuna-600">80.-</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Mit Farbe</span>
                        <span className="font-semibold text-miuna-600">75.-</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-miuna-500 mb-2">mit Verlängerung:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Neuanlage Natur</span>
                        <span className="font-semibold text-miuna-600">75.-</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Auffüllen Natur</span>
                        <span className="font-semibold text-miuna-600">65.-</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Neuanlage Make-up</span>
                        <span className="font-semibold text-miuna-600">80.-</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Auffüllen Make-up</span>
                        <span className="font-semibold text-miuna-600">70.-</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Neuanlage French/Babyboomer</span>
                        <span className="font-semibold text-miuna-600">95.-</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Auffüllen French/Babyboomer</span>
                        <span className="font-semibold text-miuna-600">85.-</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Neuanlage mit Farbe</span>
                        <span className="font-semibold text-miuna-600">90.-</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Auffüllen mit Farbe</span>
                        <span className="font-semibold text-miuna-600">80.-</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Ablösen bei Neuanlage</span>
                        <span className="font-semibold text-miuna-600">+20.-</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extra Services Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-dashed border-miuna-300">
                  <h3 className="text-2xl font-ephesis text-miuna-600 mb-4 text-center">Extra</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Nur Farbe</span>
                      <span className="font-semibold text-miuna-600">40.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Farbwechsel</span>
                      <span className="font-semibold text-miuna-600">45.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Ablösen Acryl/Gel</span>
                      <span className="font-semibold text-miuna-600">30.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Ablösen Shellac</span>
                      <span className="font-semibold text-miuna-600">20.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Farbverlauf mit Pulver</span>
                      <span className="font-semibold text-miuna-600">+15.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Airbrush</span>
                      <span className="font-semibold text-miuna-600">2.- pro Nagel</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">3D-Muster ab 5.- pro Nagel</span>
                      <span className="font-semibold text-miuna-600">3.- pro Nagel</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Zusätzliche Farbe (mehr als 2 Farben, pro Set)</span>
                      <span className="font-semibold text-miuna-600">5.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Verlängerung von bestehenden Nägeln</span>
                      <span className="font-semibold text-miuna-600">3.- pro Nagel</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Nagelformänderung</span>
                      <span className="font-semibold text-miuna-600">ab 5.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Lange Nägel, pro cm, pro Set</span>
                      <span className="font-semibold text-miuna-600">10.-</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 italic text-center mt-2">
                      *(1,5 cm ab Fingerspitze ist inklusive bei Modellen mit Verlängerung)*
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Strasssteinen</span>
                      <span className="font-semibold text-miuna-600">0.50.- pro Stück</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Sticker</span>
                      <span className="font-semibold text-miuna-600">1.- pro Stück</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Glitzer</span>
                      <span className="font-semibold text-miuna-600">2.- pro Nagel</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Handdesign (abhängig vom Motiv)</span>
                      <span className="font-semibold text-miuna-600">ab 2.- pro Nagel</span>
                    </div>
                  </div>
                </div>

                {/* Eyelash Extensions Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-dashed border-miuna-300">
                  <h3 className="text-2xl font-ephesis text-miuna-600 mb-4 text-center">Wimpernverlängerung (Eyelash Extensions)</h3>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-miuna-500 mb-2">Classic 1:1 Technik:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Neusets</span>
                        <span className="font-semibold text-miuna-600">110.-</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Auffüllen nach 3 Wochen</span>
                        <span className="font-semibold text-miuna-600">80.-</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Auffüllen nach 2 Wochen</span>
                        <span className="font-semibold text-miuna-600">60.-</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-miuna-500 mb-2">Volumen:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Neusets</span>
                        <span className="font-semibold text-miuna-600">155.-</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Auffüllen nach 3 Wochen</span>
                        <span className="font-semibold text-miuna-600">95.-</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Auffüllen nach 2 Wochen</span>
                        <span className="font-semibold text-miuna-600">75.-</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-700 dark:text-gray-300">Wimpernverlängerung entfernen</span>
                        <span className="font-semibold text-miuna-600">ab 25.-</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400 italic text-center mt-2">
                    *Hinweis: Nach 4 Wochen wird der Preis für ein Neuset berechnet.*
                  </div>
                </div>

                {/* Eyebrows & Eyelashes Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-dashed border-miuna-300">
                  <h3 className="text-2xl font-ephesis text-miuna-600 mb-4 text-center">Augenbrauen & Wimpern (Eyebrows & Eyelashes)</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Augenbrauen färben und zupfen</span>
                      <span className="font-semibold text-miuna-600">50.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Augenbrauen zupfen</span>
                      <span className="font-semibold text-miuna-600">25.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Augenbrauen färben</span>
                      <span className="font-semibold text-miuna-600">30.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Wimpern Lifting</span>
                      <span className="font-semibold text-miuna-600">80.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">Wimpern färben</span>
                      <span className="font-semibold text-miuna-600">30.-</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Package Box - Centered Below Menu Boxes */}
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-miuna-500 to-miuna-600 text-white rounded-lg shadow-lg p-8 border-2 border-dashed border-miuna-400 max-w-md">
                  <div className="text-center">
                    <h3 className="text-2xl font-ephesis mb-4">Special Package</h3>
                    <p className="mb-4">Exclusive offers coming soon</p>
                    <div className="text-3xl font-bold mb-4">Public Soon</div>
                    <Button className="bg-white text-miuna-500 hover:bg-miuna-50 font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105">
                      {t.servicesSection.bookSave}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            )}



          </div>
        </div>
      </section>


      {/* Featured Products Section */}
      <section className="py-20 bg-[#F0F7ED]/60 dark:bg-gray-900/60 relative overflow-hidden">
        {/* Diagonal Stripes Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(200, 168, 118, 0.1) 10px, rgba(200, 168, 118, 0.1) 20px)`
          }}></div>
        </div>
        
        {/* Floating Product Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 left-16 w-8 h-8 bg-[#C3DFB7] rounded-full animate-bounce-gentle opacity-20"></div>
          <div className="absolute top-16 right-20 w-6 h-6 bg-[#A5C185] rounded-full animate-float opacity-25"></div>
          <div className="absolute bottom-32 left-24 w-10 h-10 bg-[#87BF6F] rounded-full animate-pulse-gentle opacity-20"></div>
          <div className="absolute bottom-16 right-16 w-7 h-7 bg-[#C3DFB7] rounded-full animate-bounce-gentle animation-delay-1000 opacity-30"></div>
          <div className="absolute top-1/2 left-12 w-5 h-5 bg-[#A5C185] rounded-full animate-float animation-delay-2000 opacity-25"></div>
          <div className="absolute top-1/3 right-12 w-9 h-9 bg-[#87BF6F] rounded-full animate-pulse-gentle animation-delay-3000 opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
                      <h2 className="text-5xl font-ephesis font-bold text-miuna-600 text-center mb-16">{t.products.title}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Nail Polish Collection */}
            <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="aspect-square bg-gradient-to-br from-beige-100 to-beige-200 overflow-hidden">
                <img 
                  src={productsImages[0]} 
                  alt="Premium nail polish collection" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{t.products.nailPolish}</h3>
                <p className="text-sm opacity-90">{t.products.nailPolishDesc}</p>
              </div>
            </div>
            
            {/* Nail Care Tools */}
            <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="aspect-square bg-gradient-to-br from-beige-100 to-beige-200 overflow-hidden">
                <img 
                  src={productsImages[1]} 
                  alt="Professional nail care tools" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{t.products.careTools}</h3>
                <p className="text-sm opacity-90">{t.products.careToolsDesc}</p>
              </div>
            </div>

            {/* Gel Polish Collection */}
            <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="aspect-square bg-gradient-to-br from-beige-100 to-beige-200 overflow-hidden">
                <img 
                  src={productsImages[2]} 
                  alt="Gel polish collection" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{t.products.gelPolish}</h3>
                <p className="text-sm opacity-90">{t.products.gelPolishDesc}</p>
              </div>
            </div>

            {/* Nail Art Accessories */}
            <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-amber-200 overflow-hidden">
                <img 
                  src={productsImages[3]} 
                  alt="Nail art accessories and decorations" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{t.products.artSupplies}</h3>
                <p className="text-sm opacity-90">{t.products.artSuppliesDesc}</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button className="mt-8 mb-8 md:mb-0 bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
              {t.products.booking}
            </Button>
          </div>
        </div>
      </section>

      {/* Styled by Us, Worn by You Section */}
      <section className="py-20 bg-beige-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-ephesis font-bold text-miuna-600 mb-4">{t.styledBy.title}</h2>
            <p className="text-xl text-beige-600 dark:text-beige-300">{t.styledBy.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src={styledByImages[0]}
                alt="Client nail work showcase" 
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">@sarah_nails</p>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src={styledByImages[1]}
                alt="Pedicure results showcase" 
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">@emma_beauty</p>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src={styledByImages[2]}
                alt="Nail art showcase" 
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">@lisa_style</p>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src={styledByImages[3]}
                alt="Classic nail style showcase" 
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">@anna_nails</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-beige-600 dark:text-beige-400 mb-4">{t.styledBy.tagUs}</p>
            <h3 className="text-xl font-bold text-beige-800 dark:text-beige-200 mb-2">{t.styledBy.followUs}</h3>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => window.open('https://www.instagram.com/', '_blank')}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                title="Follow on Instagram"
              >
                <Instagram className="w-6 h-6" />
              </Button>
              <Button
                onClick={() => window.open('https://www.facebook.com/', '_blank')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                title="Follow on Facebook"
              >
                <Facebook className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-gradient-to-tl from-beige-100 via-beige-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
        {/* Wave Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23C8A876' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Testimonial Hearts */}
        <div className="absolute inset-0 pointer-events-none">
          <Heart className="absolute top-20 left-16 text-[#C3DFB7] w-5 h-5 animate-pulse-gentle opacity-30" />
          <Heart className="absolute top-32 right-20 text-[#A5C185] w-4 h-4 animate-float opacity-25" />
          <Heart className="absolute bottom-24 left-20 text-[#87BF6F] w-6 h-6 animate-bounce-gentle opacity-20" />
          <Heart className="absolute bottom-16 right-16 text-[#C3DFB7] w-4 h-4 animate-pulse-gentle animation-delay-1000 opacity-35" />
          <Star className="absolute top-1/3 left-1/4 text-[#A5C185] w-3 h-3 animate-twinkle animation-delay-2000 opacity-40" />
          <Star className="absolute bottom-1/3 right-1/4 text-[#87BF6F] w-5 h-5 animate-twinkle animation-delay-3000 opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
                      <h2 className="text-5xl font-ephesis font-bold text-miuna-600 text-center mb-16">{t.testimonials.title}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Emma S.", text: t.testimonials.testimonial1 },
              { name: "Lisa M.", text: t.testimonials.testimonial2 },
              { name: "Sarah K.", text: t.testimonials.testimonial3 },
              { name: "Anna B.", text: t.testimonials.testimonial4 },
              { name: "Julia H.", text: t.testimonials.testimonial5 },
              { name: "Nina L.", text: t.testimonials.testimonial6 }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 border-none shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-beige-500 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-beige-800 dark:text-beige-200">{testimonial.name}</h3>
                </div>
                <p className="text-beige-600 dark:text-beige-300 italic">"{testimonial.text}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-neutral-800 text-white">
        <div className="max-w-7xl mx-auto px-2">
          <div className="grid md:grid-cols-3 gap-12">
                          <div className="text-center">
                <div className="flex justify-center mb-2">
                  <img src={footerPath} alt="MiuNa Logo" className="h-32 w-auto" />
                </div>
              <p className="text-beige-100 mb-6 font-bold">{t.footer.description}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">{t.footer.contact}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span className="text-beige-100">miuna@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span className="text-beige-100">+41 76 482 89 08</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span className="text-beige-100">Tellistrasse 67, 5004 Aarau</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">{t.footer.openingHours}</h3>
              <div className="space-y-2 text-beige-100">
                <p>{t.footer.monday}</p>
                {t.footer.saturday && <p>{t.footer.saturday}</p>}
                <p>{t.footer.sunday}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-neutral-600 mt-12 pt-8 text-center">
            <p className="text-beige-100">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
