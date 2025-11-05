// 모바일 메뉴 토글
const hamburger = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// 햄버거 버튼 클릭
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
});

// 모바일 메뉴 닫기
function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = ''; // 스크롤 복원
}

mobileClose.addEventListener('click', closeMobileMenu);

// 모바일 메뉴 링크 클릭 시 메뉴 닫기
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(closeMobileMenu, 300); // 부드러운 전환을 위한 딜레이
    });
});

// 오버레이 클릭 시 메뉴 닫기
mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) {
        closeMobileMenu();
    }
});

// 스크롤 시 헤더 스타일 변경
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// 스무스 스크롤 (내장 기능 사용하지만 추가 보정)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 비디오 로드 실패 시 이미지로 대체
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    heroVideo.addEventListener('error', function() {
        const videoContainer = this.closest('.hero-video-container');
        if (videoContainer) {
            const posterImg = this.querySelector('img');
            if (posterImg) {
                const img = document.createElement('img');
                img.src = posterImg.src;
                img.alt = posterImg.alt;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                videoContainer.appendChild(img);
                this.style.display = 'none';
            }
        }
    });
}

// 페이지 로드 시 애니메이션
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// 부드러운 스크롤 인디케이터 애니메이션
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    let scrollIndicatorVisible = true;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100 && scrollIndicatorVisible) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transition = 'opacity 0.3s ease';
            scrollIndicatorVisible = false;
        } else if (window.pageYOffset <= 100 && !scrollIndicatorVisible) {
            scrollIndicator.style.opacity = '1';
            scrollIndicatorVisible = true;
        }
    });
}

// 스크롤 시 섹션 요소 애니메이션 (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// 애니메이션 대상 요소 관찰
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.story-header, .story-main-copy, .timeline-item, .brand-dna-section, .history-image-section, .signature-menu-section, .philosophy-header, .philosophy-main-copy, .philosophy-card, .philosophy-footer, .philosophy-cta, .menu-solution-header, .problem-recognition-cards, .value-statement, .menu-solution-menu-intro, .menu-solution-menu-grid, .policy-section, .cost-guarantee-section, .capability-section, .menu-solution-cta, .premium-track-main-header, .collaboration-subsection, .b2b-subsection'
    );
    
    // 연혁 이미지도 관찰 대상에 추가
    const historyImage = document.querySelector('.history-image-section');
    if (historyImage) {
        observer.observe(historyImage);
    }
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 구글 폼은 별도 JavaScript 처리 불필요
    // 구글 폼이 iframe으로 임베드되어 자동으로 작동합니다
});

