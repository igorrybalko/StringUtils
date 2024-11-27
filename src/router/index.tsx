import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

import AppLayout from '../layouts/AppLayout';

import HomePage from '../views/common/HomePage';
import Base64EncodePage from '../views/base64/Base64EncodePage';
import Base64DecodePage from '../views/base64/Base64DecodePage';
import ImgToBase64Page from '../views/base64/ImgToBase64Page';

const TranslitUrlPage = lazy(() => import('../views/TranslitUrlPage'));
const UrlEncodePage = lazy(() => import('../views/string/UrlEncodePage'));

import CaseConverterPage from '../views/CaseConverterPage';
import WordCounterPage from '../views/WordCounterPage';
import UnixtimestampPage from '../views/UnixtimestampPage';
import UuidPage from '../views/hash/UuidPage';
import JsonStringifyTextPage from '../views/JsonStringifyTextPage';

import Md5GeneratorPage from '../views/hash/Md5GeneratorPage';
const Sha256Page = lazy(() => import('../views/hash/Sha256Page'));

const NoMatch = lazy(() => import('../views/common/NoMatch'));
const PrivacyPolicyPage = lazy(() => import('../views/common/PrivacyPolicyPage'));
const DonatePage = lazy(() => import('../views/common/DonatePage'));

const FormatterHtmlPage = lazy(() => import('../views/formatter/FormatterHtmlPage'));
const MinifyCssPage = lazy(() => import('../views/formatter/MinifyCssPage'));
const BeautifyJsPage = lazy(() => import('../views/formatter/BeautifyJsPage'));
const FormatterCssPage = lazy(() => import('../views/formatter/FormatterCssPage'));
const MinifyJsonPage = lazy(() => import('../views/formatter/MinifyJsonPage'));


const routes = createBrowserRouter([
 {
  path: '/',
  element: <AppLayout />,
  children: [
   { index: true, element: <HomePage />, id: 'home' },
   {
    path: 'base64-encode',
    element: <Base64EncodePage />,
    id: 'base64-encode',
   },
   {
    path: 'base64-decode',
    element: <Base64DecodePage />,
    id: 'base64-decode',
   },
   {
    path: 'img-to-base64',
    element: <ImgToBase64Page />,
    id: 'img-to-base64',
   },
   {
    path: 'md5-generator',
    element: <Md5GeneratorPage />,
    id: 'md5-generator',
   },
   {
    path: 'sha-256',
    element: <Sha256Page />,
    id: 'sha-256',
   },
   {
    path: 'translit-url',
    element: <TranslitUrlPage />,
    id: 'translit-url',
   },
   {
    path: 'case-converter',
    element: <CaseConverterPage />,
    id: 'case-converter',
   },
   {
    path: 'word-counter',
    element: <WordCounterPage />,
    id: 'word-counter',
   },
   {
    path: 'unixtimestamp',
    element: <UnixtimestampPage />,
    id: 'unixtimestamp',
   },
   {
    path: 'privacy-policy',
    element: <PrivacyPolicyPage />,
    id: 'privacy-policy',
   },
   {
    path: 'uuid',
    element: <UuidPage />,
    id: 'uuid',
   },
   {
    path: 'json-stringify',
    element: <JsonStringifyTextPage />,
    id: 'json-stringify',
   },
   {
    path: 'json-minify',
    element: <MinifyJsonPage />,
    id: 'json-minify',
   },
   {
    path: 'html-formatter',
    element: <FormatterHtmlPage />,
    id: 'html-formatter',
   },
   {
    path: 'minify-css',
    element: <MinifyCssPage />,
    id: 'minify-css',
   },
   {
    path: 'beautify-js',
    element: <BeautifyJsPage />,
    id: 'beautify-js',
   },
   {
    path: 'beautify-css',
    element: <FormatterCssPage />,
    id: 'beautify-css',
   },
   {
    path: 'donate',
    element: <DonatePage />,
    id: 'donate',
   },
   {
    path: 'url-encode',
    element: <UrlEncodePage />,
    id: 'url-encode',
   },
   { path: '*', element: <NoMatch /> },
  ],
 },
]);

export default routes;
