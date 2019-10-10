import { useRef, useEffect } from 'react';
import {
  Button, List, WingBlank, InputItem,
  Flex, WhiteSpace
} from 'antd-mobile';
import { useHistory } from 'react-router-dom';

import './index.scss';

export default function Chatbox({ messages, onSend, status, user }) {
  const inputRef = useRef();
  const messagesBoxRef = useRef();
  const history = useHistory();

  useEffect(() => {
    const node = messagesBoxRef.current;
    node.scrollTop = node.scrollHeight - node.clientHeight;
  });

  const send = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(inputRef.current);

    // inputRef.current is an antd InputItem instance
    const message = inputRef.current.state.value;

    // easter egg, konami code
    if (message === 'Curio') {
      inputRef.current.clearInput();
      history.push('/about');
      return;
    }

    if (!message) {
      inputRef.current.focus();
    } else {
      onSend(message);
      inputRef.current.clearInput();
    }
  };

  return (
    <div>
      <WingBlank>
        <div ref={messagesBoxRef} className="hz-messages-box">
          <ul>
            {
              messages.map((m) => (
                <li key={m.id}>
                  {
                    m.owner_id === user.id
                      ? <i className="me-message"><u>me</u></i>
                      : <i><u>{m.owner_name}</u></i>
                  }
                  : {m.value}
                </li>
              ))
            }
          </ul>
        </div>
        <div className="status-box">
          <div>
            channel:
            <span className={`status-text ${status.channelStatus === 'on' ? 'good-status' : ''}`}>{status.channelStatus}</span>
          </div>
          <div>
            server:
            <span className={`status-text ${status.serverStatus === 'on' ? 'good-status' : ''}`}>{status.serverStatus}</span>
          </div>
        </div>
      </WingBlank>
      <WhiteSpace />
      <WingBlank>
        <List>
          <InputItem ref={inputRef} placeholder="say something lovely...">Me:</InputItem>
          <List.Item>
            <Flex justify="center">
              {/* use `am-button-borderfix`. because Multiple buttons inline arranged, the last one border-right may not display */}
              <Button icon="check-circle-o" inline size="small" onClick={send} className="am-button-borderfix">send</Button>
            </Flex>
          </List.Item>
        </List>
      </WingBlank>
    </div>
  );
}

Chatbox.propTypes = {
  messages: PropTypes.array.isRequired,
  onSend: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
