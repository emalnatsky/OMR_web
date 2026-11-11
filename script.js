// Elena Malnatsky — tabs, project switcher, filters, copy buttons

const pages = document.querySelectorAll('.page');
const tabs = document.querySelectorAll('.tab');

function showPage(id) {
  if (!document.getElementById(id)) id = 'about';
  pages.forEach(p => p.classList.toggle('is-on', p.id === id));
  tabs.forEach(t => t.classList.toggle('is-on', t.dataset.tab === id));
  history.replaceState(null, '', id === 'about' ? location.pathname : '#' + id);
}

function showProject(key) {
  const slides = [...document.querySelectorAll('#proj-track .project')];
  const i = slides.findIndex(p => p.dataset.project === key);
  if (i >= 0 && window.goToProject) window.goToProject(i);
}

// Any button with data-tab switches page (and data-project picks a project)
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-tab]');
  if (btn) {
    showPage(btn.dataset.tab);
    if (btn.dataset.project) showProject(btn.dataset.project);
  }
});


// Publication year filter
document.querySelectorAll('.filters .pill').forEach(b =>
  b.addEventListener('click', () => {
    const year = b.dataset.year;
    document.querySelectorAll('.filters .pill').forEach(x => x.classList.toggle('is-on', x === b));
    document.querySelectorAll('.pubs li').forEach(li =>
      li.classList.toggle('hide', year !== 'all' && li.dataset.year !== year)
    );
  })
);

// Copy helpers
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}
async function copy(text, msg) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(msg);
  } catch {
    showToast("Couldn't copy, sorry");
  }
}

document.querySelectorAll('.cite').forEach(b =>
  b.addEventListener('click', () => copy(b.dataset.cite, 'Citation copied'))
);
const copyEmail = document.getElementById('copy-email');
copyEmail.addEventListener('click', () => copy(copyEmail.dataset.email, 'Email copied'));

showPage(location.hash.slice(1) || 'about');

// Current research photo gallery
(() => {
  const thumbs = [...document.querySelectorAll('.thumb')];
  if (!thumbs.length) return;
  const img = document.getElementById('gallery-img');
  const caption = document.getElementById('gallery-caption');
  let index = 0;
  function show(i) {
    index = (i + thumbs.length) % thumbs.length;
    const t = thumbs[index];
    img.src = t.dataset.src;
    img.alt = t.querySelector('img').alt;
    caption.textContent = t.dataset.caption;
    thumbs.forEach(x => x.classList.toggle('is-on', x === t));
  }
  thumbs.forEach((t, i) => t.addEventListener('click', () => show(i)));
  document.getElementById('gallery-prev').addEventListener('click', () => show(index - 1));
  document.getElementById('gallery-next').addEventListener('click', () => show(index + 1));
  show(0);
})();

// Projects carousel: swipe, drag, arrows, dots, keyboard
(() => {
  const track = document.getElementById('proj-track');
  if (!track) return;
  const slides = [...track.querySelectorAll('.project')];
  const dotsWrap = document.getElementById('proj-dots');
  const count = document.getElementById('proj-count');
  let current = 0;

  const dots = slides.map((s, i) => {
    const d = document.createElement('button');
    d.setAttribute('aria-label', 'Go to project ' + (i + 1));
    d.addEventListener('click', () => go(i));
    dotsWrap.appendChild(d);
    return d;
  });

  function update(i) {
    current = i;
    dots.forEach((d, j) => d.classList.toggle('is-on', j === i));
    count.textContent = (i + 1) + ' / ' + slides.length;
  }
  function go(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: 'smooth' });
    update(i);
  }
  window.goToProject = go;

  document.getElementById('proj-prev').addEventListener('click', () => go(current - 1));
  document.getElementById('proj-next').addEventListener('click', () => go(current + 1));

  // keep dots in sync when swiping
  let t;
  track.addEventListener('scroll', () => {
    clearTimeout(t);
    t = setTimeout(() => update(Math.round(track.scrollLeft / track.clientWidth)), 60);
  });

  // mouse drag (touch & trackpad swipe work natively)
  let startX = 0, startScroll = 0, dragging = false, moved = false;
  track.addEventListener('mousedown', e => {
    if (e.target.closest('a, button')) return;
    dragging = true; moved = false;
    startX = e.pageX; startScroll = track.scrollLeft;
    track.classList.add('is-dragging');
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.pageX - startX;
    if (Math.abs(dx) > 4) moved = true;
    track.scrollLeft = startScroll - dx;
  });
  window.addEventListener('mouseup', e => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove('is-dragging');
    const dx = e.pageX - startX;
    const step = Math.abs(dx) > track.clientWidth * 0.15 ? (dx < 0 ? 1 : -1) : 0;
    go(current + step);
  });
  track.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);

  // arrow keys while the Projects tab is open
  document.addEventListener('keydown', e => {
    if (!document.getElementById('projects').classList.contains('is-on')) return;
    if (e.key === 'ArrowRight') go(current + 1);
    if (e.key === 'ArrowLeft') go(current - 1);
  });

  // re-align when the tab is opened or the window resizes
  window.addEventListener('resize', () => go(current));
  update(0);
})();
