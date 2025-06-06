// ===== 중간계 AI 스튜디오 메인 JavaScript 파일 =====
// 모든 상호작용 기능들이 정의되어 있습니다

// ===== 전역 변수들 =====
let currentSlide = 0; // 현재 보이는 슬라이드 번호
const totalSlides = 3; // 전체 슬라이드 개수
let autoSlideTimer; // 자동 슬라이딩 타이머

// ===== 헤더 모바일 메뉴 기능들 =====
// 모바일 메뉴를 열고 닫는 함수
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
    } else {
        mobileNav.classList.add('active');
    }
}

// 모바일 메뉴를 닫는 함수
function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.remove('active');
}

// ===== 히어로 슬라이더 기능들 =====
// 다음 슬라이드로 이동
function nextSlide() {
    goToSlide((currentSlide + 1) % totalSlides);
}

// 이전 슬라이드로 이동
function previousSlide() {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
}

// 특정 슬라이드로 이동
function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicator');
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    slides[slideIndex].classList.add('active');
    indicators[slideIndex].classList.add('active');
    
    currentSlide = slideIndex;
    resetAutoSlide();
}

// 자동 슬라이딩 시작
function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, 5000);
}

// 자동 슬라이딩 멈춤
function stopAutoSlide() {
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
    }
}

// 자동 슬라이딩 재시작
function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// ===== 제품 섹션 기능들 =====
// 제품 설명 더보기/접기 기능
function toggleDescription(button) {
    const productContent = button.parentElement;
    const preview = productContent.querySelector('.product-desc-preview');
    const full = productContent.querySelector('.product-desc-full');
    
    if (preview.style.display !== 'none') {
        preview.style.display = 'none';
        full.style.display = 'block';
        button.textContent = '접기';
    } else {
        preview.style.display = 'block';
        full.style.display = 'none';
        button.textContent = '더보기';
    }
}

