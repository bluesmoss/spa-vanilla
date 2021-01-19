import Header from '../templates/Header';
import Home from '../pages/Home';
import Character from '../pages/Character';
import Error404 from '../pages/Error404';
import getHash from '../utils/getHash';
import resolveRoutes from '../utils/resolveRoutes';


const routes = {
    '/' : Home,
    '/:id' : Character,
    '/contact' : 'Contact',
}


const router = async () => {
    const header = null || document.getElementById('header');
    const content = null || document.getElementById('content');


    header.innerHTML = await Header();
    let hash = getHash();
    let route = await resolveRoutes(hash);
    let render = routes[route] ? routes[route] : Error404;

    content.innerHTML= await render();
    mobile();

}

const mobile = () => {
    let hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
        hasTouchScreen = navigator['msMaxTouchPoints'] > 0;
    } else {
        let mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") {
            hasTouchScreen = !!mQ.matches;
        } else if ('orientation' in window) {
            hasTouchScreen = true; // deprecated, but good fallback
        }
    }
    
    console.log("hasTouchScreen", hasTouchScreen);

    let mob = /Mobi/i.test(window.navigator.userAgent);

    console.log("useragent", mob);

    alert("isTouch: " + hasTouchScreen + " Es mobile: " + mob);
}

export default router;

