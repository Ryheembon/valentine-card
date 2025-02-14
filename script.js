document.addEventListener('DOMContentLoaded', () => {
    const messages = [
        "My heart beats for you, April ❤️",
        "Ryheem & April Forever 💑",
        "Forever yours, my love 💘",
        "Our love story continues 💝"
    ];
    
    const typingText = document.querySelector('.typing-text');
    let currentMessageIndex = 0;
    
    // Typing animation
    function typeMessage(message, index = 0) {
        if (index < message.length) {
            typingText.textContent += message.charAt(index);
            setTimeout(() => typeMessage(message, index + 1), 100);
        } else {
            setTimeout(() => {
                typingText.textContent = '';
                currentMessageIndex = (currentMessageIndex + 1) % messages.length;
                typeMessage(messages[currentMessageIndex]);
            }, 2000);
        }
    }
    
    typeMessage(messages[0]);
    
    // Create floating hearts
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        document.querySelector('.floating-hearts').appendChild(heart);
        
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
    
    // Create floating flowers
    function createFloatingFlower() {
        const flowers = ['🌸', '🌺', '🌹', '🌷', '🌼', '💐', '🌻'];
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.left = Math.random() * 100 + 'vw';
        document.querySelector('.floating-hearts').appendChild(flower);
        
        flower.addEventListener('animationend', () => {
            flower.remove();
        });
    }
    
    // Generate both hearts and flowers periodically
    setInterval(() => {
        createFloatingHeart();
        createFloatingFlower();
    }, 500);
    
    // Button click effect
    const loveButton = document.querySelector('.love-button');
    loveButton.addEventListener('click', () => {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createFloatingHeart();
                createFloatingFlower();
            }, i * 100);
        }
    });

    // Create flower borders
    const createFlowerBorder = () => {
        const topBorder = document.createElement('div');
        topBorder.className = 'flower-border';
        const bottomBorder = document.createElement('div');
        bottomBorder.className = 'flower-border-bottom';
        
        for (let i = 0; i < 8; i++) {
            const topFlower = document.createElement('span');
            topFlower.textContent = '🌸';
            topBorder.appendChild(topFlower);
            
            const bottomFlower = document.createElement('span');
            bottomFlower.textContent = '🌺';
            bottomBorder.appendChild(bottomFlower);
        }
        
        document.body.appendChild(topBorder);
        document.body.appendChild(bottomBorder);
    };

    createFlowerBorder();

    // Add poem translation functionality
    const poem = document.getElementById('poem');
    const translateBtn = document.getElementById('translateBtn');
    let isItalian = true;

    const poemText = {
        italian: `Ti amo non solo per quello che sei,<br>
                 Ma per quello che sono io quando sto con te.<br>
                 Sei la mia dolce metà, il mio cuore,<br>
                 Il mio amore eterno, la mia vita, il mio tesoro.`,
        english: `I love you not only for what you are,<br>
                 But for what I am when I'm with you.<br>
                 You're my sweet half, my heart,<br>
                 My eternal love, my life, my treasure.`
    };

    translateBtn.addEventListener('click', () => {
        poem.classList.add('fade');
        
        setTimeout(() => {
            if (isItalian) {
                poem.innerHTML = poemText.english;
                translateBtn.textContent = 'Translate to Italian ❤️';
            } else {
                poem.innerHTML = poemText.italian;
                translateBtn.textContent = 'Translate to English ❤️';
            }
            isItalian = !isItalian;
            poem.classList.remove('fade');
        }, 500);
    });

    // Add hover effect to photo
    const photo = document.querySelector('.couple-photo');
    photo.addEventListener('mouseover', () => {
        createFloatingHeart();
        createFloatingFlower();
    });

    // Add keyboard interaction
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createFloatingHeart();
                    createFloatingFlower();
                }, i * 100);
            }
        }
    });

    // Create background elements
    function createBackgroundElements() {
        // Create clouds
        const cloudTypes = ['☁️', '⛅'];
        for (let i = 0; i < 5; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud';
            cloud.textContent = cloudTypes[Math.floor(Math.random() * cloudTypes.length)];
            cloud.style.top = `${Math.random() * 40}%`;
            cloud.style.animationDelay = `${Math.random() * 20}s`;
            document.body.appendChild(cloud);
        }

        // Create birds
        const birds = ['🕊️', '🦅'];
        setInterval(() => {
            const bird = document.createElement('div');
            bird.className = 'bird';
            bird.textContent = birds[Math.floor(Math.random() * birds.length)];
            bird.style.top = `${Math.random() * 50}%`;
            document.body.appendChild(bird);
            
            // Remove bird after animation
            setTimeout(() => bird.remove(), 15000);
        }, 3000);
    }

    createBackgroundElements();

    // Make container slightly transparent
    document.querySelector('.container').style.background = 'rgba(255, 255, 255, 0.3)';

    // Handle touch events for mobile
    photo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        createFloatingHeart();
        createFloatingFlower();
    });

    // Prevent zoom on double tap
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    // Check if device is mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        // Reduce animation frequency on mobile
        const animationInterval = setInterval(() => {
            createFloatingHeart();
            createFloatingFlower();
        }, 1000);  // Slower interval for mobile
        
        // Cleanup on page hide
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(animationInterval);
            }
        });
    }
}); 