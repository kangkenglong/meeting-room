import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale/zh_CN';
import {Exception, bootstrap} from 'core-fe/src';
import App from './App.tsx';
import './index.css';
import './assets/reset-and-normalize.scss';
import React from 'react';

dayjs.locale('zh-cn');

function* handleError(error: Exception) {
  console.log(error);
}

const Entry = () => {
  return (
    <React.StrictMode>
      <ConfigProvider locale={zh_CN}>
        <App />
      </ConfigProvider>
    </React.StrictMode>
  )
}

bootstrap({
    componentType: Entry,
    rootContainer: document.getElementById('root')!,
    errorListener: {
      onError: handleError,
    },
});

// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
// );
