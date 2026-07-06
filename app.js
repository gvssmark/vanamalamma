(function () {
  "use strict";

  var DATA_URL = "https://script.google.com/macros/s/AKfycbxElKmiEFwhiIbpUxypWMB5xx31ZxaJ0ThHwqUCLQs0kwDp5fyITci_pnBqDytY6AH2/exec?sheetId=1IuC4hcLCJlKuJE2jFWYCndFUaMDCQF6QfJRTkHuHcu8";
  var STORAGE_KEY = "vanamalammaTempleData";
  var STORAGE_TS_KEY = "vanamalammaTempleDataTs";
  var TZ = "Asia/Kolkata";

  // Bootstrap fallback so the app always has something to show on very first
  // load even before the network request resolves (or if it's blocked).
  var FALLBACK_DATA = {
    "sheetId": "1IuC4hcLCJlKuJE2jFWYCndFUaMDCQF6QfJRTkHuHcu8",
    "sheetName": "VMS-Temple",
    "tabs": {
      "TempleInfo": [
        { "Key": "TempleName", "Value": "శ్రీ విజయ వనమలమ్మ అమ్మవారి దేవస్థానం" },
        { "Key": "ShortName", "Value": "శ్రీ విజయ వనమలమ్మ అమ్మవారు" },
        { "Key": "Address", "Value": "మచిలీపట్నం" },
        { "Key": "Phone", "Value": 9989036183 },
        { "Key": "Email", "Value": "srivamalamma@gmail.com" },
        { "Key": "Website", "Value": "vanamalamma.gvssmark.in" },
        { "Key": "Latitude", "Value": 16.1875 },
        { "Key": "Longitude", "Value": 81.1389 },
        { "Key": "BannerImage", "Value": "Google Drive Link" },
        { "Key": "AboutTemple", "Value": "స్వయంభూ అమ్మవారు" },
        { "Key": "Facebook", "Value": "" },
        { "Key": "YouTube", "Value": "" },
        { "Key": "WhatsApp", "Value": "" },
        { "Key": "UPI", "Value": "" },
        { "Key": "QRImage", "Value": "Google Drive Link" }
      ],
      "SthalaPuranam": [
        { "Title": "ఆవిర్భావం", "Description": "తిరుమల శ్రీ వేంకటేశ్వర స్వామి ఆలయం లేదా శ్రీవారి స్థలపురాణం ప్రకారం, శ్రీనివాసుడు భూలోకంలో వెలయడానికి వరాహస్వామి అనుగ్రహం, బ్రహ్మాది దేవతల ప్రార్థనలు కారణం. భృగు మహర్షి శాపం వల్ల విష్ణుమూర్తి వైకుంఠం వీడి భూమికి రాగా, శ్రీనివాసుడిగా పద్మావతిని వివాహం చేసుకోవడం, కుబేరుని వద్ద అప్పు చేయడం ఈ పురాణంలో ముఖ్య ఘట్టాలు" },
        { "Title": "చరిత్ర", "Description": "korikateerche talli" },
        { "Title": "విశేషం", "Description": "Kongu Bangaram" },
        { "Title": "Test", "Description": "తిరుమల శ్రీ వేంకటేశ్వర స్వామి ఆలయం లేదా శ్రీవారి స్థలపురాణం ప్రకారం, శ్రీనివాసుడు భూలోకంలో వెలయడానికి వరాహస్వామి అనుగ్రహం, బ్రహ్మాది దేవతల ప్రార్థనలు కారణం. భృగు మహర్షి శాపం వల్ల విష్ణుమూర్తి వైకుంఠం వీడి భూమికి రాగా, శ్రీనివాసుడిగా పద్మావతిని వివాహం చేసుకోవడం, కుబేరుని వద్ద అప్పు చేయడం ఈ పురాణంలో ముఖ్య ఘట్టాలు" }
      ],
      "DarshanTimings": [
        { "Day": "Monday", "Morning": "6 AM -12 PM", "Evening": "4 PM - 8 PM" },
        { "Day": "Tuesday", "Morning": "6 AM -12 PM", "Evening": "4 PM - 8 PM" },
        { "Day": "Wednesday", "Morning": "6 AM -12 PM", "Evening": "4 PM - 8 PM" },
        { "Day": "Thursday", "Morning": "6 AM -12 PM", "Evening": "4 PM - 8 PM" },
        { "Day": "Friday", "Morning": "6 AM -12 PM", "Evening": "4 PM - 8 PM" },
        { "Day": "Saturday", "Morning": "6 AM -12 PM", "Evening": "4 PM - 8 PM" },
        { "Day": "Sunday", "Morning": "6 AM -12 PM", "Evening": "4 PM - 8 PM" }
      ],
      "PoojaFees": [
        { "Pooja": "అర్చన", "Amount": 50, "Description": "గోత్రనామాలతో సాధారణ అర్చన " },
        { "Pooja": "అభిషేకం", "Amount": 200, "Description": "గోత్రనామాలతో సాధారణ అర్చన మరియు క్షీరాభిషేకము " },
        { "Pooja": "సహస్రనామార్చన", "Amount": 500, "Description": "గోత్రనామాలతో  అర్చన, క్షీరాభిషేకము మరియు సహస్రనామ అర్చన " }
      ],
      "Donors": [
        { "Name": "VM Seshasayan", "Place": "Machilipatnam", "Amount": 10000 },
        { "Name": "Markandeyulu", "Place": "Hyderabad", "Amount": 10000 }
      ],
      "DevoteeExperiences": [
        { "Name": "Ramaiah", "Place": "Hyderabad", "Experience": "మా కోరిక నెరవేరింది..." },
        { "Name": "Sudari", "Place": "Hyderabad", "Experience": "మా కోరిక నెరవేరింది..." },
        { "Name": "Seshasai", "Place": "Matlapalem", "Experience": "మా కోరిక నెరవేరింది..." }
      ],
      "Images": [
        { "Category": "deity", "Title": "Main Deity", "FileID": "1vndtdrE9WyqYbo35_xcGUTafVR2PG-lG", "Order": 1 },
        { "Category": "deity", "Title": "Utsava Murthy", "FileID": "1vndtdrE9WyqYbo35_xcGUTafVR2PG-lG", "Order": 2 },
        { "Category": "temple", "Title": "Entrance", "FileID": "1vndtdrE9WyqYbo35_xcGUTafVR2PG-lG", "Order": 1 },
        { "Category": "temple", "Title": "Dhwaja Sthambam", "FileID": "1vndtdrE9WyqYbo35_xcGUTafVR2PG-lG", "Order": 2 },
        { "Category": "another view", "Title": "another view", "FileID": "1vndtdrE9WyqYbo35_xcGUTafVR2PG-lG", "Order": 3 },
        { "Category": "Markandeyulu", "Title": "Photo", "FileID": "1x5laid1rQZSBvOwlfjEoC6-1ARruwns2", "Order": 4 }
      ],
      "Announcements": [
        { "Date": "2026-07-14T18:30:00.000Z", "Title": "Will be update", "Description": "Will be update" },
        { "Date": "2026-07-19T18:30:00.000Z", "Title": "Will be update", "Description": "Will be update" }
      ],
      "Festivals": [
        { "Date": "2026-07-14T18:30:00.000Z", "Festival": "Will be update", "Description": "Will be update" },
        { "Date": "2026-07-19T18:30:00.000Z", "Festival": "Will be update", "Description": "Will be update" },
        { "Date": "2026-07-04T18:30:00.000Z", "Festival": " New", "Description": "New" },
        { "Date": "2026-07-02T18:30:00.000Z", "Festival": "Old", "Description": "Old" },
        { "Date": "", "Festival": "", "Description": "Old" }
      ]
    }
  };

  /* ---------------- Helpers ---------------- */

  function byKey(list, key) {
    var out = {};
    (list || []).forEach(function (row) {
      if (row && row.Key) out[row.Key] = row.Value;
    });
    return out;
  }

  function fmtDateDDMMYYYY(dateStr) {
    if (!dateStr) return null;
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    try {
      return new Intl.DateTimeFormat("en-GB", {
        timeZone: TZ, day: "2-digit", month: "2-digit", year: "numeric"
      }).format(d);
    } catch (e) {
      var dd = String(d.getDate()).padStart(2, "0");
      var mm = String(d.getMonth() + 1).padStart(2, "0");
      return dd + "/" + mm + "/" + d.getFullYear();
    }
  }

  // Returns a sortable "YYYYMMDD" (IST) integer, or null if invalid.
  function istSortKey(dateStr) {
    if (!dateStr) return null;
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    var parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: TZ, day: "2-digit", month: "2-digit", year: "numeric"
    }).formatToParts(d);
    var y, m, dd;
    parts.forEach(function (p) {
      if (p.type === "year") y = p.value;
      if (p.type === "month") m = p.value;
      if (p.type === "day") dd = p.value;
    });
    return parseInt(y + m + dd, 10);
  }

  function todayIstKey() {
    return istSortKey(new Date().toISOString());
  }

  function driveThumb(fileId, width) {
    return "https://drive.google.com/thumbnail?id=" + fileId + "&sz=w" + (width || 700);
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function digitsOnly(v) {
    return String(v == null ? "" : v).replace(/[^\d+]/g, "");
  }

  /* ---------------- Rendering ---------------- */

  function render(data) {
    if (!data || !data.tabs) return;
    var tabs = data.tabs;
    var info = byKey(tabs.TempleInfo);

    // Header + hero
    document.getElementById("brandShortName").textContent = info.ShortName || info.TempleName || "";
    document.getElementById("templeName").textContent = info.TempleName || "";
    document.title = info.TempleName || document.title;

    var phoneDigits = digitsOnly(info.Phone);

    // Hero banner image (falls back to gradient if no real Drive link is set)
    var heroBanner = document.getElementById("heroBanner");
    var bannerVal = info.BannerImage;
    if (bannerVal && /drive\.google\.com|http/.test(bannerVal)) {
      var img = document.createElement("img");
      img.alt = info.TempleName || "Temple banner";
      img.src = bannerVal;
      heroBanner.insertBefore(img, heroBanner.firstChild);
    }

    // Deity portrait shown inside the hero overlay
    var heroDeity = document.getElementById("heroDeity");
    var deityImages = (tabs.Images || [])
      .filter(function (row) { return row.Category && /deity/i.test(row.Category); })
      .sort(function (a, b) { return (a.Order || 0) - (b.Order || 0); });
    if (deityImages.length) {
      heroDeity.innerHTML = '<img src="' + driveThumb(deityImages[0].FileID, 300) + '" alt="' + escapeHtml(deityImages[0].Title || "Deity") + '">';
    } else {
      heroDeity.innerHTML = "";
    }

    // About
    document.getElementById("aboutText").textContent = info.AboutTemple || "";
    var puranamList = document.getElementById("puranamList");
    puranamList.innerHTML = (tabs.SthalaPuranam || []).map(function (item, i) {
      if (!item || !item.Title) return "";
      return (
        '<details class="puranam-item"' + (i === 0 ? " open" : "") + '>' +
          '<summary>' + escapeHtml(item.Title) + '</summary>' +
          '<div class="puranam-body">' + escapeHtml(item.Description || "") + '</div>' +
        '</details>'
      );
    }).join("");

    // Darshan timings — highlight today
    var todayName = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "long" }).format(new Date());
    var timingsBody = document.getElementById("timingsBody");
    timingsBody.innerHTML = (tabs.DarshanTimings || []).map(function (row) {
      var isToday = row.Day === todayName;
      return (
        '<tr class="' + (isToday ? "today" : "") + '">' +
          '<td>' + escapeHtml(row.Day) + (isToday ? " •" : "") + '</td>' +
          '<td>' + escapeHtml(row.Morning) + '</td>' +
          '<td>' + escapeHtml(row.Evening) + '</td>' +
        '</tr>'
      );
    }).join("");

    // Seva / pooja fees
    var sevaGrid = document.getElementById("sevaGrid");
    sevaGrid.innerHTML = (tabs.PoojaFees || []).map(function (row) {
      return (
        '<div class="seva-card">' +
          '<div class="seva-card-head">' +
            '<span class="seva-name">' + escapeHtml(row.Pooja) + '</span>' +
            '<span class="seva-amount">₹' + escapeHtml(row.Amount) + '</span>' +
          '</div>' +
          '<p class="seva-desc">' + escapeHtml(row.Description || "") + '</p>' +
        '</div>'
      );
    }).join("");

    // Festivals + Announcements merged timeline, future-only, sorted ascending
    var todayKey = todayIstKey();
    var events = [];
    (tabs.Festivals || []).forEach(function (row) {
      var title = row.Festival && row.Festival.trim();
      var key = istSortKey(row.Date);
      if (title && key && key >= todayKey) {
        events.push({ type: "ఉత్సవం", title: title.trim(), desc: row.Description, key: key, date: row.Date });
      }
    });
    (tabs.Announcements || []).forEach(function (row) {
      var title = row.Title && row.Title.trim();
      var key = istSortKey(row.Date);
      if (title && key && key >= todayKey) {
        events.push({ type: "ప్రకటన", title: title.trim(), desc: row.Description, key: key, date: row.Date });
      }
    });
    events.sort(function (a, b) { return a.key - b.key; });

    var timeline = document.getElementById("festivalsTimeline");
    var emptyNote = document.getElementById("festivalsEmpty");
    if (events.length === 0) {
      timeline.innerHTML = "";
      emptyNote.hidden = false;
    } else {
      emptyNote.hidden = true;
      timeline.innerHTML = events.map(function (ev) {
        return (
          '<div class="timeline-item">' +
            '<span class="timeline-date">' + fmtDateDDMMYYYY(ev.date) + ' · ' + escapeHtml(ev.type) + '</span>' +
            '<p class="timeline-title">' + escapeHtml(ev.title) + '</p>' +
            (ev.desc ? '<p class="timeline-desc">' + escapeHtml(ev.desc) + '</p>' : "") +
          '</div>'
        );
      }).join("");
    }

    // Gallery — grouped by category, ordered
    var groups = {};
    (tabs.Images || []).forEach(function (img) {
      var cat = img.Category || "గ్యాలరీ";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(img);
    });
    var galleryGroups = document.getElementById("galleryGroups");
    galleryGroups.innerHTML = Object.keys(groups).map(function (cat) {
      var items = groups[cat].slice().sort(function (a, b) { return (a.Order || 0) - (b.Order || 0); });
      return (
        '<div class="gallery-group">' +
          '<h3>' + escapeHtml(cat) + '</h3>' +
          '<div class="gallery-grid">' +
            items.map(function (img) {
              return (
                '<div class="gallery-item">' +
                  '<img loading="lazy" src="' + driveThumb(img.FileID, 400) + '" alt="' + escapeHtml(img.Title || cat) + '">' +
                '</div>'
              );
            }).join("") +
          '</div>' +
        '</div>'
      );
    }).join("");

    // Devotee experiences
    var scroller = document.getElementById("experienceScroller");
    scroller.innerHTML = (tabs.DevoteeExperiences || []).map(function (exp) {
      return (
        '<div class="experience-card">' +
          '<p class="experience-quote">' + escapeHtml(exp.Experience) + '</p>' +
          '<p class="experience-name">' + escapeHtml(exp.Name) + '</p>' +
          '<p class="experience-place">' + escapeHtml(exp.Place) + '</p>' +
        '</div>'
      );
    }).join("");

    // Donors
    var donorList = document.getElementById("donorList");
    donorList.innerHTML = (tabs.Donors || []).map(function (d) {
      return (
        '<div class="donor-row">' +
          '<span><span class="donor-name">' + escapeHtml(d.Name) + '</span><br>' +
          '<span class="donor-place">' + escapeHtml(d.Place) + '</span></span>' +
          '<span class="donor-amount">₹' + Number(d.Amount || 0).toLocaleString("en-IN") + '</span>' +
        '</div>'
      );
    }).join("");

    // Map
    var lat = info.Latitude, lng = info.Longitude;
    if (lat && lng) {
      document.getElementById("mapFrame").src =
        "https://maps.google.com/maps?q=" + lat + "," + lng + "&z=16&output=embed";
    }

    // Contact footer
    document.getElementById("contactAddress").textContent = "📍 " + (info.Address || "—");
    var contactPhone = document.getElementById("contactPhone");
    if (phoneDigits) {
      contactPhone.href = "tel:" + phoneDigits;
      contactPhone.textContent = "☎ " + info.Phone;
    }
    var contactEmail = document.getElementById("contactEmail");
    if (info.Email) {
      contactEmail.href = "mailto:" + info.Email;
      contactEmail.textContent = "✉ " + info.Email;
    }
    var contactWebsite = document.getElementById("contactWebsite");
    if (info.Website) {
      var url = /^https?:\/\//.test(info.Website) ? info.Website : "https://" + info.Website;
      contactWebsite.href = url;
      contactWebsite.textContent = "🌐 " + info.Website;
    }

    var socialLinks = document.getElementById("socialLinks");
    var socialBlock = document.getElementById("socialBlock");
    var socials = [];
    if (info.Facebook) socials.push({ label: "FB", href: info.Facebook });
    if (info.YouTube) socials.push({ label: "YT", href: info.YouTube });
    if (info.WhatsApp) socials.push({ label: "WA", href: /^https?:\/\//.test(info.WhatsApp) ? info.WhatsApp : ("https://wa.me/" + digitsOnly(info.WhatsApp)) });
    if (socials.length) {
      socialBlock.style.display = "";
      socialLinks.innerHTML = socials.map(function (s) {
        return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.label + '">' + s.label + '</a>';
      }).join("");
    } else {
      socialBlock.style.display = "none";
    }

    document.getElementById("footerYear").textContent = new Date().getFullYear();
  }

  /* ---------------- Data load / cache / sync ---------------- */

  function showUpdateToast() {
    var toast = document.getElementById("updateToast");
    toast.classList.add("show");
    setTimeout(function () { toast.classList.remove("show"); }, 3200);
  }

  function loadCached() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function saveCache(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(STORAGE_TS_KEY, String(Date.now()));
    } catch (e) { /* storage may be full/unavailable — fail silently */ }
  }

  function fetchLatest() {
    return fetch(DATA_URL, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      });
  }

  function init() {
    var cached = loadCached();
    var offlineBadge = document.getElementById("offlineBadge");

    if (cached) {
      render(cached);
    } else {
      render(FALLBACK_DATA);
      offlineBadge.hidden = false;
      offlineBadge.textContent = "డేటా లోడ్ అవుతోంది…";
    }

    fetchLatest().then(function (fresh) {
      offlineBadge.hidden = true;
      var freshStr = JSON.stringify(fresh);
      var cachedStr = cached ? JSON.stringify(cached) : null;
      if (freshStr !== cachedStr) {
        saveCache(fresh);
        render(fresh);
        if (cached) showUpdateToast();
      }
    }).catch(function () {
      if (!cached) {
        offlineBadge.hidden = false;
        offlineBadge.textContent = "ఆఫ్‌లైన్ డేటా చూపిస్తోంది";
      }
    });
  }

  /* ---------------- Header / nav scroll behavior ---------------- */

  function setupScrollSpy() {
    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
    var bottomLinks = Array.prototype.slice.call(document.querySelectorAll(".bottom-nav-link"));
    var sections = navLinks.map(function (a) {
      return document.querySelector(a.getAttribute("href"));
    }).filter(Boolean);

    function onScroll() {
      var pos = window.scrollY + (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 100) + 20;
      var currentId = sections[0] && sections[0].id;
      sections.forEach(function (sec) {
        if (sec.offsetTop <= pos) currentId = sec.id;
      });
      navLinks.forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + currentId);
      });
      bottomLinks.forEach(function (a) {
        a.classList.toggle("active", a.dataset.target === currentId);
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- Service worker ---------------- */

  function registerSw() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js").then(function (reg) {
          // Proactively ask the browser to check sw.js for changes now,
          // instead of waiting for its own ~24h update check.
          reg.update();
          document.addEventListener("visibilitychange", function () {
            if (document.visibilityState === "visible") reg.update();
          });
        }).catch(function () { /* ignore */ });
      });

      // Once a new service worker takes control, the page is being served
      // by fresh code — reload once so the user actually sees the update.
      var reloadedOnce = false;
      navigator.serviceWorker.addEventListener("controllerchange", function () {
        if (reloadedOnce) return;
        reloadedOnce = true;
        window.location.reload();
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    init();
    setupScrollSpy();
    registerSw();
  });
})();
