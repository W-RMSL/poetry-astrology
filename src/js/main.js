//滚动特效
$(function () {
    $('.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

const sections = document.querySelectorAll('section');
const navText = document.getElementById('menu-text');
var tmpMenu = ''
var showMenu = false

//监听页面滚动切换章节（rAF 节流 + passive + 仅在章节变化时写 DOM，避免每帧强制重排造成的卡顿）
const navbarEl = document.getElementById('navbar');
const headerEl = document.querySelector('header');
const chapter01El = document.getElementById('chapter01');
const popupEl = document.getElementById('reference-popup');
const chapterMeta = {
    chapter01: ['第一章&nbsp;&nbsp;&nbsp;&nbsp;繁星点点，你我其名', 'menu01'],
    chapter02: ['第二章&nbsp;&nbsp;&nbsp;&nbsp;仰望星空，共托情思', 'menu02'],
    chapter03: ['第三章&nbsp;&nbsp;&nbsp;&nbsp;以人为镜，诗星闪烁', 'menu03'],
    chapter04: ['第四章&nbsp;&nbsp;&nbsp;&nbsp;星空探索', 'menu04']
};
let lastActiveId = '';
let scrollTicking = false;

function updateOnScroll() {
    scrollTicking = false;
    // —— 先统一读取（避免读写交错触发强制同步布局）——
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const chapterTop = chapter01El.offsetTop;
    let activeId = '';
    sections.forEach(function (sec) {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= vh && rect.bottom >= 0) activeId = sec.id;
    });

    // —— 再统一写入 ——
    if (popupEl.style.display === 'block') fixPopupPosition();
    if (scrollY >= chapterTop) {
        navbarEl.style.display = 'block';
        headerEl.style.display = 'none';
    } else {
        navbarEl.style.display = 'none';
        headerEl.style.display = 'flex';
    }
    if (activeId && activeId !== lastActiveId) {
        if (tmpMenu) {
            document.getElementById(tmpMenu).style.fontWeight = 'normal';
            document.getElementById(tmpMenu).style.textDecoration = 'none';
        }
        const meta = chapterMeta[activeId] || chapterMeta.chapter04;
        navText.innerHTML = meta[0];
        tmpMenu = meta[1];
        document.getElementById(tmpMenu).style.fontWeight = 'bolder';
        document.getElementById(tmpMenu).style.textDecoration = 'underline';
        lastActiveId = activeId;
    }
}

window.addEventListener('scroll', function () {
    if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(updateOnScroll);
    }
}, { passive: true });

// 性能：图表/封面滚出视口时暂停其 CSS 动画，避免后台持续掉帧
function setupAnimationPausing() {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            e.target.classList.toggle('anim-paused', !e.isIntersecting);
        });
    }, { rootMargin: '120px' });
    const ring = document.getElementById('Rolling-Star-Chart');
    const hero = document.querySelector('header');
    if (ring) io.observe(ring);
    if (hero) io.observe(hero);
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAnimationPausing);
} else {
    setupAnimationPausing();
}

//菜单栏显示切换
function toggleMenu() {
    var leftMenu = document.getElementById('left-menu');
    if (leftMenu.classList.contains('hidden')) {
        leftMenu.setAttribute('class', '');
        leftMenu.classList.add('visible')
    } else {
        leftMenu.setAttribute('class', '');
        leftMenu.classList.add('hidden')
    }
}

//显示参考文献
function togglePopup(){
    var popup = document.getElementById("reference-popup");
    var overlay = document.getElementById("overlay");
    
    // 切换弹窗和背景遮罩的显示状态
    if (popup.style.display === "block") {
      popup.style.display = "none";
      overlay.style.display = "none";
    } else {
      popup.style.display = "block";
      overlay.style.display = "block";
    }

    // 显示弹窗时，固定其位置
    fixPopupPosition();
}

// 固定弹窗的位置
function fixPopupPosition() {
    var popup = document.getElementById("popup");
    
    // 计算弹窗的位置
    var windowHeight = window.innerHeight;
    var popupHeight = popup.offsetHeight;
    var topPosition = (windowHeight - popupHeight) / 2;
    
    // 设置弹窗的位置
    popup.style.top = topPosition + "px";
  }
  

// 添加点击事件监听器到 document
document.addEventListener('click', function (event) {
    // 检查点击的元素是否在 left-menu 内部
    const isMenuIconClick = event.target.classList.contains('menu-icon');
    // 检查点击的元素是否是"menu-icon"
    const isLeftMenuClick = event.target.closest('#left-menu');
    const leftMenu = document.getElementById('left-menu');

    // 如果不是 left-menu 内部的点击且不是 menu-icon，则执行你的操作
    if (!isLeftMenuClick && !isMenuIconClick) {
        // 判断 left-menu 的显示状态，并执行相应操作
        if (leftMenu.classList.contains('visible')) {
            leftMenu.setAttribute('class', '');
            leftMenu.classList.add('hidden')
        }
    }
});
