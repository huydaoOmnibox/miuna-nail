import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Menu, X, MapPin, Clock, Phone, Mail, Calendar, Navigation, Sparkles } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

export const Contact = (): JSX.Element => {
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
        title: "Contact",
        subtitle: "Neem contact met ons op voor een afspraak of vragen. We staan klaar om u te helpen met al uw nagelzorgbehoeften."
      },
      contactInfo: {
        title: "Contactgegevens",
        address: {
          title: "Adres",
          street: "Tellistrasse 67",
          city: "5004 Aarau",
          country: "Zwitserland"
        },
        phone: {
          title: "Telefoon",
          number: "+41 76 482 89 08"
        },
        phone2: {
          title: "Telefoon",
          number: "+41 62 558 98 88"
        },
        email: {
          title: "E-mail",
          address: "miunanailsbeauty@gmail.com"
        },
        hours: {
          title: "Openingstijden",
          weekdays: "Maandag - Vrijdag: 9:00-19:00",
          saturday: "Zaterdag: 8:00-18:00",
          sunday: "Zondag: Gesloten",
          note: "Afspraken buiten openingstijden op verzoek mogelijk"
        }
      },
      location: {
        title: "Onze Locatie",
        description: "We bevinden ons in het hart van Aarau, op Tellistrasse 67. Makkelijk bereikbaar met openbaar vervoer en parkeren in de buurt.",
        directions: "Route Plannen"
      },
      bookingInfo: {
        title: "Afspraak Maken",
        description: "Maak eenvoudig een afspraak via telefoon of e-mail. We raden aan om van tevoren te reserveren om teleurstelling te voorkomen.",
        emergency: "Voor spoedgevallen kunt u altijd bellen.",
        bookButton: "AFSPRAAK MAKEN"
      },
      mapSection: {
        title: "Vind Ons Gemakkelijk",
        subtitle: "Centraal gelegen in Aarau voor uw gemak"
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
        title: "Contact",
        subtitle: "Get in touch with us for appointments or questions. We're here to help with all your nail care needs."
      },
      contactInfo: {
        title: "Contact Information",
        address: {
          title: "Address",
          street: "Tellistrasse 67",
          city: "5004 Aarau",
          country: "Switzerland"
        },
        phone: {
          title: "Phone",
          number: "+41 76 482 89 08"
        },
        phone2: {
          title: "Phone",
          number: "+41 62 558 98 88"
        },
        email: {
          title: "Email",
          address: "miunanailsbeauty@gmail.com"
        },
        hours: {
          title: "Opening Hours",
          weekdays: "Monday - Friday: 9:00-19:00",
          saturday: "Saturday: 8:00-18:00",
          sunday: "Sunday: Closed",
          note: "Appointments outside opening hours available upon request"
        }
      },
      location: {
        title: "Our Location",
        description: "We are located in the heart of Aarau, at Tellistrasse 67. Easily accessible by public transport with nearby parking.",
        directions: "Get Directions"
      },
      bookingInfo: {
        title: "Book Appointment",
        description: "Easily book an appointment via phone or email. We recommend booking in advance to avoid disappointment.",
        emergency: "For emergencies, you can always call us.",
        bookButton: "BOOK APPOINTMENT"
      },
      mapSection: {
        title: "Find Us Easily",
        subtitle: "Centrally located in Aarau for your convenience"
      }
    }
  };

  const t = translations[currentLanguage];

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'pricing') {
      window.location.href = '/#pricing';
    } else if (sectionId === 'contact') {
      window.location.href = '/#contact';
    } else if (sectionId === 'home') {
      window.location.href = '/';
    }
    setMobileMenuOpen(false);
  };

  // Opening hours data
  const openingHours = [
    { day: currentLanguage === 'de' ? 'Montag' : 'Monday', hours: '9:00-19:00', open: true },
    { day: currentLanguage === 'de' ? 'Dienstag' : 'Tuesday', hours: '9:00-19:00', open: true },
    { day: currentLanguage === 'de' ? 'Mittwoch' : 'Wednesday', hours: '9:00-19:00', open: true },
    { day: currentLanguage === 'de' ? 'Donnerstag' : 'Thursday', hours: '9:00-19:00', open: true },
    { day: currentLanguage === 'de' ? 'Freitag' : 'Friday', hours: '9:00-19:00', open: true },
    { day: currentLanguage === 'de' ? 'Samstag' : 'Saturday', hours: '8:00-18:00', open: true },
    { day: currentLanguage === 'de' ? 'Sonntag' : 'Sunday', hours: currentLanguage === 'de' ? 'Geschlossen' : 'Closed', open: false }
  ];

  const googleMapsUrl = "https://www.google.com/maps?q=Tellistrasse+67,+5004+Aarau&output=embed";

  const handlePhoneContact = (phoneNumber: string) => {
    const sanitizedNumber = phoneNumber.replace(/\s+/g, '');
    window.location.href = `tel:${sanitizedNumber}`;
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
                <button className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
                  {t.nav.pricelist}
                </button>
              </Link>
              <Link href="/gallery">
                <button className="text-beige-700 dark:text-beige-300 hover:text-beige-500 dark:hover:text-beige-400 font-medium transition-colors duration-200">
                  {t.nav.gallery}
                </button>
              </Link>
              <Link href="/contact">
                <button className="text-beige-500 dark:text-beige-400 font-semibold transition-colors duration-200 border-b-2 border-beige-500">
                  {t.nav.contact}
                </button>
              </Link>
              
              <Button 
                onClick={() => handlePhoneContact('+41 76 482 89 08')}
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
                <Link href="/contact">
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-beige-500 dark:text-beige-400 font-semibold text-left transition-colors duration-200"
                  >
                    {t.nav.contact}
                  </button>
                </Link>
                
                <Button 
                  onClick={() => handlePhoneContact('+41 76 482 89 08')}
                  className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-miuna-600 px-6 py-2 rounded-full font-semibold w-full"
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
      <div className="bg-gradient-to-r from-beige-100 to-beige-200 dark:from-gray-800 dark:to-gray-700 pt-20 pb-12">
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

      {/* Contact Information Section */}
      <section>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-ephesis font-bold text-miuna-600 mb-4">
              {t.contactInfo.title}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            
            {/* Left Column - Contact Details */}
            <div className="space-y-6">
              
              {/* Address Card */}
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-beige-400 to-beige-500 text-miuna-600">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <MapPin className="w-5 h-5" />
                    {t.contactInfo.address.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6">
                  <div className="space-y-1">
                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {t.contactInfo.address.street}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t.contactInfo.address.city}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t.contactInfo.address.country}
                    </p>
                  </div>
                  <Button 
                    className="mt-4 bg-beige-500 hover:bg-beige-600 text-miuna-600 text-sm"
                    onClick={() => window.open(`https://maps.google.com/?q=Tellistrasse+67,+5004+Aarau`, '_blank')}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    {t.location.directions}
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Methods Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone */}
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-beige-100 p-2 rounded-full cursor-pointer hover:bg-beige-200 transition-all duration-300"
                           onClick={() => handlePhoneContact(t.contactInfo.phone.number)}>
                        <Phone className="w-5 h-5 text-beige-600" />
                      </div>
                      <div className="cursor-pointer hover:text-beige-600 transition-colors duration-300"
                           onClick={() => handlePhoneContact(t.contactInfo.phone.number)}>
                        <h3 className="font-semibold text-beige-800 dark:text-beige-200 text-sm">
                          {t.contactInfo.phone.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {t.contactInfo.phone.number}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Email */}
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-beige-100 p-2 rounded-full cursor-pointer hover:bg-beige-200 transition-all duration-300"
                           onClick={() => handlePhoneContact(t.contactInfo.phone2.number)}>
                        <Phone className="w-5 h-5 text-beige-600" />
                      </div>
                      <div className="cursor-pointer hover:text-beige-600 transition-colors duration-300"
                           onClick={() => handlePhoneContact(t.contactInfo.phone2.number)}>
                        <h3 className="font-semibold text-beige-800 dark:text-beige-200 text-sm">
                          {t.contactInfo.phone2.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {t.contactInfo.phone2.number}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>

            {/* Right Column - Opening Hours & Booking */}
            <div className="space-y-6">
              
              {/* Opening Hours */}
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-beige-400 to-beige-500 text-miuna-600">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <Clock className="w-5 h-5" />
                    {t.contactInfo.hours.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6">
                  <div className="space-y-3">
                    {openingHours.map((day, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-beige-100 last:border-b-0">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {day.day}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`${day.open ? 'text-green-600' : 'text-red-500'} font-medium text-sm`}>
                            {day.hours}
                          </span>
                          <Badge className={`${day.open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-xs`}>
                            {day.open ? (currentLanguage === 'de' ? 'Geöffnet' : 'Open') : (currentLanguage === 'de' ? 'Geschlossen' : 'Closed')}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-beige-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t.contactInfo.hours.note}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Information */}
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-beige-400 to-beige-500 text-miuna-600">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <Calendar className="w-5 h-5" />
                    {t.bookingInfo.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t.bookingInfo.description}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t.bookingInfo.emergency}
                    </p>
                    <Button 
                      onClick={() => handlePhoneContact(t.contactInfo.phone.number)}
                      className="w-full bg-gradient-to-r from-beige-600 to-beige-700 hover:from-beige-700 hover:to-beige-800 text-white py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      {t.bookingInfo.bookButton}
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Location Description */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
            <CardHeader className="bg-gradient-to-r from-beige-400 to-beige-500 text-miuna-600">
              <CardTitle className="flex items-center gap-3 text-lg">
                <MapPin className="w-5 h-5" />
                {t.location.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t.location.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-20 bg-beige-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-ephesis font-bold text-miuna-600 mb-4">
              {t.mapSection.title}
            </h2>
            <p className="text-xl text-beige-600 dark:text-beige-300">
              {t.mapSection.subtitle}
            </p>
          </div>
          
          <Card className="border-none shadow-2xl overflow-hidden">
            <div className="relative">
              <iframe
                src={googleMapsUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-96 lg:h-[500px]"
                title="MiuNa Location"
              ></iframe>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-beige-600" />
                  <div>
                    <p className="font-semibold text-beige-800 text-sm">MiuNa</p>
                                          <p className="text-gray-600 text-xs">Tellistrasse 67, 5004 Aarau</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-beige-50 to-beige-100 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-ephesis font-bold text-miuna-600 mb-6">
            {currentLanguage === 'de' ? 'Bereit für wunderschöne Nägel?' : 'Ready for Beautiful Nails?'}
          </h2>
          <p className="text-xl text-beige-600 dark:text-beige-300 mb-8 leading-relaxed">
            {currentLanguage === 'de' 
              ? 'Besuchen Sie uns im Herzen von Aarau oder buchen Sie einen Termin. Wir freuen uns darauf, Sie willkommen zu heißen!'
              : 'Visit us in the heart of Aarau or book an appointment. We look forward to welcoming you!'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => handlePhoneContact(t.contactInfo.phone.number)}
              className="bg-gradient-to-r from-beige-500 to-beige-600 hover:from-beige-600 hover:to-beige-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {currentLanguage === 'de' ? 'TERMIN BUCHEN' : 'BOOK APPOINTMENT'}
            </Button>
            <Button 
              variant="outline" 
              className="border-beige-400 text-beige-700 hover:bg-beige-50 px-12 py-4 rounded-full text-lg font-semibold"
              onClick={() => window.open(`https://maps.google.com/?q=Tellistrasse+67,+5004+Aarau`, '_blank')}
            >
              <Navigation className="w-5 h-5 mr-2" />
              {t.location.directions}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}; 
