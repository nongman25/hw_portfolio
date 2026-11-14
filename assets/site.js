(() => {
  const menu = document.querySelector('#start-menu');
  const start = document.querySelector('#start-button');
  function closeMenu(returnFocus = false) {
    menu.hidden = true;
    start.setAttribute('aria-expanded', 'false');
    if (returnFocus) start.focus();
  }
  start.addEventListener('click', () => {
    menu.hidden = !menu.hidden;
    start.setAttribute('aria-expanded', String(!menu.hidden));
    if (!menu.hidden) menu.querySelector('a').focus();
  });
  document.addEventListener('click', event => {
    if (!menu.contains(event.target) && !start.contains(event.target)) closeMenu();
    if (event.target.closest('#start-menu a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) closeMenu(true);
  });
  const clock = document.querySelector('#desktop-clock');
  function updateClock() {
    const now = new Date();
    clock.textContent = new Intl.DateTimeFormat('ko-KR', {hour:'2-digit',minute:'2-digit',hour12:false}).format(now);
    clock.dateTime = now.toISOString();
    clock.title = new Intl.DateTimeFormat('ko-KR', {dateStyle:'full'}).format(now);
  }
  updateClock();
  setInterval(updateClock, 30000);
  document.querySelectorAll('[data-copy-email]').forEach(button => {
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('wook252wook@gmail.com');
        button.textContent = '복사됨';
        document.querySelector('#copy-feedback').textContent = '이메일 주소를 복사했습니다.';
        setTimeout(() => { button.textContent = '복사'; }, 2000);
      } catch {
        button.textContent = '복사 불가';
        document.querySelector('#copy-feedback').textContent = '이메일 주소를 직접 선택해 복사해 주세요.';
        setTimeout(() => { button.textContent = '복사'; }, 2500);
      }
    });
  });
  const navLinks = [...document.querySelectorAll('.anchor-nav a')];
  const sectionEls = [...document.querySelectorAll('.portfolio-section')];
  if (sectionEls.length) {
    let pending = false;
    function updateNav() {
      pending = false;
      let active = sectionEls[0].id;
      for (const section of sectionEls) if (section.getBoundingClientRect().top <= 160) active = section.id;
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = sectionEls.at(-1).id;
      navLinks.forEach(link => {
        if (link.dataset.section === active) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
    }
    window.addEventListener('scroll', () => {
      if (!pending) { pending = true; requestAnimationFrame(updateNav); }
    }, {passive:true});
    updateNav();
  }
  const dialog = document.querySelector('#project-dialog');
  if (!dialog || typeof dialog.showModal !== 'function' || location.protocol === 'file:') return;
  const content = document.querySelector('#dialog-content');
  const title = document.querySelector('#dialog-title');
  const pageLink = document.querySelector('#dialog-page-link');
  const close = document.querySelector('#dialog-close');
  const cache = new Map();
  let opener = null;
  let pendingRequest = null;
  let originalOverflow = '';
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    pendingRequest?.abort();
    document.body.style.overflow = originalOverflow;
    opener?.focus({preventScroll:true});
  });
  document.querySelectorAll('[data-project-link]').forEach(link => {
    link.addEventListener('click', async event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      pendingRequest?.abort();
      pendingRequest = new AbortController();
      const request = pendingRequest;
      opener = link;
      title.textContent = '프로젝트 상세';
      pageLink.href = link.href;
      content.innerHTML = '<p class="loading-note" role="status">프로젝트를 불러오고 있습니다.</p>';
      originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      close.focus();
      try {
        let markup = cache.get(link.href);
        if (!markup) {
          const response = await fetch(link.href, {signal:request.signal});
          if (!response.ok) throw new Error('Page unavailable');
          const doc = new DOMParser().parseFromString(await response.text(),'text/html');
          const article = doc.querySelector('.detail-article');
          if (!article) throw new Error('Missing project content');
          article.querySelectorAll('[src],[href]').forEach(element => {
            for (const attr of ['src','href']) if (element.hasAttribute(attr)) element.setAttribute(attr,new URL(element.getAttribute(attr),link.href).href);
          });
          // A dialog has its own accessible title; the page's heading becomes h2 here.
          const h1 = article.querySelector('h1');
          const h2 = document.createElement('h2');
          h2.className = h1.className; h2.textContent = h1.textContent; h1.replaceWith(h2);
          markup = article.outerHTML;
          cache.set(link.href,markup);
        }
        if (request.signal.aborted || !dialog.open) return;
        content.innerHTML = markup;
        title.textContent = content.querySelector('.detail-title').textContent;
        content.scrollTop = 0;
      } catch (error) {
        if (error.name === 'AbortError') return;
        content.innerHTML = '<p>상세 내용을 불러오지 못했습니다. 상단의 “독립 페이지로 열기”를 눌러 확인해 주세요.</p>';
      }
    });
  });
})();
