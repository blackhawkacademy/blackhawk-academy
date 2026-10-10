/* ==========================================================================
   Black Hawk Academy — SITE CONFIGURATION
   --------------------------------------------------------------------------
   This is the ONE place to change contact details, links and media.
   Leave a value as an empty string ('') to hide that item on the website —
   nothing broken or invented is ever shown.
   ========================================================================== */

window.BHA_CONFIG = {
  academy: {
    nameAr: 'أكاديمية بلاك هوك',
    nameEn: 'Black Hawk Academy',
    taglineAr: 'درّب • احمِ • قُد',
    taglineEn: 'Train • Protect • Lead'
  },

  /* Your public domain, without a trailing slash, e.g. 'https://www.blackhawkacademy.com'.
     Used only for documentation / future canonical links. */
  domain: '',

  contact: {
    email: '',            // e.g. 'info@blackhawkacademy.com'
    // Phone numbers: `display` is shown exactly as written, `intl` is dialled when tapped.
    // Add or remove lines to add or remove numbers.
    phones: [
      { display: '010 6860 0700', intl: '+201068600700' },
      { display: '011 0366 9668', intl: '+201103669668' }
    ],
    whatsapp: '',         // international number, digits only, e.g. '9665XXXXXXXX'
    addressAr: '',        // e.g. 'الرياض، المملكة العربية السعودية'
    addressEn: '',        // e.g. 'Riyadh, Saudi Arabia'
    hoursAr: '',          // e.g. 'الأحد – الخميس، ٨:٠٠ ص – ٤:٠٠ م'
    hoursEn: '',          // e.g. 'Sun – Thu, 8:00 AM – 4:00 PM'
    mapUrl: 'https://maps.app.goo.gl/PFpEVSZxYtELu2Zr9',   // "open in Google Maps" link
    mapEmbed: 'https://www.google.com/maps?q=30.0812929,31.3390509&z=16&output=embed'  // embedded map (leave '' to hide)
  },

  /* Where every “Enquire Now” button goes.
     Priority: enquiryUrl → WhatsApp → email → the contact section. */
  enquiryUrl: '',         // e.g. an external application form (Google Form, Typeform…)

  social: {
    instagram: 'https://www.instagram.com/blackhawkacademy.eg/',
    x: '',
    linkedin: '',
    youtube: '',
    facebook: 'https://www.facebook.com/profile.php?id=61594977972890',
    tiktok: '',
    telegram: ''
  },

  /* Film section. An MP4 (H.264, under 25 MB) in assets/videos/.
     Leave src '' to show a finished “coming soon” state with no play button.
     poster = still shown before playback, duration = label in the frame corner. */
  video: {
    src: 'assets/videos/academy-interview.mp4',
    poster: 'assets/videos/academy-interview-poster.webp',
    duration: '03:22'
  },

  /* Thin bar above the navigation. Set enabled: false to remove it. */
  announcement: {
    enabled: true,
    id: 'missions-2026',  // change this when you change the text so it re-appears for visitors who closed it
    textAr: 'اكتشف مهام المركز الأربع عشرة ومحاورها التدريبية',
    textEn: 'Discover the Center’s fourteen missions and their training tracks',
    linkTextAr: 'استكشف',
    linkTextEn: 'Explore',
    href: '#missions'
  },

  privacyUrl: ''          // link to a privacy policy page, if you publish one
};
