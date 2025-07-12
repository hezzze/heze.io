import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import Chatbox from './Chatbox';
import Footer from './Footer';

import VideoBg from './VideoBg';

import {
  START_CHANNEL,
  STOP_CHANNEL,
  SEND_MESSAGE
} from './constants/actionTypes';

import './App.scss';

const App = () => {
  const messages = useSelector((state) => state.messages.all);
  const user = useSelector((state) => state.messages.user);
  const status = useSelector((state) => state.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: START_CHANNEL });

    return () => {
      dispatch({ type: STOP_CHANNEL });
    };
  }, [dispatch]);

  const onSend = (message) => {
    dispatch({
      type: SEND_MESSAGE,
      payload: {
        id: uuid(),
        value: message,
        date: new Date(),
        owner_id: user.id,
        owner_name: user.name
      }
    });
  };

  return (
    <div>
      <VideoBg />
      <center><p>你好，朋友<br />What triggers your <u>Curio</u>sity today?</p></center>
      <Chatbox messages={messages} onSend={onSend} status={status} user={user} />
      <Footer />
    </div>
  );
};

export default App;
