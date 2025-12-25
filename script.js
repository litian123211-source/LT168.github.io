// 辽宁鲲鹏科技有限公司 - JavaScript交互脚本

document.addEventListener('DOMContentLoaded', function() {
    // 导航栏移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // 点击菜单项后关闭移动端菜单
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // 滚动时导航栏样式变化
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(102, 126, 234, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            navbar.style.backdropFilter = 'none';
        }
    });

    // 页面滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // 为所有需要动画的元素添加观察器
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // 联系表单处理
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 获取表单数据
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // 简单的表单验证
            if (!data.name || !data.email || !data.subject || !data.message) {
                alert('请填写所有必填字段！');
                return;
            }

            // 邮箱格式验证
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('请输入有效的邮箱地址！');
                return;
            }

            // 模拟表单提交
            alert('感谢您的留言！我们会在24小时内回复您。');
            contactForm.reset();
        });
    }

    // 平滑滚动到锚点
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 减去导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 页面加载完成后的初始化
    function initPage() {
        // 设置页面标题
        const currentPage = window.location.pathname.split('/').pop();
        let pageTitle = '辽宁鲲鹏科技有限公司';

        switch(currentPage) {
            case 'about.html':
                pageTitle += ' - 关于我们';
                break;
            case 'products.html':
                pageTitle += ' - 产品服务';
                break;
            case 'contact.html':
                pageTitle += ' - 联系我们';
                break;
            default:
                pageTitle += ' - 首页';
        }

        document.title = pageTitle;

        // 添加页面加载动画
        document.body.classList.add('loaded');
    }

    // 页面加载动画样式
    const style = document.createElement('style');
    style.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // 延迟执行初始化，确保DOM完全加载
    setTimeout(initPage, 100);

    // 图片懒加载（如果需要的话）
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // 添加一些交互效果
    const cards = document.querySelectorAll('.card, .service-item, .product-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 统计数字动画（如果有的话）
    const statNumbers = document.querySelectorAll('.stat-item h3');
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElement = entry.target;
                    const targetNumber = parseInt(statElement.textContent.replace(/[^\d]/g, ''));
                    animateNumber(statElement, 0, targetNumber, 2000);
                    statsObserver.unobserve(statElement);
                }
            });
        });

        statNumbers.forEach(stat => statsObserver.observe(stat));
    }

    function animateNumber(element, start, end, duration) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const currentNumber = Math.floor(start + (end - start) * progress);
            element.textContent = currentNumber.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // 响应式图片处理
    function handleResponsiveImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('load', function() {
                // 图片加载完成后可以添加一些效果
                this.style.opacity = '1';
            });
        });
    }

    handleResponsiveImages();

    // 添加键盘导航支持
    document.addEventListener('keydown', function(e) {
        // ESC键关闭移动端菜单
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // 添加页面可见性API支持
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // 页面不可见时的处理
            console.log('页面被隐藏');
        } else {
            // 页面重新可见时的处理
            console.log('页面重新可见');
        }
    });

    // 性能监控（开发环境）
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // 页面加载性能
        window.addEventListener('load', function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('页面加载时间:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        });

        // 内存使用情况（如果支持）
        if ('memory' in performance) {
            setInterval(() => {
                const memInfo = performance.memory;
                console.log('内存使用:', {
                    used: Math.round(memInfo.usedJSHeapSize / 1048576) + ' MB',
                    total: Math.round(memInfo.totalJSHeapSize / 1048576) + ' MB',
                    limit: Math.round(memInfo.jsHeapSizeLimit / 1048576) + ' MB'
                });
            }, 5000);
        }
    }
});

// 添加一些全局工具函数
const Utils = {
    // 防抖函数
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 节流函数
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    // 格式化电话号码
    formatPhone: function(phone) {
        const cleaned = ('' + phone).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return phone;
    },

    // 复制到剪贴板
    copyToClipboard: async function(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                return true;
            } catch (err) {
                return false;
            } finally {
                document.body.removeChild(textArea);
            }
        }
    }
};

// 导出工具函数供其他脚本使用
window.Utils = Utils;
