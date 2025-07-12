import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      playground: {
        title: 'Days Since Calculator',
        back: 'Back',
        daysPassed: 'days have passed since',
        daysUntil: 'days until',
        todayIsTheDay: 'Today is the day!',
        selectDate: 'Select Date',
        chooseDate: 'Choose Date',
        selectTargetDate: 'Select Target Date'
      }
    }
  },
  'zh-CN': {
    translation: {
      playground: {
        title: '❤️天数计算器',
        back: '返回',
        daysPassed: '天已过去',
        daysUntil: '天后到达',
        todayIsTheDay: '今天就是这一天！',
        selectDate: '选择日期',
        chooseDate: '选择日期',
        selectTargetDate: '选择目标日期'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh-CN', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;