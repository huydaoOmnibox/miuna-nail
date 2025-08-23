import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Menu, X, Sparkles, Star, Heart, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { NO_IMAGE } from "@/lib/constants";

export const Pricelist = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      header: {
        title: "Preisliste",
        subtitle: "Transparente Preise für alle Nagelbehandlungen und Dienstleistungen"
      },
      categories: {
        gellak: "Gellack",
        biab: "BIAB",
        pedicure: "Pediküre",
        gelBuilder: "Gel Builder",
        acrylic: "Acryl",
        other: "Sonstiges"
      },
      services: {
        // Gellak
        gellakVoeten: "Gellack Füße",
        gellakHanden: "Gellack Hände",
        gellakFrench: "Gellack French",
        gellakVerwijderen: "Gellack entfernen",
        gellakVerwijderenOpnieuw: "Gellack entfernen + neu",
        gellakVerwijderenAndereSalon: "Gellack entfernen andere salon + neu",
        
        // BIAB
        biabNaturel: "Biab naturel",
        biabMetGellak: "Biab mit Gellack",
        biabFrench: "Biab French",
        biabKortVerlenging: "Biab mit kurzer Verlängerung",
        biabVerwijderen: "Biab entfernen",
        biabVerwijderenOpnieuw: "Biab entfernen + neu",
        biabVerwijderenAndereSalon: "Biab entfernen andere salon + neu",
        
        // Pedicure
        signaturePedicureZonderKleur: "Signature Pediküre ohne Farbe",
        signaturePedicureMetKleur: "Signature Pediküre mit Farbe",
        signaturePedicureMetFrench: "Signature Pediküre mit French",
        deluxePedicureZonderKleur: "Deluxe Pediküre ohne Farbe",
        deluxePedicureMetKleur: "Deluxe Pediküre mit Farbe",
        deluxePedicureMetFrench: "Deluxe Pediküre mit French",
        
        // Gel Builder
        gelBuilderNaturel: "Gel Builder naturel",
        gelBuilderMetGellak: "Gel Builder mit Gellack",
        gelBuilderFrench: "Gel Builder French",
        gelBuilderOpvullen: "Gel Builder auffüllen",
        gelBuilderMetGellakOpvullen: "Gel Builder mit Gellack auffüllen",
        gelBuilderMetFrenchOpvullen: "Gel Builder mit French auffüllen",
        gelBuilderAfhalen: "Gel Builder entfernen",
        gelBuilderAfhalenAndereSalon: "Gel Builder entfernen andere salon",
        gelBuilderAfhalenOpnieuw: "Gel Builder entfernen + neu",
        
        // Acrylic
        acrylNaturel: "Acryl naturel",
        acrylRozePoeder: "Acryl rosa Pulver",
        acrylMetGellak: "Acryl mit Gellack",
        acrylMetFrench: "Acryl mit French",
        opvullenNaturel: "Auffüllen naturel",
        opvullenRozePoeder: "Auffüllen rosa Pulver",
        opvullenMetGellak: "Auffüllen mit Gellack",
        opvullenMetFrench: "Auffüllen mit French",
        acrylAfhalen: "Acryl entfernen",
        acrylAfhalenAnderSalon: "Acryl entfernen andere salon",
        acrylAfhalenOpnieuw: "Acryl entfernen + neu",
        acrylAfhalenAndereSalonOpnieuw: "Acryl entfernen andere salon + neu",
        
        // Other
        steentje: "Steinchen",
        vanaf2Kleuren: "Ab 2 Farben",
        nagelReparatie: "Nagel Reparatur",
        nailFoil: "Nail Folie",
        glitterDoorlopen: "Glitzer durchgehend",
        nailArt: "Nagel Design",
        catEye: "Cat Eye",
        chrome: "Chrome",
        langeNagelVerlengen: "Lange Nägel verlängern",
        nagelKnippen: "Nägel schneiden",
        manicureAlleen: "Nur Maniküre",
        gellakAfhalenManicure: "Gellack entfernen + Maniküre",
        biabAfhalenManicure: "Biab entfernen + Maniküre",
        acrylAfhalenManicure: "Acryl entfernen + Maniküre",
        manicureNewset: "Maniküre + neuer Satz",
        babyboom: "Babyboom"
      },
      detailedServices: {
        nailCare: {
          title: "Nagelpflege",
          subtitle: "Professionelle Pflege für natürliche Nägel",
          description: "Umfassende Nagelpflege mit Fokus auf die Gesundheit und Schönheit Ihrer natürlichen Nägel. Von der Grundmaniküre bis zu Gellack-Behandlungen sorgen wir für das beste Ergebnis.",
          features: [
            "Professionelle Maniküre-Behandlungen",
            "Gellack-Anwendungen",
            "Nagelverstärkung",
            "Nagelhautpflege",
            "Handpflege und Massage"
          ]
        },
        footCare: {
          title: "Fußpflege",
          subtitle: "Vollständige Pediküre und Fußpflege",
          description: "Umfassende Fußpflege für gesunde und gepflegte Füße. Unsere Pediküre-Behandlungen kombinieren professionelle Pflege mit Entspannung.",
          features: [
            "Professionelle Pediküre",
            "Hornhautentfernung",
            "Fußmassage",
            "Nagelpflege",
            "Gellack für Zehennägel"
          ]
        },
        acrylGel: {
          title: "Acryl/Gel",
          subtitle: "Kunstnägel und Verlängerungen",
          description: "Professionelle Kunstnägel mit Acryl- oder Gel-Systemen. Perfekt für starke, langlebige und natürlich aussehende Nägel mit der gewünschten Länge und Form.",
          features: [
            "Neue Acryl- oder Gel-Sets",
            "Auffüllungen",
            "French Maniküre Option",
            "Natürlicher Look möglich",
            "Reparaturen und Wartung"
          ]
        },
        biab: {
          title: "BIAB",
          subtitle: "Builder In A Bottle Technik",
          description: "BIAB ist die perfekte Lösung für natürliche Nagelverstärkung. Diese innovative Technik bietet Schutz und Verstärkung, ohne den natürlichen Nagel zu beschädigen.",
          features: [
            "Natürliche Verstärkung",
            "Langlebiger Schutz",
            "Flexibel und stark",
            "Ideal für schwache Nägel",
            "Einfach zu warten"
          ]
        },
        nailArt: {
          title: "Nagelkunst",
          subtitle: "Kreative und einzigartige Designs",
          description: "Lassen Sie Ihre Nägel mit unserer künstlerischen Nagelkunst sprechen. Von subtilen Akzenten bis hin zu aufwendigen Designs machen wir Ihre Nagelkunst-Träume wahr.",
          features: [
            "Handgemalte Designs",
            "Swarovski-Kristalle",
            "Chrome- und Glitzer-Effekte",
            "Saisonale Designs",
            "Personalisierte Kunstwerke"
          ]
        }
      },
      cta: {
        title: "Bereit, einen Termin zu buchen?",
        description: "Buchen Sie noch heute und erleben Sie unsere professionellen Nagelbehandlungen mit transparenten Preisen.",
        bookAppointment: "TERMIN BUCHEN"
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
      header: {
        title: "Price List",
        subtitle: "Transparent pricing for all nail treatments and services"
      },
      categories: {
        gellak: "Gel Polish",
        biab: "BIAB",
        pedicure: "Pedicure",
        gelBuilder: "Gel Builder",
        acrylic: "Acrylic",
        other: "Other Services"
      },
      services: {
        // Gel Polish
        gellakVoeten: "Gel polish feet",
        gellakHanden: "Gel polish hands",
        gellakFrench: "Gel polish French",
        gellakVerwijderen: "Gel polish removal",
        gellakVerwijderenOpnieuw: "Gel polish removal +reapplication",
        gellakVerwijderenAndereSalon: "Gel polish removal other salon+reapplication",
        
        // BIAB
        biabNaturel: "BIAB natural",
        biabMetGellak: "BIAB with gel polish",
        biabFrench: "BIAB French",
        biabKortVerlenging: "BIAB with short extension",
        biabVerwijderen: "BIAB removal",
        biabVerwijderenOpnieuw: "BIAB removal+reapplication",
        biabVerwijderenAndereSalon: "BIAB removal other salon+reapplication",
        
        // Pedicure
        signaturePedicureZonderKleur: "Signature pedicure without color",
        signaturePedicureMetKleur: "Signature pedicure with color",
        signaturePedicureMetFrench: "Signature pedicure with French",
        deluxePedicureZonderKleur: "Deluxe pedicure without color",
        deluxePedicureMetKleur: "Deluxe pedicure with color",
        deluxePedicureMetFrench: "Deluxe pedicure with French",
        
        // Gel Builder
        gelBuilderNaturel: "Gel builder natural",
        gelBuilderMetGellak: "Gel builder with gel polish",
        gelBuilderFrench: "Gel builder French",
        gelBuilderOpvullen: "Gel builder infill",
        gelBuilderMetGellakOpvullen: "Gel builder with gel polish infill",
        gelBuilderMetFrenchOpvullen: "Gel builder with French infill",
        gelBuilderAfhalen: "Gel builder removal",
        gelBuilderAfhalenAndereSalon: "Gel builder removal other salon",
        gelBuilderAfhalenOpnieuw: "Gel builder removal+reapplication",
        
        // Acrylic
        acrylNaturel: "Acrylic natural",
        acrylRozePoeder: "Acrylic pink powder",
        acrylMetGellak: "Acrylic with gel polish",
        acrylMetFrench: "Acrylic with French",
        opvullenNaturel: "Infill natural",
        opvullenRozePoeder: "Infill pink powder",
        opvullenMetGellak: "Infill with gel polish",
        opvullenMetFrench: "Infill with French",
        acrylAfhalen: "Acrylic removal",
        acrylAfhalenAnderSalon: "Acrylic removal other salon",
        acrylAfhalenOpnieuw: "Acrylic removal+reapplication",
        acrylAfhalenAndereSalonOpnieuw: "Acrylic removal other salon+reapplication",
        
        // Other
        steentje: "Rhinestone",
        vanaf2Kleuren: "From 2 colors",
        nagelReparatie: "Nail repair",
        nailFoil: "Nail foil",
        glitterDoorlopen: "Glitter fade",
        nailArt: "Nail art",
        catEye: "Cat eye",
        chrome: "Chrome",
        langeNagelVerlengen: "Long nail extension",
        nagelKnippen: "Nail trimming",
        manicureAlleen: "Manicure only",
        gellakAfhalenManicure: "Gel polish removal+Manicure",
        biabAfhalenManicure: "BIAB removal+Manicure",
        acrylAfhalenManicure: "Acrylic removal+Manicure",
        manicureNewset: "Manicure+new set",
        babyboom: "Baby boom"
      },
      detailedServices: {
        nailCare: {
          title: "Nail Care",
          subtitle: "Professional care for natural nails",
          description: "Comprehensive nail care focusing on the health and beauty of your natural nails. From basic manicures to gel polish treatments, we ensure the best results.",
          features: [
            "Professional manicure treatments",
            "Gel polish applications",
            "Nail strengthening",
            "Cuticle care",
            "Hand care and massage"
          ]
        },
        footCare: {
          title: "Foot Care",
          subtitle: "Complete pedicure and foot care",
          description: "Comprehensive foot care for healthy and well-maintained feet. Our pedicure treatments combine professional care with relaxation.",
          features: [
            "Professional pedicure",
            "Callus removal",
            "Foot massage",
            "Nail care",
            "Gel polish for toenails"
          ]
        },
        acrylGel: {
          title: "Acrylic/Gel",
          subtitle: "Artificial nails and extensions",
          description: "Professional artificial nails with acrylic or gel systems. Perfect for strong, durable, and natural-looking nails with desired length and shape.",
          features: [
            "New sets acrylic or gel",
            "Refills",
            "French manicure option",
            "Natural look available",
            "Repairs and maintenance"
          ]
        },
        biab: {
          title: "BIAB",
          subtitle: "Builder In A Bottle technique",
          description: "BIAB is the perfect solution for natural nail strengthening. This innovative technique provides protection and reinforcement without damaging the natural nail.",
          features: [
            "Natural strengthening",
            "Durable protection",
            "Flexible and strong",
            "Ideal for weak nails",
            "Easy to maintain"
          ]
        },
        nailArt: {
          title: "Nail Art",
          subtitle: "Creative and unique designs",
          description: "Let your nails speak with our artistic nail designs. From subtle accents to elaborate designs, we make your nail art dreams come true.",
          features: [
            "Hand-painted designs",
            "Chrome and glitter effects",
            "Seasonal designs",
          ]
        }
      },
      cta: {
        title: "Ready to Book an Appointment?",
        description: "Book today and experience our professional nail treatments with transparent pricing.",
        bookAppointment: "BOOK APPOINTMENT"
      }
    }
  };

  const t = translations[currentLanguage];

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'pricing') {
      // Navigate to home page and scroll to pricing section
      window.location.href = '/#pricing';
    } else if (sectionId === 'contact') {
      // Navigate to home page and scroll to contact section
      window.location.href = '/#contact';
    } else if (sectionId === 'home') {
      // Navigate to home page
      window.location.href = '/';
    }
    setMobileMenuOpen(false);
  };

  // Price data organized by category
  const priceData = {
    gellak: [
      { service: "gellakVoeten", price: "€30" },
      { service: "gellakHanden", price: "€35" },
      { service: "gellakFrench", price: "€45" },
      { service: "gellakVerwijderen", price: "€15" },
      { service: "gellakVerwijderenOpnieuw", price: "+€5" },
      { service: "gellakVerwijderenAndereSalon", price: "+€8" }
    ],
    biab: [
      { service: "biabNaturel", price: "€50" },
      { service: "biabMetGellak", price: "€60" },
      { service: "biabFrench", price: "€65" },
      { service: "biabKortVerlenging", price: "+€10" },
      { service: "biabVerwijderen", price: "€20" },
      { service: "biabVerwijderenOpnieuw", price: "+€5" },
      { service: "biabVerwijderenAndereSalon", price: "+€8" }
    ],
    pedicure: [
      { service: "signaturePedicureZonderKleur", price: "€45" },
      { service: "signaturePedicureMetKleur", price: "€60" },
      { service: "signaturePedicureMetFrench", price: "€70" },
      { service: "deluxePedicureZonderKleur", price: "€60" },
      { service: "deluxePedicureMetKleur", price: "€75" },
      { service: "deluxePedicureMetFrench", price: "€85" }
    ],
    gelBuilder: [
      { service: "gelBuilderNaturel", price: "€55" },
      { service: "gelBuilderMetGellak", price: "€60" },
      { service: "gelBuilderFrench", price: "€70" },
      { service: "gelBuilderOpvullen", price: "€45" },
      { service: "gelBuilderMetGellakOpvullen", price: "€55" },
      { service: "gelBuilderMetFrenchOpvullen", price: "€65" },
      { service: "gelBuilderAfhalen", price: "€20" },
      { service: "gelBuilderAfhalenAndereSalon", price: "€25" },
      { service: "gelBuilderAfhalenOpnieuw", price: "+€8" }
    ],
    acrylic: [
      { service: "acrylNaturel", price: "€50" },
      { service: "acrylRozePoeder", price: "€55" },
      { service: "acrylMetGellak", price: "€60" },
      { service: "acrylMetFrench", price: "€70" },
      { service: "opvullenNaturel", price: "€45" },
      { service: "opvullenRozePoeder", price: "€50" },
      { service: "opvullenMetGellak", price: "€55" },
      { service: "opvullenMetFrench", price: "€65" },
      { service: "acrylAfhalen", price: "€25" },
      { service: "acrylAfhalenAnderSalon", price: "€30" },
      { service: "acrylAfhalenOpnieuw", price: "+€8" },
      { service: "acrylAfhalenAndereSalonOpnieuw", price: "+€10" }
    ],
    other: [
      { service: "steentje", price: "€1" },
      { service: "vanaf2Kleuren", price: "€5" },
      { service: "nagelReparatie", price: "€5" },
      { service: "nailFoil", price: "€2,5/nagel" },
      { service: "glitterDoorlopen", price: "€2,5/nagel" },
      { service: "nailArt", price: "€5/nagel" },
      { service: "catEye", price: "€10" },
      { service: "chrome", price: "€10" },
      { service: "langeNagelVerlengen", price: "€10" },
      { service: "nagelKnippen", price: "€10" },
      { service: "manicureAlleen", price: "€25" },
      { service: "gellakAfhalenManicure", price: "€30" },
      { service: "biabAfhalenManicure", price: "€35" },
      { service: "acrylAfhalenManicure", price: "€40" },
      { service: "manicureNewset", price: "+€15" },
      { service: "babyboom", price: "€15" }
    ]
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-beige-300 dark:border-gray-700 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={logoPath} 
                alt="MiuNa Logo" 
                className="h-40 w-50 object-contain"              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200"
              >
                {t.nav.home}
              </button>
              <Link href="/pricelist">
                <button className="text-beige-500 dark:text-beige-400 font-semibold transition-colors duration-200 border-b-2 border-beige-500">
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
                onClick={() => window.open('https://wa.me/31628699827', '_blank')}
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
                  className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium text-left transition-colors duration-200"
                >
                  {t.nav.home}
                </button>
                <Link href="/pricelist">
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-beige-500 dark:text-beige-400 font-semibold text-left transition-colors duration-200"
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
                  onClick={() => window.open('https://wa.me/31628699827', '_blank')}
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

      {/* Header */}
      <div className="bg-gradient-to-r from-beige-100 to-beige-200 dark:from-gray-800 dark:to-gray-700 pt-20">
        <div className="max-w-7xl mx-auto px-6">          
          <div className="text-center">
            <h1 className="text-6xl font-ephesis font-bold text-miuna-600 mb-6">
              {t.header.title}
            </h1>
            <p className="text-xl text-beige-600 dark:text-beige-300 max-w-3xl mx-auto leading-relaxed">
              {t.header.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Price List Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Price List Layout - Style: 2 2 1 bigger */}
          
          {/* Top Row: 2 columns */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Hand Care Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-dashed border-miuna-300">
              <h3 className="text-4xl font-ephesis text-miuna-600 mb-4 text-center">
                {currentLanguage === 'de' ? 'Handpflege (Hand Care)' : 'Hand Care'}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-dashed border-miuna-200">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Maniküre' : 'Manicure'}
                  </span>
                  <span className="font-semibold text-miuna-600">30.-</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed border-miuna-200">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Maniküre mit Shellac' : 'Manicure with Shellac'}
                  </span>
                  <span className="font-semibold text-miuna-600">65.-</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Maniküre mit Nagellack' : 'Manicure with Nail Polish'}
                  </span>
                  <span className="font-semibold text-miuna-600">55.-</span>
                </div>
              </div>
            </div>

            {/* Foot Care Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-dashed border-miuna-300">
              <h3 className="text-4xl font-ephesis text-miuna-600 mb-4 text-center">
                {currentLanguage === 'de' ? 'Fussflege (Foot Care)' : 'Foot Care'}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-dashed border-miuna-200">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Pediküre' : 'Pedicure'}
                  </span>
                  <span className="font-semibold text-miuna-600">60.-</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed border-miuna-200">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Pediküre mit Shellac' : 'Pedicure with Shellac'}
                  </span>
                  <span className="font-semibold text-miuna-600">90.-</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed border-miuna-200">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Pediküre mit Nagellack' : 'Pedicure with Nail Polish'}
                  </span>
                  <span className="font-semibold text-miuna-600">85.-</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Pediküre mit Verlängerung' : 'Pedicure with Extension'}
                  </span>
                  <span className="font-semibold text-miuna-600">130.-</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section 1: 1 bigger column - Nail Modeling */}
          <div className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-dashed border-miuna-300">
              <h3 className="text-4xl font-ephesis text-miuna-600 mb-4 text-center">Nagelmodellage mit Acryl/Gel</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-miuna-500 mb-2">
                    {currentLanguage === 'de' ? 'ohne Verlängerung:' : 'without Extension:'}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">
                        {currentLanguage === 'de' ? 'Mit Acryl/Gel Natur' : 'With Acrylic/Gel Natural'}
                      </span>
                      <span className="font-semibold text-miuna-600">65.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">
                        {currentLanguage === 'de' ? 'Mit Acryl/Gel Make-up' : 'With Acrylic/Gel Make-up'}
                      </span>
                      <span className="font-semibold text-miuna-600">70.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">
                        {currentLanguage === 'de' ? 'Mit French/Babyboomer' : 'With French/Babyboomer'}
                      </span>
                      <span className="font-semibold text-miuna-600">80.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">
                        {currentLanguage === 'de' ? 'Mit Farbe' : 'With Color'}
                      </span>
                      <span className="font-semibold text-miuna-600">75.-</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-miuna-500 mb-2">
                    {currentLanguage === 'de' ? 'mit Verlängerung:' : 'with Extension:'}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">
                        {currentLanguage === 'de' ? 'Neuanlage Natur' : 'New Set Natural'}
                      </span>
                      <span className="font-semibold text-miuna-600">75.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">
                        {currentLanguage === 'de' ? 'Auffüllen Natur' : 'Fill Natural'}
                      </span>
                      <span className="font-semibold text-miuna-600">65.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">
                        {currentLanguage === 'de' ? 'Neuanlage Make-up' : 'New Set Make-up'}
                      </span>
                      <span className="font-semibold text-miuna-600">80.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">
                        {currentLanguage === 'de' ? 'Auffüllen Make-up' : 'Fill Make-up'}
                      </span>
                      <span className="font-semibold text-miuna-600">70.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">
                        {currentLanguage === 'de' ? 'Neuanlage French/Babyboomer' : 'New Set French/Babyboomer'}
                      </span>
                      <span className="font-semibold text-miuna-600">95.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">
                        {currentLanguage === 'de' ? 'Auffüllen French/Babyboomer' : 'Fill French/Babyboomer'}
                      </span>
                      <span className="font-semibold text-miuna-600">85.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">
                        {currentLanguage === 'de' ? 'Neuanlage mit Farbe' : 'New Set with Color'}
                      </span>
                      <span className="font-semibold text-miuna-600">90.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">
                        {currentLanguage === 'de' ? 'Auffüllen mit Farbe' : 'Fill with Color'}
                      </span>
                      <span className="font-semibold text-miuna-600">80.-</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-700 dark:text-gray-300">
                        {currentLanguage === 'de' ? 'Ablösen bei Neuanlage' : 'Removal for New Set'}
                      </span>
                      <span className="font-semibold text-miuna-600">+20.-</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section 2: 1 column - Extra Services */}
          <div className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-dashed border-miuna-300">
              <h3 className="text-4xl font-ephesis text-miuna-600 mb-4 text-center">Extra</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Nur Farbe' : 'Color Only'}
                  </span>
                  <span className="font-semibold text-miuna-600">40.-</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Farbwechsel' : 'Color Change'}
                  </span>
                  <span className="font-semibold text-miuna-600">45.-</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Ablösen Acryl/Gel' : 'Remove Acrylic/Gel'}
                  </span>
                  <span className="font-semibold text-miuna-600">30.-</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Ablösen Shellac' : 'Remove Shellac'}
                  </span>
                  <span className="font-semibold text-miuna-600">20.-</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Farbverlauf mit Pulver' : 'Color Gradient with Powder'}
                  </span>
                  <span className="font-semibold text-miuna-600">+15.-</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Airbrush' : 'Airbrush'}
                  </span>
                  <span className="font-semibold text-miuna-600">
                    {currentLanguage === 'de' ? '2.- pro Nagel' : '2.- per nail'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? '3D-Muster ab 5.- pro Nagel' : '3D Pattern from 5.- per nail'}
                  </span>
                  <span className="font-semibold text-miuna-600">
                    {currentLanguage === 'de' ? '3.- pro Nagel' : '3.- per nail'}
                  </span>
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
                <div className="text-sm text-gray-500 dark:text-gray-400 italic text-left mt-2">
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
          </div>

          {/* Bottom Row: 2 columns */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Eyelash Extensions Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-dashed border-miuna-300">
              <h3 className="text-4xl font-ephesis text-miuna-600 mb-4 text-center">Wimpernverlängerung (Eyelash Extensions)</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold text-miuna-500 mb-2">Classic 1:1 Technik:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-700 dark:text-gray-300">Neusets</span>
                    <span className="font-semibold text-miuna-600">110.-</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-700 dark:text-gray-300">
                      {currentLanguage === 'de' ? 'Auffüllen nach 3 Wochen' : 'Fill after 3 weeks'}
                    </span>
                    <span className="font-semibold text-miuna-600">80.-</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-700 dark:text-gray-300">
                      {currentLanguage === 'de' ? 'Auffüllen nach 2 Wochen' : 'Fill after 2 weeks'}
                    </span>
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
                    <span className="text-gray-700 dark:text-gray-300">
                      {currentLanguage === 'de' ? 'Auffüllen nach 3 Wochen' : 'Fill after 3 weeks'}
                    </span>
                    <span className="font-semibold text-miuna-600">95.-</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-700 dark:text-gray-300">
                      {currentLanguage === 'de' ? 'Auffüllen nach 2 Wochen' : 'Fill after 2 weeks'}
                    </span>
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
              <h3 className="text-4xl font-ephesis text-miuna-600 mb-4 text-center">Augenbrauen & Wimpern (Eyebrows & Eyelashes)</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Augenbrauen färben und zupfen' : 'Eyebrows dye and pluck'}
                  </span>
                  <span className="font-semibold text-miuna-600">50.-</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Augenbrauen zupfen' : 'Eyebrows pluck'}
                  </span>
                  <span className="font-semibold text-miuna-600">25.-</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Augenbrauen färben' : 'Eyebrows dye'}
                  </span>
                  <span className="font-semibold text-miuna-600">30.-</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Wimpern Lifting' : 'Eyelashes Lifting'}
                  </span>
                  <span className="font-semibold text-miuna-600">80.-</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'de' ? 'Wimpern färben' : 'Eyelashes dye'}
                  </span>
                  <span className="font-semibold text-miuna-600">30.-</span>
                </div>
              </div>
            </div>
          </div>



          {/* Special Package Box - Centered Below Menu Boxes */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-miuna-500 to-miuna-600 text-white rounded-lg shadow-lg p-8 border-2 border-dashed border-miuna-400 w-1/3 max-w-7xl">
              <div className="text-center">
                <h3 className="text-4xl font-ephesis mb-4">Special Package</h3>
                <p className="mb-4">Exclusive offers coming soon</p>
                <div className="text-3xl font-bold mb-4">Public Soon</div>
                <Button className="bg-white text-miuna-500 hover:bg-miuna-50 font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105">
                  {t.cta.bookAppointment}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Detailed Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-ephesis font-bold text-miuna-600 mb-6">
              {currentLanguage === 'de' ? 'Unsere Dienstleistungen' : 'Our Services'}
            </h2>
            <p className="text-xl text-beige-600 dark:text-beige-300 max-w-3xl mx-auto leading-relaxed">
              {currentLanguage === 'de' 
                ? 'Entdecken Sie unsere Premium-Nagel- und Spa-Dienstleistungen, die entwickelt wurden, um Sie zu verwöhnen und Ihre natürliche Schönheit zu unterstreichen.'
                : 'Discover our premium nail and spa services designed to pamper you and enhance your natural beauty.'
              }
            </p>
          </div>
          
          <div className="space-y-16">
            {/* Premium Nail Care */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src={NO_IMAGE}
                    alt="Premium Nail Care"
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-beige-500 text-white px-4 py-2 text-sm font-semibold">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm"></span> 
                      </div>
                      <div className="text-2xl font-bold"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl font-bold text-beige-800 dark:text-beige-200 mb-2">
                    {t.detailedServices.nailCare.title}
                  </h3>
                  <p className="text-xl text-beige-600 dark:text-beige-300 font-medium mb-4">
                    {t.detailedServices.nailCare.subtitle}
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.detailedServices.nailCare.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-beige-800 dark:text-beige-200 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {currentLanguage === 'de' ? "Wat is inbegrepen:" : "What's Included:"}
                  </h4>
                  <ul className="space-y-2">
                    {t.detailedServices.nailCare.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-beige-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                    <Heart className="w-4 h-4 mr-2" />
                    {currentLanguage === 'de' ? 'Boek Deze Service' : 'Book This Service'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Luxury Pedicure */}
            <div className="grid lg:grid-cols-2 gap-12 items-center lg:grid-flow-col-dense">
              <div className="relative group lg:col-start-2">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src={NO_IMAGE}
                    alt="Luxury Pedicure"
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm"></span>
                      </div>
                      <div className="text-2xl font-bold"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 lg:col-start-1 lg:row-start-1">
                <div>
                  <h3 className="text-4xl font-bold text-beige-800 dark:text-beige-200 mb-2">
                    {t.detailedServices.footCare.title}
                  </h3>
                  <p className="text-xl text-beige-600 dark:text-beige-300 font-medium mb-4">
                    {t.detailedServices.footCare.subtitle}
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.detailedServices.footCare.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-beige-800 dark:text-beige-200 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {currentLanguage === 'de' ? "Wat is inbegrepen:" : "What's Included:"}
                  </h4>
                  <ul className="space-y-2">
                    {t.detailedServices.footCare.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-beige-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                    <Heart className="w-4 h-4 mr-2" />
                    {currentLanguage === 'de' ? 'Boek Deze Service' : 'Book This Service'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Eyelash Extensions */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src={NO_IMAGE}
                    alt="Eyelash Extensions"
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-beige-500 text-white px-4 py-2 text-sm font-semibold">
                      <Star className="w-4 h-4 mr-1" />
                      Popular
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm"></span>
                      </div>
                      <div className="text-2xl font-bold"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl font-bold text-beige-800 dark:text-beige-200 mb-2">
                    {t.detailedServices.acrylGel.title}
                  </h3>
                  <p className="text-xl text-beige-600 dark:text-beige-300 font-medium mb-4">
                    {t.detailedServices.acrylGel.subtitle}
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.detailedServices.acrylGel.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-beige-800 dark:text-beige-200 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {currentLanguage === 'de' ? "Wat is inbegrepen:" : "What's Included:"}
                  </h4>
                  <ul className="space-y-2">
                    {t.detailedServices.acrylGel.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-beige-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                    <Heart className="w-4 h-4 mr-2" />
                    {currentLanguage === 'de' ? 'Boek Deze Service' : 'Book This Service'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Professional Waxing */}
            <div className="grid lg:grid-cols-2 gap-12 items-center lg:grid-flow-col-dense">
              <div className="relative group lg:col-start-2">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src={NO_IMAGE}
                    alt="Professional Waxing"
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm"></span>
                      </div>
                      <div className="text-2xl font-bold"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 lg:col-start-1 lg:row-start-1">
                <div>
                  <h3 className="text-4xl font-bold text-beige-800 dark:text-beige-200 mb-2">
                    {t.detailedServices.biab.title}
                  </h3>
                  <p className="text-xl text-beige-600 dark:text-beige-300 font-medium mb-4">
                    {t.detailedServices.biab.subtitle}
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.detailedServices.biab.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-beige-800 dark:text-beige-200 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {currentLanguage === 'de' ? "Wat is inbegrepen:" : "What's Included:"}
                  </h4>
                  <ul className="space-y-2">
                    {t.detailedServices.biab.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-beige-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                    <Heart className="w-4 h-4 mr-2" />
                    {currentLanguage === 'de' ? 'Boek Deze Service' : 'Book This Service'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Eyelash Extensions */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src={NO_IMAGE}
                    alt="Eyelash Extensions"
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-beige-500 text-white px-4 py-2 text-sm font-semibold">
                      <Star className="w-4 h-4 mr-1" />
                      Popular
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm"></span>
                      </div>
                      <div className="text-2xl font-bold"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-4xl font-bold text-beige-800 dark:text-beige-200 mb-2">
                    {t.detailedServices.nailArt.title}
                  </h3>
                  <p className="text-xl text-beige-600 dark:text-beige-300 font-medium mb-4">
                    {t.detailedServices.nailArt.subtitle}
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t.detailedServices.nailArt.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-beige-800 dark:text-beige-200 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {currentLanguage === 'de' ? "Wat is inbegrepen:" : "What's Included:"}
                  </h4>
                  <ul className="space-y-2">
                    {t.detailedServices.nailArt.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-beige-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                    <Heart className="w-4 h-4 mr-2" />
                    {currentLanguage === 'de' ? 'Boek Deze Service' : 'Book This Service'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-beige-50 to-beige-100 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-ephesis font-bold text-miuna-600 mb-6">
            {t.cta.title}
          </h2>
          <p className="text-xl text-beige-600 dark:text-beige-300 mb-8 leading-relaxed">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.open('https://wa.me/31628699827', '_blank')}
              className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {currentLanguage === 'de' ? 'TERMIN BUCHEN' : 'BOOK APPOINTMENT'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}; 