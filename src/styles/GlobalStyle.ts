import { createGlobalStyle } from 'styled-components';
import SpoqaHanSansNeo from '../assets/font/SpoqaHanSansNeo-Regular.ttf';

export const GlobalStyles = createGlobalStyle`
    :root {
        --primary-color: #81D8D0;
        --secondary-orange-color: #FF9116;
        --secondary-purple-color: #8699FF;

        --white-background-color: #f8f8f8;

		--gray-light-01 : #D9D9D9;
        --gray-light : #BEBEBE;
        --gray-color: #ABABAB;
        --gray-dark : #868686;

        --black-color : #0F0F0F;
        
        --font-size-title: 4rem;
        --font-size-large: 2.8rem;
        --font-size-medium: 2.2rem;
        --font-size-small: 2rem;
        --font-size-primary: 1.6rem;
    }

    @font-face{
        font-family: 'SpoqaHanSansNeo';
        src: local('SpoqaHanSansNeo'), local('SpoqaHanSansNeo'),
        font-style:normal;
        src: url(${SpoqaHanSansNeo}) format('truetype');
    }

     html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		box-sizing: border-box;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	html {
        font-size: 62.5%;
		font-family: 'SpoqaHanSansNeo';
		overflow-x: hidden;
	}

	button {
		font-family: 'SpoqaHanSansNeo';
	}
	img {
		width: 100%;
		height: 100%;
	}
	a {
		text-decoration: none;
		color: inherit;
	}
`;
