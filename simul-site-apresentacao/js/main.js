/* SIMUL — site institucional. JavaScript puro, sem dependências. */

/* Links individuais do GitHub: preencha em cada <article class="membro" data-github="...">
   no index.html. Enquanto estiver vazio, o cartão mostra "link a definir". */
document.querySelectorAll('.membro').forEach(function (card) {
  var url = (card.dataset.github || '').trim();
  var slot = card.querySelector('.gh-slot');
  if (!url || !slot) return;
  var nome = card.querySelector('h3').textContent;
  var a = document.createElement('a');
  a.className = 'gh-link';
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.textContent = 'GitHub';
  a.setAttribute('aria-label', 'GitHub de ' + nome + ' (abre em nova aba)');
  slot.replaceWith(a);
});

/* Menu móvel */
var btn = document.querySelector('.menu-btn');
var menu = document.getElementById('menu');
function fechar() { menu.classList.remove('aberto'); btn.setAttribute('aria-expanded', 'false'); }
btn.addEventListener('click', function () {
  var aberto = menu.classList.toggle('aberto');
  btn.setAttribute('aria-expanded', String(aberto));
});
menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') fechar(); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });

/* Destaca no menu a seção visível */
if ('IntersectionObserver' in window) {
  var links = {};
  menu.querySelectorAll('a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  var obs = new IntersectionObserver(function (itens) {
    itens.forEach(function (i) {
      if (i.isIntersecting && links[i.target.id]) {
        Object.values(links).forEach(function (l) { l.classList.remove('ativo'); });
        links[i.target.id].classList.add('ativo');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) obs.observe(s); });
}
