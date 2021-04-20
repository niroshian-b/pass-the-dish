import { createGlobalStyle } from 'styled-components';
import './fonts.css';

export default createGlobalStyle`
:root {
      --primary-color: #A11212;
      --secondary-color: #fff;
      --heading-font: 'Alegreya Sans SC', sans-serif;
      --max-width: 1200px;
      --page-padding: 20px;
    }
html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  body{
    scroll-behavior: smooth;
    position:relative; //to fix sticky header and footer positions 
  }

/* GLOBAL STYLES */
*,
*:before,
*:after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, button, label{
	font-family: var(--heading-font);
}

h1,
h2 {
  color: var(--primary-color);
  font-weight: 700;
}

h1 {
  border-bottom: 1px solid var(--primary-color);
  font-size: 2rem;
  padding-bottom: 0.75em;
}

h2 {
  font-size: 1.25rem;
  margin-bottom: 10px;
}


`;
