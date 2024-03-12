import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

import AppLayout from '../layouts/AppLayout';

import HomePage from '../views/common/HomePage';
import Base64EncodePage from '../views/Base64EncodePage';
import Base64DecodePage from '../views/Base64DecodePage';
import Md5GeneratorPage from '../views/Md5GeneratorPage';
import TranslitUrlPage from '../views/TranslitUrlPage';
import CaseConverterPage from '../views/CaseConverterPage';
import NoMatch from '../views/common/NoMatch';
import WordCounterPage from '../views/WordCounterPage';
import UnixtimestampPage from '../views/UnixtimestampPage';
import UuidPage from '../views/UuidPage';
import JsonStringifyTextPage from '../views/JsonStringifyTextPage';

const PrivacyPolicyPage = lazy(() => import('../views/common/PrivacyPolicyPage'));

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
    path: 'md5-generator',
    element: <Md5GeneratorPage />,
    id: 'md5-generator',
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
   { path: '*', element: <NoMatch /> },
  ],
 },
]);

export default routes;
