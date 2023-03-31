import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';

export const scrollAnimation = (position, target, onUpdate) => {
    const tl = gsap.timeline();

    tl.to(position, {
    x:-6.46,
    y: 1.99,
    z:-11.74,
    onUpdate
})
.to(target, {
    x:1.00,
    y: 0.5,
    z:-13.53,
    
})
}