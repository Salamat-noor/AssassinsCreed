function navBarAnimation() {
    function locomotiveAnimation() {
        gsap.registerPlugin(ScrollTrigger);

        // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

        const locoScroll = new LocomotiveScroll({
            el: document.querySelector("#container"),
            smooth: true
        });
        // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
        locoScroll.on("scroll", ScrollTrigger.update);

        // tell ScrollTrigger to use these proxy methods for the "#container" element since Locomotive Scroll is hijacking things
        ScrollTrigger.scrollerProxy("#container", {
            scrollTop(value) {
                return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
            }, // we don't have to define a scrollLeft because we're only scrolling vertically.
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
            pinType: document.querySelector("#container").style.transform ? "transform" : "fixed"
        });


        // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

        // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
        ScrollTrigger.refresh();

    };
    locomotiveAnimation();

    gsap.from('#left-logo #img2', {
        opacity: 0,
        scrollTrigger: {
            trigger: '#page1',
            scroller: '#container',
            start: 'top 0',
            end: 'top -5%',
            scrub: true
        }
    });

    gsap.to('#left-logo img', {
        transform: 'translateY(-100%)',
        scrollTrigger: {
            opacity: 1,
            trigger: '#page1',
            scroller: '#container',
            start: 'top 0',
            end: 'top -5%',
            scrub: true
        }
    });

    gsap.to('#right-links a', {
        transform: 'translateY(-100%)',
        opacity: 0,
        scrollTrigger: {
            trigger: '#page1',
            scroller: '#container',
            start: 'top 0',
            end: 'top -5%',
            scrub: true
        }
    });

}
navBarAnimation();
function videoContainerAnimation() {
    let videoContainer = document.querySelector('#video-container');
    let playbtn = document.querySelector('#play');
    videoContainer.addEventListener('mouseenter', function () {
        gsap.to(playbtn, {
            opacity: 1,
            scale: 1
        });
    });
    videoContainer.addEventListener('mouseout', () => {
        gsap.to(playbtn, {
            opacity: 0,
            scale: 0
        });
    });
};
videoContainerAnimation();

function page1Animation() {
    gsap.from('#page1 #Ph1', {
        y: 100,
        opacity: 0,
        delay: .5,
        duration: 1,
        stagger: .5
    });
    gsap.from('#page1 #Ph2', {
        y: 150,
        opacity: 0,
        delay: 1,
        duration: 1,
        stagger: .5
    });
    gsap.from('#video-container', {
        scale: .5,
        opacity: 0,
        delay: 1.5,
        duration: 1,
        stagger: .5
    });
};
page1Animation();

function cursorAnimation() {
    document.addEventListener('mousemove', (dets) => {
        gsap.to('#cursor', {
            left: dets.x - -5,
            top: dets.y - -10
        })
    });

    document.querySelectorAll('.child').forEach((elem) => {
        elem.addEventListener('mouseenter', () => {
            gsap.to('#cursor', {
                transform: 'translate(-50%,-50%) scale(1)'
            })
        });
        elem.addEventListener('mouseleave', () => {
            gsap.to('#cursor', {
                transform: 'translate(-50%,-50%) scale(0)'
            })
        });
    })
};
cursorAnimation();



// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#container'),
//     smooth: true
// });
