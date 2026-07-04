const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxElKmiEFwhiIbpUxypWMB5xx31ZxaJ0ThHwqUCLQs0kwDp5fyITci_pnBqDytY6AH2/exec?sheetId=1IuC4hcLCJlKuJE2jFWYCndFUaMDCQF6QfJRTkHuHcu8';
const CACHE_KEY = 'temple-pwa-sheet-cache-v1';
const CACHE_MAX_AGE_MS = 12 * 60 * 60 * 1000;
const FALLBACK_DATA = {
  sheetId: '1IuC4hcLCJlKuJE2jFWYCndFUaMDCQF6QfJRTkHuHcu8',
  sheetName: 'VMS-Temple',
  tabs: {
    TempleInfo: [
      { Key: 'TempleName', Value: 'శ్రీ విజయ వనమలమ్మ అమ్మవారి దేవస్థానం' },
      { Key: 'ShortName', Value: 'శ్రీ విజయ వనమలమ్మ అమ్మవారు' },
      { Key: 'Address', Value: 'మచిలీపట్నం' },
      { Key: 'Phone', Value: 9989036183 },
      { Key: 'Email', Value: 'srivamalamma@gmail.com' },
      { Key: 'Website', Value: 'vanamalamma.gvssmark.in' },
      { Key: 'Latitude', Value: 16.1875 },
      { Key: 'Longitude', Value: 81.1389 },
      { Key: 'BannerImage', Value: 'Google Drive Link' },
      { Key: 'AboutTemple', Value: 'స్వయంభూ అమ్మవారు' },
      { Key: 'Facebook', Value: '' },
      { Key: 'YouTube', Value: '' },
      { Key: 'WhatsApp', Value: '' },
      { Key: 'UPI', Value: '' },
      { Key: 'QRImage', Value: 'Google Drive Link' }
    ],
    SthalaPuranam: [
      { Title: 'ఆవిర్భావం', Description: 'Will be updated' },
      { Title: 'చరిత్ర', Description: 'Will be updated' },
      { Title: 'విశేషం', Description: 'Will be updated' }
    ],
    DarshanTimings: [
      { Day: 'Monday', Morning: '6 AM -12 PM', Evening: '4 PM - 8 PM' },
      { Day: 'Tuesday', Morning: '6 AM -12 PM', Evening: '4 PM - 8 PM' },
      { Day: 'Wednesday', Morning: '6 AM -12 PM', Evening: '4 PM - 8 PM' },
      { Day: 'Thursday', Morning: '6 AM -12 PM', Evening: '4 PM - 8 PM' },
      { Day: 'Friday', Morning: '6 AM -12 PM', Evening: '4 PM - 8 PM' },
      { Day: 'Saturday', Morning: '6 AM -12 PM', Evening: '4 PM - 8 PM' },
      { Day: 'Sunday', Morning: '6 AM -12 PM', Evening: '4 PM - 8 PM' }
    ],
    PoojaFees: [
      { Pooja: 'అర్చన', Amount: 50, Description: 'గోత్రనామాలతో సాధారణ అర్చన ' },
      { Pooja: 'అభిషేకం', Amount: 200, Description: 'గోత్రనామాలతో సాధారణ అర్చన మరియు క్షీరాభిషేకము ' },
      { Pooja: 'సహస్రనామార్చన', Amount: 500, Description: 'గోత్రనామాలతో  అర్చన, క్షీరాభిషేకము మరియు సహస్రనామ అర్చన ' }
    ],
    Donors: [
      { Name: 'VM Seshasayan', Place: 'Machilipatnam', Amount: 10000 },
      { Name: 'Markandeyulu', Place: 'Hyderabad', Amount: 10000 }
    ],
    DevoteeExperiences: [
      { Name: 'Ramaiah', Place: 'Hyderabad', Experience: 'మా కోరిక నెరవేరింది...' },
      { Name: 'Sudari', Place: 'Hyderabad', Experience: 'మా కోరిక నెరవేరింది...' },
      { Name: 'Seshasai', Place: 'Matlapalem', Experience: 'మా కోరిక నెరవేరింది...' }
    ],
    Images: [
      { Category: 'deity', Title: 'Main Deity', FileID: '1vndtdrE9WyqYbo35_xcGUTafVR2PG-lG', Order: 1 },
      { Category: 'deity', Title: 'Utsava Murthy', FileID: '1vndtdrE9WyqYbo35_xcGUTafVR2PG-lG', Order: 2 },
      { Category: 'temple', Title: 'Entrance', FileID: '1vndtdrE9WyqYbo35_xcGUTafVR2PG-lG', Order: 1 },
      { Category: 'temple', Title: 'Dhwaja Sthambam', FileID: '1vndtdrE9WyqYbo35_xcGUTafVR2PG-lG', Order: 2 }
    ],
    Announcements: [
      { Date: '2026-07-14T18:30:00.000Z', Title: 'Will be update', Description: 'Will be update' },
      { Date: '2026-07-19T18:30:00.000Z', Title: 'Will be update', Description: 'Will be update' }
    ],
    Festivals: [
      { Date: '2026-07-14T18:30:00.000Z', Festival: 'Will be update', Description: 'Will be update' },
      { Date: '2026-07-19T18:30:00.000Z', Festival: 'Will be update', Description: 'Will be update' }
    ]
  }
};