// ===== CEO 모달 기능들 =====
// 모달 열기
function openModal() {
    const modal = document.getElementById('ceoModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// 모달 닫기
function closeModal() {
    const modal = document.getElementById('ceoModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// 배경 클릭으로 모달 닫기
function closeModalOnBackground(event) {
    if (event.target === event.currentTarget) {
        closeModal();
    }
}

// ===== 푸터 기능들 =====
// 이용약관 보기
function showTerms() {
    alert('이용약관 페이지로 이동합니다.\n(실제 서비스에서는 이용약관 페이지가 열려요)');
}

// 개인정보처리방침 보기
function showPrivacy() {
    alert('개인정보처리방침 페이지로 이동합니다.\n(실제 서비스에서는 개인정보처리방침 페이지가 열려요)');
}

// ===== 모바일 바로가기 기능들 =====
// 페이지 맨 위로 스크롤
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== 터치 스와이프 기능 (모바일용) =====
let touchStartX = 0;
let touchEndX = 0;

// 스와이프 방향에 따라 슬라이드 이동
function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        previousSlide();
    }
}

// ===== 페이지 로딩 완료 시 초기화 =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('중간계 AI 스튜디오 웹사이트가 로딩되었습니다!');
    
    // 히어로 슬라이더 초기화
    if (document.querySelector('.hero-section')) {
        startAutoSlide();
        
        // 히어로 섹션 마우스 이벤트
        const heroSection = document.querySelector('.hero-section');
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
        
        // 터치 이벤트 (모바일)
        heroSection.addEventListener('touchstart', function(event) {
            touchStartX = event.changedTouches[0].screenX;
        });
        
        heroSection.addEventListener('touchend', function(event) {
            touchEndX = event.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    // 제품 카드 클릭 효과
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(function(card, index) {
        card.addEventListener('click', function(event) {
            if (event.target.classList.contains('toggle-btn')) {
                return;
            }
            
            card.style.transform = 'scale(0.98)';
            setTimeout(function() {
                card.style.transform = '';
            }, 150);
        });
    });
    
    // 구매하기 버튼 확인 메시지
    const purchaseBtn = document.querySelector('.purchase-btn');
    if (purchaseBtn) {
        purchaseBtn.addEventListener('click', function(event) {
            const confirmed = confirm('네이버 스마트스토어로 이동하시겠습니까?');
            if (!confirmed) {
                event.preventDefault();
            }
        });
    }
    
    // SNS 버튼 클릭 효과
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            button.style.transform = 'scale(0.95)';
            setTimeout(function() {
                button.style.transform = '';
            }, 150);
        });
    });
    
    // 푸터 연락처 정보 클릭 이벤트
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const text = item.querySelector('span').textContent;
            
            if (text.includes('02-6952')) {
                if (confirm('고객센터에 전화를 걸까요?\n' + text)) {
                    window.location.href = 'tel:02-6952-9454';
                }
            } else if (text.includes('midcampus31@gmail.com')) {
                if (confirm('이메일을 보낼까요?\nmidcampus31@gmail.com')) {
                    window.location.href = 'mailto:midcampus31@gmail.com';
                }
            } else if (text.includes('서울특별시 서초구')) {
                if (confirm('지도에서 위치를 확인할까요?\n' + text)) {
                    window.open('https://map.naver.com/v5/search/' + encodeURIComponent('서울특별시 서초구 논현로 173'), '_blank');
                }
            }
        });
        
        item.style.cursor = 'pointer';
        
        item.addEventListener('mouseenter', function() {
            item.style.color = '#87ceeb';
        });
        
        item.addEventListener('mouseleave', function() {
            item.style.color = '#e6e6e6';
        });
    });
    
    // 이미지 로딩 에러 처리
    const images = document.querySelectorAll('img');
    images.forEach(function(img) {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: ${this.classList.contains('shop-image') ? '300px' : '200px'};
                background-color: #f0f0f0;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #666;
                font-size: 14px;
                border-radius: 10px;
            `;
            placeholder.textContent = '이미지를 불러올 수 없습니다';
            
            this.parentNode.insertBefore(placeholder, this.nextSibling);
        });
    });
    
    // 챗봇 버튼 호버 효과
    const chatbotBtn = document.querySelector('.chatbot-btn');
    if (chatbotBtn) {
        chatbotBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        chatbotBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        chatbotBtn.addEventListener('click', function() {
            console.log('챗봇 버튼이 클릭되었습니다!');
        });
    }
    
    // 모바일 바로가기 버튼 호버 효과
    const shortcutBtn = document.querySelector('.shortcut-btn');
    if (shortcutBtn) {
        shortcutBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        shortcutBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

// ===== 화면 크기 변경 이벤트 =====
window.addEventListener('resize', function() {
    // 화면이 커지면 모바일 메뉴 자동으로 닫기
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// ===== 키보드 이벤트 =====
document.addEventListener('keydown', function(event) {
    // 슬라이더 키보드 조작
    if (event.key === 'ArrowLeft') {
        previousSlide();
    } else if (event.key === 'ArrowRight') {
        nextSlide();
    }
    
    // ESC 키로 모달 닫기
    if (event.key === 'Escape') {
        const modal = document.getElementById('ceoModal');
        if (modal && modal.classList.contains('show')) {
            closeModal();
        }
    }
});

// ===== 메뉴 외부 클릭으로 모바일 메뉴 닫기 =====
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileNav && mobileMenuBtn) {
        if (!mobileNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            closeMobileMenu();
        }
    }
});

// ===== 스크롤 이벤트 (바로가기 버튼 표시/숨기기) =====
window.addEventListener('scroll', function() {
    const shortcutBtn = document.querySelector('.mobile-shortcuts');
    if (shortcutBtn) {
        if (window.scrollY > 300) {
            shortcutBtn.style.opacity = '1';
            shortcutBtn.style.visibility = 'visible';
        } else {
            shortcutBtn.style.opacity = '0.7';
        }
    }
});

// ===== 부드러운 스크롤 네비게이션 =====
document.addEventListener('click', function(event) {
    if (event.target.matches('a[href^="#"]')) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

console.log('중간계 AI 스튜디오 스크립트가 로드되었습니다!'); 