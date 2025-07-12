import { useState, useEffect } from 'react';
import { Button, CalendarPicker, Space, SafeArea, NavBar, Card, Grid } from 'antd-mobile';
import { LeftOutline, CalendarOutline, GlobalOutline } from 'antd-mobile-icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './index.scss';

export default function Playground() {
  const [targetDate, setTargetDate] = useState(new Date('2025-02-12'));
  const [daysSince, setDaysSince] = useState(0);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const supportedLanguages = ['en', 'zh-CN'];
  
  const getLanguageLabel = (lang) => {
    return lang === 'en' ? 'EN' : '中';
  };

  const toggleLanguage = () => {
    const currentIndex = supportedLanguages.indexOf(i18n.language);
    const nextIndex = (currentIndex + 1) % supportedLanguages.length;
    i18n.changeLanguage(supportedLanguages[nextIndex]);
  };

  const calculateDaysSince = (date) => {
    const target = new Date(date);
    const today = new Date();
    const timeDiff = today.getTime() - target.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  useEffect(() => {
    const days = calculateDaysSince(targetDate);
    setDaysSince(days);
  }, [targetDate]);

  const handleDateSelect = (date) => {
    setTargetDate(date);
    setCalendarVisible(false);
  };

  const formatNumber = (num) => {
    return Math.abs(num).toLocaleString();
  };

  const getTimeDescription = () => {
    if (daysSince > 0) {
      return t('playground.daysPassed');
    } else if (daysSince < 0) {
      return t('playground.daysUntil');
    } else {
      return t('playground.todayIsTheDay');
    }
  };

  const getLocalizedDateFormat = () => {
    return i18n.language === 'zh-CN' ? 'zh-CN' : 'en-US';
  };

  return (
    <div className="playground-page">
      <SafeArea position="top" />
      
      <NavBar
        back={t('playground.back')}
        onBack={() => navigate('/')}
        backIcon={<LeftOutline />}
        right={
          <Button
            size="small"
            fill="none"
            onClick={toggleLanguage}
            style={{ 
              minWidth: '40px',
              height: '32px',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            <GlobalOutline style={{ marginRight: '4px' }} />
            {getLanguageLabel(i18n.language)}
          </Button>
        }
      >
        {t('playground.title')}
      </NavBar>

      <div className="content-container">
        <Space direction="vertical" block style={{ padding: '16px' }}>
          <Card className="result-card">
            <div className="result-content">
              <div className="number-display">
                {formatNumber(daysSince)}
              </div>
              <div className="description">
                {getTimeDescription()}
              </div>
              <div className="target-date">
                {targetDate.toLocaleDateString(getLocalizedDateFormat(), {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </Card>

          <Card title={t('playground.selectDate')} className="date-card">
            <Button
              block
              size="large"
              color="primary"
              onClick={() => setCalendarVisible(true)}
            >
              <CalendarOutline style={{ marginRight: '8px' }} />
              {t('playground.chooseDate')}
            </Button>
          </Card>

          <CalendarPicker
            visible={calendarVisible}
            onClose={() => setCalendarVisible(false)}
            onConfirm={handleDateSelect}
            defaultValue={targetDate}
            title={t('playground.selectTargetDate')}
          />
        </Space>
      </div>

      <SafeArea position="bottom" />
    </div>
  );
}