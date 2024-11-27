const menu = document.querySelector('.nav-list');
let aboutdiv = document.getElementById('about')
let skillsdiv = document.getElementById('skills')
let projectsdiv = document.getElementById('projects')
let contactdiv = document.getElementById('contact')
let aboutheader = document.getElementById('aboutheader')
let skillsheader = document.getElementById('skillsheader')
let projectsheader = document.getElementById('projectsheader')
let contactheader = document.getElementById('contactheader')
let menuBtn = document.querySelector('.menu-btn')
let ball = document.querySelector('.ball')
let lis = document.querySelectorAll('li')
const header = document.querySelector('.header');
let divProgress = document.querySelector('.progresses')
const buttons = document.querySelectorAll('button');
const links = document.querySelectorAll('a');
let progressPercent = document.querySelectorAll('.progressPercent');
let progressWay = document.querySelectorAll('.progress');

const scrollValue = 200;

// Ball On Mouse Move
window.addEventListener('mousemove', function(e) {
    ball.style.opacity = '1'
    let mousex = e.clientX
    let mousey = e.clientY

    ball.style.transform = `translate(${mousex - 25}px ,${mousey - 25}px)`
})

// Hide Mobile Menu When Item Clicked
lis.forEach(element => {
    element.addEventListener('click',function(){
        menu.classList.remove('active')
    })
});

menuBtn.addEventListener('click', function () {
    menu.classList.toggle('active');
});

// Scale Ball
function addHoverEffect(elements) {
    elements.forEach(element => {
        element.addEventListener('mouseover', () => {
            ball.style.width = '80px';
            ball.style.height = '80px';
        });
        element.addEventListener('mouseout', () => {
            ball.style.width = '50px';
            ball.style.height = '50px';
        });
    });
}
addHoverEffect(buttons);
addHoverEffect(links);

// header Scroll Effects
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    if (scrollTop > scrollValue) {
        header.style.backgroundColor = 'black'
        header.style.height = '60px'
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.25)'
        header.style.height = '90px'
    }

    const rect = aboutdiv.getBoundingClientRect();
    
    if (rect.top <= 100 && rect.bottom >= 100) {
        aboutheader.classList.add('headactive');
    } else {
        aboutheader.classList.remove('headactive');
    }

    const rect2 = skillsdiv.getBoundingClientRect();
    
    if (rect2.top <= 200 && rect2.bottom >= 200) {
        skillsheader.classList.add('headactive');
    } else {
        skillsheader.classList.remove('headactive');
    }

    const rect3 = projectsdiv.getBoundingClientRect();
    
    if (rect3.top <= 200 && rect3.bottom >= 100) {
        projectsheader.classList.add('headactive');
    } else {
        projectsheader.classList.remove('headactive');
    }

    const rect4 = contactdiv.getBoundingClientRect();

    if (rect4.top <= 100 && rect4.bottom >= 100) {
        contactheader.classList.add('headactive');
    } else {
        contactheader.classList.remove('headactive');
    }
});

// progress Div Move
const onElementVisible = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target)
            let progressValues = []
            progressPercent.forEach(element => {
                element = element.textContent.replace('%', '')
                progressValues.push(element)
            })
            updateWidth(progressValues); 
        }
    });
};

function updateWidth(progressValues) {
    let count = 0;
    const interv = setInterval(() => {
        progressWay.forEach((way, index) => {
            way.style.width = progressValues[index] + '%';
            progressPercent[index].textContent = `${count}%`
            if (count >= progressValues[index]) {
                progressPercent[index].textContent = progressValues[index] + '%'
            }
        });

        if (count >= 100) {
            clearInterval(interv);
        } else {
            count++;
        }
    }, 20); 
}

const observer = new IntersectionObserver(onElementVisible, {
    root: null,
    rootMargin: "0px",
    threshold: 0.4,
});

observer.observe(divProgress);

