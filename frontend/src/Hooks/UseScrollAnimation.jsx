import React from 'react'
import {useEffect} from 'react'

function UseScrollAnimation() {

    useEffect(() => {
        const containers = document.querySelectorAll('.wholeLayerForAnimation');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('showTheAnimationForPost');
                    observer.unobserve(entry.target);
                }
            })
        },
        {
            threshold: 0.2
        });
        
        containers.forEach(container => observer.observe(container));
    
        return () => {
            observer.disconnect();
        }
    }, []);

 
}

export default UseScrollAnimation;