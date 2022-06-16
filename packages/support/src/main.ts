import GraphikBold from './../public/fonts/Graphik-Bold-Web.woff2';
import GraphikMedium from './../public/fonts/Graphik-Medium-Web.woff2';
import GraphikRegular from './../public/fonts/Graphik-Regular-Web.woff2';
import App from './components/App.svelte';

const section = document.createElement('section');
section.setAttribute('data-id', 'fs-attributes-support');

document.body.appendChild(section);

const root = section.attachShadow({ mode: 'open' });

const app = new App({
  target: root,
  props: {},
});

const styleFonts = `

  @font-face {
    font-family: 'Graphik';
    font-style: normal;
    font-weight: 400;

    src: url(${GraphikRegular}) format('woff2');
  }
  @font-face {
    font-family: 'Graphik';
    font-style: normal;
    font-weight: 500;
    src: url(${GraphikMedium}) format('woff2');
  }


  @font-face {
    font-family: 'Graphik';
    font-style: normal;
    font-weight: 700;

    src: url(${GraphikBold}) format('woff2');
  }


`;
const style = document.createElement('style');
style.setAttribute('type', 'text/css');
style.appendChild(document.createTextNode(styleFonts));
document.head.appendChild(style);

export default app;
