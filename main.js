/* ==========================================================================
   Black Hawk Academy — main
   Applies js/config.js (contacts, enquiry links, social, film) and renders
   the content in js/data.js (missions, instructors). DOM is built with
   createElement/textContent only — no HTML strings are injected.
   ========================================================================== */
(function () {
  'use strict';

  var cfg = window.BHA_CONFIG || {};
  var data = window.BHA_DATA || {};
  var doc = document.documentElement;
  var lang = (doc.lang || 'ar').indexOf('ar') === 0 ? 'ar' : 'en';
  var isAr = lang === 'ar';
  var base = doc.getAttribute('data-base') || '';
  var ui = (data.ui && data.ui[lang]) || {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nf2 = new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-US', { minimumIntegerDigits: 2, useGrouping: false });

  /* ---------- helpers ---------- */
  function asset(path) {
    if (!path) return '';
    return /^(https?:)?\/\//.test(path) || path.indexOf('data:') === 0 ? path : base + path;
  }

  function h(tag, attrs) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        var value = attrs[key];
        if (value === null || value === undefined || value === false) return;
        if (key === 'class') el.className = value;
        else if (key === 'text') el.textContent = value;
        else el.setAttribute(key, value === true ? '' : value);
      });
    }
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }
  function append(parent, child) {
    if (child === null || child === undefined || child === false) return;
    if (Array.isArray(child)) child.forEach(function (c) { append(parent, c); });
    else parent.append(child);
  }

  var SVG_NS = 'http://www.w3.org/2000/svg';
  function icon(id, extraClass) {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'icon' + (extraClass ? ' ' + extraClass : ''));
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var use = document.createElementNS(SVG_NS, 'use');
    use.setAttribute('href', '#' + id);
    svg.append(use);
    return svg;
  }

  function digits(value) { return String(value || '').replace(/[^\d]/g, ''); }
  function pick(ar, en) { return isAr ? ar : en; }

  /* ---------- enquiry destination ---------- */
  var contact = cfg.contact || {};
  var academyName = pick((cfg.academy || {}).nameAr || 'أكاديمية بلاك هوك', (cfg.academy || {}).nameEn || 'Black Hawk Academy');

  function whatsappUrl(topic) {
    if (!contact.whatsapp) return '';
    var text = isAr
      ? 'مرحباً، أود الاستفسار عن برامج ' + academyName + (topic ? ' — ' + topic : '') + '.'
      : 'Hello, I would like to enquire about ' + academyName + ' programs' + (topic ? ' — ' + topic : '') + '.';
    return 'https://wa.me/' + digits(contact.whatsapp) + '?text=' + encodeURIComponent(text);
  }

  function enquiryFor(topic) {
    if (cfg.enquiryUrl) return { href: cfg.enquiryUrl, external: true };
    if (contact.whatsapp) return { href: whatsappUrl(topic), external: true };
    if (contact.email) {
      var subject = encodeURIComponent((isAr ? 'استفسار' : 'Enquiry') + (topic ? ' — ' + topic : ''));
      return { href: 'mailto:' + contact.email + '?subject=' + subject, external: false };
    }
    return { href: '#contact', external: false };
  }

  function applyEnquiry(link, topic) {
    var dest = enquiryFor(topic);
    link.setAttribute('href', dest.href);
    if (dest.external) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    }
  }

  document.querySelectorAll('[data-enquire]').forEach(function (link) { applyEnquiry(link); });

  /* ---------- contact details (hidden unless configured) ---------- */
  var hours = pick(contact.hoursAr, contact.hoursEn);
  var address = pick(contact.addressAr, contact.addressEn);
  // phone numbers: the `phones` list, or a single legacy `phone` field
  var phoneList = Array.isArray(contact.phones)
    ? contact.phones.filter(function (p) { return p && p.display; })
    : (contact.phone ? [{ display: contact.phone, intl: contact.phoneIntl }] : []);
  var contactValues = {
    phone: phoneList.length
      ? phoneList.map(function (p) { return { text: p.display, href: 'tel:' + (p.intl || p.display).replace(/[^\d+]/g, '') }; })
      : null,
    whatsapp: contact.whatsapp ? { text: '+' + digits(contact.whatsapp), href: whatsappUrl('') } : null,
    email: contact.email ? { text: contact.email, href: 'mailto:' + contact.email } : null,
    hours: hours ? { text: hours } : null,
    address: (address || contact.mapUrl)
      ? { text: address || pick('عرض الموقع على خرائط Google', 'View location on Google Maps'), href: contact.mapUrl || '' }
      : null
  };

  var anyContact = false;
  var countFormat = new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-US');
  function fillContact(item, value) {
    item.hidden = false;
    item.querySelectorAll('[data-contact-value]').forEach(function (el) { el.textContent = value.text; });
    item.querySelectorAll('[data-contact-link]').forEach(function (link) {
      if (value.href) link.setAttribute('href', value.href);
      else { link.removeAttribute('href'); link.removeAttribute('target'); }
    });
  }
  document.querySelectorAll('[data-contact]').forEach(function (item) {
    var value = contactValues[item.getAttribute('data-contact')];
    if (!value) return;
    if (item.closest('[data-contact-list]')) anyContact = true;
    var values = [].concat(value);           // several phone numbers → one card / line each
    var template = item.cloneNode(true);
    var labelEl = item.querySelector('.contact__label');
    var baseLabel = labelEl ? labelEl.textContent : '';
    var previous = item;
    values.forEach(function (v, i) {
      var node = item;
      if (i > 0) {
        node = template.cloneNode(true);
        previous.after(node);
        previous = node;
      }
      fillContact(node, v);
      var label = node.querySelector('.contact__label');
      if (label && values.length > 1) label.textContent = baseLabel + ' ' + countFormat.format(i + 1);
    });
  });
  var emptyNote = document.querySelector('[data-contact-empty]');
  if (emptyNote) emptyNote.hidden = anyContact;

  // keep the two-column contact grid even: an odd last card spans both columns
  var contactList = document.querySelector('[data-contact-list]');
  if (contactList) {
    var halfCards = Array.prototype.filter.call(contactList.children, function (li) {
      return !li.hidden && !li.classList.contains('contact__item--wide');
    });
    if (halfCards.length % 2 === 1) halfCards[halfCards.length - 1].classList.add('contact__item--wide');
  }

  /* ---------- embedded map ---------- */
  var mapBox = document.querySelector('[data-map]');
  if (mapBox && contact.mapEmbed) {
    var mapSrc = contact.mapEmbed + (contact.mapEmbed.indexOf('?') > -1 ? '&' : '?') + 'hl=' + lang;
    mapBox.querySelector('[data-map-frame]').append(h('iframe', {
      src: mapSrc,
      title: pick('موقع أكاديمية بلاك هوك على الخريطة', 'Black Hawk Academy location map'),
      loading: 'lazy',
      referrerpolicy: 'no-referrer-when-downgrade',
      allowfullscreen: true
    }));
    var mapLink = mapBox.querySelector('[data-map-link]');
    if (mapLink) {
      if (contact.mapUrl) mapLink.setAttribute('href', contact.mapUrl);
      else mapLink.remove();
    }
    mapBox.hidden = false;
  }

  /* ---------- social links ---------- */
  var socialMeta = {
    instagram: ['i-instagram', 'Instagram'],
    x: ['i-x', 'X'],
    linkedin: ['i-linkedin', 'LinkedIn'],
    youtube: ['i-youtube', 'YouTube'],
    facebook: ['i-facebook', 'Facebook'],
    tiktok: ['i-tiktok', 'TikTok'],
    telegram: ['i-telegram', 'Telegram']
  };
  var socials = Object.keys(cfg.social || {}).filter(function (k) { return cfg.social[k] && socialMeta[k]; });
  if (socials.length) {
    document.querySelectorAll('[data-social]').forEach(function (list) {
      socials.forEach(function (k) {
        list.append(h('li', null, h('a', { href: cfg.social[k], target: '_blank', rel: 'noopener', 'aria-label': socialMeta[k][1] }, icon(socialMeta[k][0]))));
      });
      list.hidden = false;
    });
  }

  /* ---------- privacy + year ---------- */
  if (cfg.privacyUrl) {
    document.querySelectorAll('[data-privacy]').forEach(function (li) {
      li.hidden = false;
      li.querySelector('[data-privacy-link]').setAttribute('href', cfg.privacyUrl);
    });
  }
  var year = new Date().getFullYear();
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-US', { useGrouping: false }).format(year);
  });

  /* ---------- dialogs (shared behaviour) ---------- */
  var lastTrigger = null;
  function wireDialog(dialog) {
    if (!dialog || typeof dialog.showModal !== 'function') return;
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close();
      var closer = e.target.closest('[data-dialog-close]');
      if (closer && dialog.contains(closer)) {
        if (closer.tagName === 'A') lastTrigger = null; // following a link: don't jump focus back
        dialog.close();
      }
    });
    dialog.addEventListener('close', function () {
      doc.classList.remove('dialog-open');
      if (lastTrigger) lastTrigger.focus({ preventScroll: true });
      lastTrigger = null;
    });
  }
  function openDialog(dialog, trigger) {
    lastTrigger = trigger || null;
    doc.classList.add('dialog-open');
    dialog.showModal();
  }
  document.querySelectorAll('dialog.dialog').forEach(wireDialog);

  /* ---------- missions (tabs) ---------- */
  var tabsWrap = document.querySelector('[data-mission-tabs]');
  var stage = document.querySelector('[data-mission-stage]');
  if (tabsWrap && stage && Array.isArray(data.missions) && data.missions.length) {
    var missions = data.missions;
    var total = missions.length;
    var totalLabel = nf2.format(total);
    var tabs = [];
    var panels = [];
    var current = 0;
    var railQuery = window.matchMedia('(max-width: 1024px)');

    missions.forEach(function (mission, i) {
      var t = mission[lang] || mission.ar;
      var num = nf2.format(i + 1);

      var tab = h('button', {
        class: 'mission-tab',
        type: 'button',
        role: 'tab',
        id: 'mission-tab-' + (i + 1),
        'aria-controls': 'mission-panel-' + (i + 1),
        'aria-selected': 'false',
        tabindex: '-1'
      },
        h('span', { class: 'mission-tab__num', text: num }),
        h('span', { class: 'mission-tab__title', text: t.title }),
        icon('i-arrow', 'mission-tab__arrow icon--flip')
      );

      function column(label, index, items) {
        return h('div', { class: 'mission__col' },
          h('h4', null, h('span', { text: nf2.format(index) }), label),
          h('ul', { class: 'check-list', role: 'list' }, (items || []).map(function (x) { return h('li', { text: x }); }))
        );
      }

      var enquire = h('a', { class: 'link-arrow', href: '#contact' }, ui.enquire, icon('i-arrow', 'icon--flip'));
      applyEnquiry(enquire, t.title);

      var panel = h('article', {
        class: 'mission',
        role: 'tabpanel',
        id: 'mission-panel-' + (i + 1),
        'aria-labelledby': 'mission-tab-' + (i + 1),
        tabindex: '0'
      },
        h('span', { class: 'mission__numeral', 'aria-hidden': 'true', text: String(i + 1).padStart(2, '0') }),
        h('div', { class: 'mission__head' },
          h('span', { class: 'mission__icon' }, icon(mission.icon)),
          h('p', { class: 'mission__label', text: (ui.mission || '') + ' ' + num }),
          h('h3', { class: 'mission__title', text: t.title }),
          h('p', { class: 'mission__summary', text: t.summary })
        ),
        h('div', { class: 'mission__cols' },
          column(ui.role, 1, t.role),
          column(ui.axes, 2, t.axes),
          column(ui.outcomes, 3, t.outcomes)
        ),
        h('div', { class: 'mission__foot' },
          enquire,
          h('div', { class: 'mission__pager' },
            h('button', { class: 'pager-btn', type: 'button', 'aria-label': ui.prev, 'data-step': '-1' }, icon('i-arrow', 'icon--back')),
            h('span', { class: 'mission__count', 'aria-hidden': 'true' }, h('b', { text: num }), ' / ' + totalLabel),
            h('button', { class: 'pager-btn', type: 'button', 'aria-label': ui.next, 'data-step': '1' }, icon('i-arrow', 'icon--flip'))
          )
        )
      );

      tabs.push(tab);
      panels.push(panel);
      tabsWrap.append(tab);
      stage.append(panel);
    });

    var select = function (index, opts) {
      opts = opts || {};
      index = (index + total) % total;
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute('aria-selected', String(on));
        tab.tabIndex = on ? 0 : -1;
      });
      panels.forEach(function (panel, i) {
        var on = i === index;
        panel.classList.toggle('is-active', on);
        panel.inert = !on;
      });
      current = index;
      if (opts.focusTab) tabs[index].focus({ preventScroll: true });
      if (opts.scrollRail && railQuery.matches) {
        // centre the chosen tab in the rail (relative delta works for RTL and LTR alike)
        var railRect = tabsWrap.getBoundingClientRect();
        var tabRect = tabs[index].getBoundingClientRect();
        var delta = (tabRect.left + tabRect.width / 2) - (railRect.left + railRect.width / 2);
        tabsWrap.scrollBy({ left: delta, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    };

    var syncOrientation = function () {
      tabsWrap.setAttribute('aria-orientation', railQuery.matches ? 'horizontal' : 'vertical');
    };
    syncOrientation();
    if (railQuery.addEventListener) railQuery.addEventListener('change', syncOrientation);

    tabsWrap.addEventListener('click', function (e) {
      var tab = e.target.closest('[role="tab"]');
      if (tab) select(tabs.indexOf(tab), { scrollRail: true });
    });

    tabsWrap.addEventListener('keydown', function (e) {
      var rtl = doc.dir === 'rtl';
      var steps = { ArrowDown: 1, ArrowUp: -1, ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 };
      if (Object.prototype.hasOwnProperty.call(steps, e.key)) {
        e.preventDefault();
        select(current + steps[e.key], { focusTab: true, scrollRail: true });
      } else if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        select(e.key === 'Home' ? 0 : total - 1, { focusTab: true, scrollRail: true });
      }
    });

    stage.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-step]');
      if (!btn) return;
      var step = btn.getAttribute('data-step');
      select(current + Number(step), { scrollRail: true });
      var same = panels[current].querySelector('[data-step="' + step + '"]');
      if (same) same.focus({ preventScroll: true });
    });

    select(0);
  }

  /* ---------- instructors ---------- */
  var grid = document.querySelector('[data-instructors]');
  var profileDialog = document.querySelector('[data-profile-dialog]');
  var instructors = Array.isArray(data.instructors) ? data.instructors : [];

  if (grid && instructors.length) {
    instructors.forEach(function (person, i) {
      var t = person[lang] || person.ar;
      var num = nf2.format(i + 1);
      var card = h('li', { class: 'instructor', 'data-reveal': 'up' },
        h('div', { class: 'instructor__portrait' },
          h('img', {
            src: asset(person.image),
            alt: person.placeholder ? '' : t.name,
            width: '640',
            height: '800',
            loading: 'lazy',
            decoding: 'async'
          }),
          h('span', { class: 'instructor__index', text: num }),
          person.placeholder
            ? h('span', { class: 'instructor__tag instructor__tag--pending', text: ui.placeholder })
            : (t.badge ? h('span', { class: 'instructor__tag', text: t.badge }) : null)
        ),
        h('div', { class: 'instructor__body' },
          h('h3', { class: 'instructor__name', text: t.name }),
          h('p', { class: 'instructor__role', text: t.role }),
          h('ul', { class: 'chips', role: 'list' }, (t.specializations || []).slice(0, 3).map(function (s) { return h('li', { text: s }); })),
          h('button', {
            class: 'instructor__open',
            type: 'button',
            'aria-haspopup': 'dialog',
            'aria-label': ui.viewProfile + ' — ' + t.name + ' ' + num,
            'data-index': String(i)
          }, ui.viewProfile, icon('i-arrow', 'icon--flip'))
        )
      );
      grid.append(card);
    });

    if (profileDialog && typeof profileDialog.showModal === 'function') {
      grid.addEventListener('click', function (e) {
        var btn = e.target.closest('.instructor__open');
        if (!btn) return;
        var index = Number(btn.getAttribute('data-index'));
        var person = instructors[index];
        var t = person[lang] || person.ar;
        var img = profileDialog.querySelector('[data-profile-img]');
        img.src = asset(person.image);
        img.alt = person.placeholder ? '' : t.name;
        profileDialog.querySelector('[data-profile-index]').textContent = person.placeholder ? ui.placeholder : (t.badge || nf2.format(index + 1));
        profileDialog.querySelector('[data-profile-name]').textContent = t.name;
        profileDialog.querySelector('[data-profile-role]').textContent = t.role;
        var yearsBox = profileDialog.querySelector('[data-profile-years]');
        if (yearsBox) {
          yearsBox.hidden = !person.years;
          if (person.years) {
            yearsBox.querySelector('strong').textContent = '+' + new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-US').format(person.years);
            yearsBox.querySelector('span').textContent = ui.experience || '';
          }
        }
        profileDialog.querySelector('[data-profile-bio]').textContent = t.bio;
        profileDialog.querySelector('[data-profile-quals]').replaceChildren.apply(
          profileDialog.querySelector('[data-profile-quals]'),
          (t.qualifications || []).map(function (q) { return h('li', { text: q }); })
        );
        profileDialog.querySelector('[data-profile-specs]').replaceChildren.apply(
          profileDialog.querySelector('[data-profile-specs]'),
          (t.specializations || []).map(function (s) { return h('li', { text: s }); })
        );
        openDialog(profileDialog, btn);
        // always start a profile at its top, whichever part scrolls on this screen size
        profileDialog.querySelectorAll('.profile, .profile__body').forEach(function (el) { el.scrollTop = 0; });
      });
    } else {
      grid.querySelectorAll('.instructor__open').forEach(function (b) { b.hidden = true; });
    }
  }

  /* ---------- training-environment lightbox (only for tiles that have photos) ---------- */
  var tileImages = document.querySelectorAll('.env-tile__media img');
  if (tileImages.length && typeof HTMLDialogElement === 'function') {
    var lbImg = h('img', { alt: '' });
    var lbCaption = h('figcaption');
    var lightbox = h('dialog', { class: 'dialog lightbox', 'aria-label': pick('عرض الصورة', 'Image viewer') },
      h('button', { class: 'dialog__close', type: 'button', 'aria-label': ui.close, 'data-dialog-close': '' }, icon('i-close')),
      h('figure', null, lbImg, lbCaption)
    );
    document.body.append(lightbox);
    wireDialog(lightbox);
    tileImages.forEach(function (img) {
      var tile = img.closest('.env-tile');
      var title = (tile.querySelector('h3') || {}).textContent || '';
      var zoom = h('button', { class: 'env-tile__zoom', type: 'button', 'aria-label': pick('عرض الصورة: ', 'View image: ') + title });
      zoom.addEventListener('click', function () {
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt;
        lbCaption.textContent = title;
        openDialog(lightbox, zoom);
      });
      tile.append(zoom);
    });
  }

  /* ---------- film ---------- */
  var film = cfg.video || {};
  var durationLabel = document.querySelector('[data-video-duration]');
  if (film.src && film.duration && durationLabel) durationLabel.textContent = film.duration;
  var playBtn = document.querySelector('[data-video-open]');
  var videoDialog = document.querySelector('[data-video-dialog]');
  var video = document.querySelector('[data-video]');
  if (film.src && playBtn && videoDialog && video && typeof videoDialog.showModal === 'function') {
    var soon = document.querySelector('[data-video-soon]');
    playBtn.hidden = false;
    if (soon) soon.hidden = true;
    playBtn.addEventListener('click', function () {
      if (!video.getAttribute('src')) {
        if (film.poster) video.poster = asset(film.poster);
        video.src = asset(film.src); // the file is only requested when the visitor asks for it
      }
      openDialog(videoDialog, playBtn);
      var playing = video.play();
      if (playing && playing.catch) playing.catch(function () { /* user can press play */ });
    });
    videoDialog.addEventListener('close', function () { video.pause(); });
  }
})();