const el = (id) => document.getElementById(id);

function mapTempleInfo(list = []) {
  return list.reduce((acc, item) => {
    if (item && item.Key) acc[item.Key] = item.Value;
    return acc;
  }, {});
}

function formatDateDDMMYYYY(input) {
  if (!input) return '-';
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return '-';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatDateTimeDDMMYYYY(input) {
  if (!input) return '-';
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return '-';
  return `${formatDateDDMMYYYY(date)} ${date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
}

function isUpcomingOrToday(input) {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return false;
  const itemDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return itemDay >= today;
}

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function driveImage(fileId) {
  return fileId ? `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1200` : '';
}

function saveCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }));
  } catch (error) {
    console.warn('Cache write failed', error);
  }
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('Cache read failed', error);
    return null;
  }
}

function isFresh(savedAt) {
  return Boolean(savedAt) && Date.now() - savedAt < CACHE_MAX_AGE_MS;
}

function renderList(containerId, items, builder, emptyText) {
  const container = el(containerId);
  if (!container) return;
  if (!items.length) {
    container.innerHTML = `<div class="empty">${emptyText}</div>`;
    return;
  }
  container.innerHTML = items.map(builder).join('');
}

function render(data, sourceLabel = 'లోకల్ క్యాష్', savedAt = null) {
  const tabs = data?.tabs || {};
  const info = mapTempleInfo(safeArray(tabs.TempleInfo));
  const announcements = safeArray(tabs.Announcements)
    .filter(item => isUpcomingOrToday(item.Date))
    .sort((a, b) => new Date(a.Date) - new Date(b.Date));
  const festivals = safeArray(tabs.Festivals)
    .filter(item => isUpcomingOrToday(item.Date))
    .sort((a, b) => new Date(a.Date) - new Date(b.Date));
  const images = safeArray(tabs.Images).slice().sort((a, b) => (a.Order || 0) - (b.Order || 0));

  if (el('brandName')) el('brandName').textContent = info.ShortName || info.TempleName || 'దేవస్థానం';
  if (el('brandAddress')) el('brandAddress').textContent = info.Address || '-';
  if (el('templeName')) el('templeName').textContent = info.TempleName || info.ShortName || 'దేవస్థానం';
  if (el('aboutTemple')) el('aboutTemple').textContent = info.AboutTemple || 'వివరాలు త్వరలో నవీకరించబడతాయి';
  if (el('dataSourceLabel')) el('dataSourceLabel').textContent = sourceLabel;
  if (el('lastUpdatedLabel')) el('lastUpdatedLabel').textContent = savedAt ? formatDateTimeDDMMYYYY(savedAt) : 'మొదటి లోడ్';
  if (el('staleLabel')) {
    el('staleLabel').textContent = savedAt && !isFresh(savedAt)
      ? 'క్యాష్ పాతది. తాజా డేటా కోసం తనిఖీ చేయండి.'
      : 'తాజా డేటా తనిఖీ జరుగుతోంది...';
  }

  const meta = [
    ['ఫోన్', info.Phone || '-'],
    ['ఇమెయిల్', info.Email || '-'],
    ['వెబ్‌సైట్', info.Website || '-'],
    ['స్థానం', info.Latitude && info.Longitude ? `${info.Latitude}, ${info.Longitude}` : '-']
  ];

  if (el('metaGrid')) {
    el('metaGrid').innerHTML = meta.map(([label, value]) => `
      <div class="meta-item">
        <small>${label}</small>
        <div style="margin-top:.35rem;font-weight:700;word-break:break-word;">${value}</div>
      </div>
    `).join('');
  }

  if (el('announcementCount')) el('announcementCount').textContent = announcements.length;
  if (el('festivalCount')) el('festivalCount').textContent = festivals.length;
  if (el('poojaCount')) el('poojaCount').textContent = safeArray(tabs.PoojaFees).length;
  if (el('experienceCount')) el('experienceCount').textContent = safeArray(tabs.DevoteeExperiences).length;

  renderList('darshanList', safeArray(tabs.DarshanTimings), item => `
    <div class="timing-row">
      <strong>${item.Day || '-'}</strong>
      <div><span class="chip">ఉదయం</span><div style="margin-top:.5rem;">${item.Morning || '-'}</div></div>
      <div><span class="chip">సాయంత్రం</span><div style="margin-top:.5rem;">${item.Evening || '-'}</div></div>
    </div>
  `, 'దర్శన సమయాలు అందుబాటులో లేవు.');

  renderList('storyList', safeArray(tabs.SthalaPuranam), item => `
    <article class="story-item">
      <div class="chip">${item.Title || 'విభాగం'}</div>
      <p style="margin-top:.85rem;">${item.Description || '-'}</p>
    </article>
  `, 'స్థల పురాణం ఇంకా చేరలేదు.');

  renderList('poojaList', safeArray(tabs.PoojaFees), item => `
    <article class="pooja-item">
      <div class="chip">పూజ సేవ</div>
      <h4 style="margin:.85rem 0 .45rem; font-size:1.15rem;">${item.Pooja || '-'}</h4>
      <div class="amount">₹${Number(item.Amount || 0).toLocaleString('en-IN')}</div>
      <p style="margin-top:.75rem; color:var(--muted);">${item.Description || '-'}</p>
    </article>
  `, 'పూజ సేవలు లేవు.');

  renderList('announcementList', announcements, item => `
    <article class="announcement">
      <div class="date-badge">${formatDateDDMMYYYY(item.Date)}</div>
      <h4 style="margin:.8rem 0 .4rem; font-size:1.08rem;">${item.Title || '-'}</h4>
      <p class="muted">${item.Description || '-'}</p>
    </article>
  `, 'ప్రస్తుతం చెల్లుబాటు అయ్యే ప్రకటనలు లేవు.');

  renderList('festivalList', festivals, item => `
    <article class="announcement">
      <div class="date-badge">${formatDateDDMMYYYY(item.Date)}</div>
      <h4 style="margin:.8rem 0 .4rem; font-size:1.08rem;">${item.Festival || '-'}</h4>
      <p class="muted">${item.Description || '-'}</p>
    </article>
  `, 'రాబోయే పండుగలు లేవు.');

  renderList('donorList', safeArray(tabs.Donors), item => `
    <article class="donor-item">
      <div class="chip">దాత</div>
      <h4 style="margin:.85rem 0 .35rem; font-size:1.08rem;">${item.Name || '-'}</h4>
      <p class="muted">${item.Place || '-'}</p>
      <div class="amount" style="margin-top:.65rem;">₹${Number(item.Amount || 0).toLocaleString('en-IN')}</div>
    </article>
  `, 'దాతల వివరాలు లేవు.');

  renderList('experienceList', safeArray(tabs.DevoteeExperiences), item => `
    <article class="experience-item">
      <div class="chip">భక్త అనుభవం</div>
      <h4 style="margin:.85rem 0 .35rem; font-size:1.08rem;">${item.Name || '-'}</h4>
      <p class="muted">${item.Place || '-'}</p>
      <p style="margin-top:.75rem;">${item.Experience || '-'}</p>
    </article>
  `, 'అనుభవాలు ఇంకా లేవు.');

  renderList('galleryList', images, item => `
    <article class="gallery-card">
      <img src="${driveImage(item.FileID)}" alt="${item.Title || 'Temple image'}" loading="lazy" decoding="async" width="1200" height="900" onerror="this.closest('.gallery-card').querySelector('.img-fallback').classList.remove('hidden'); this.classList.add('hidden');">
      <div class="img-fallback hidden empty" style="margin-top:0;">చిత్రం లోడ్ కాలేదు</div>
      <div style="margin-top:.85rem; display:flex; align-items:center; justify-content:space-between; gap:.75rem;">
        <div>
          <strong>${item.Title || '-'}</strong>
          <div class="muted" style="font-size:.92rem; margin-top:.2rem;">${item.Category || '-'}</div>
        </div>
        <span class="chip">#${item.Order || 0}</span>
      </div>
    </article>
  `, 'చిత్రాలు అందుబాటులో లేవు.');
}

async function fetchSheetData() {
  const response = await fetch(SHEET_URL, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Accept': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

async function refreshLiveData(sourceLabel = 'గూగుల్ షీట్ తాజా డేటా') {
  const liveData = await fetchSheetData();
  saveCache(liveData);
  render(liveData, sourceLabel, Date.now());
  if (el('staleLabel')) el('staleLabel').textContent = 'డేటా తాజాగానే ఉంది.';
  return liveData;
}

async function bootstrap() {
  const cached = readCache();
  if (cached?.data) {
    render(cached.data, 'లోకల్ క్యాష్', cached.savedAt);
  } else {
    render(FALLBACK_DATA, 'డిఫాల్ట్ డేటా', Date.now());
  }

  try {
    await refreshLiveData('గూగుల్ షీట్ తాజా డేటా');
  } catch (error) {
    console.warn('Live fetch failed:', error);
    if (el('staleLabel')) {
      el('staleLabel').textContent = cached?.savedAt
        ? 'నెట్‌వర్క్ సమస్య. చివరి క్యాష్ డేటా చూపిస్తున్నాం.'
        : 'నెట్‌వర్క్ సమస్య. డిఫాల్ట్ డేటా చూపిస్తున్నాం.';
    }
  }
}

function setupRefreshButton() {
  const refreshBtn = el('refreshBtn');
  if (!refreshBtn) return;
  refreshBtn.addEventListener('click', async () => {
    if (el('staleLabel')) el('staleLabel').textContent = 'తాజా డేటా తెస్తున్నాం...';
    try {
      await refreshLiveData('మాన్యువల్ రిఫ్రెష్');
      if (el('staleLabel')) el('staleLabel').textContent = 'తాజా డేటా విజయవంతంగా నవీకరించబడింది.';
    } catch (error) {
      console.warn('Manual refresh failed:', error);
      if (el('staleLabel')) el('staleLabel').textContent = 'తాజా డేటా రాలేదు. క్యాష్ డేటానే చూపిస్తున్నాం.';
    }
  });
}

function setupInstallPrompt() {
  let deferredPrompt = null;
  const installBtn = el('installBtn');
  if (!installBtn) return;

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installBtn.hidden = false;
  });

  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.hidden = true;
  });
}

function setupServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(error => {
      console.warn('SW registration failed', error);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupRefreshButton();
  setupInstallPrompt();
  setupServiceWorker();
  bootstrap();
});
