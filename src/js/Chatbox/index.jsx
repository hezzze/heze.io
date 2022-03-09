import { useRef, useEffect } from 'react';
import {
  Button, List, WingBlank, InputItem,
  Flex, WhiteSpace
} from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

import './index.scss';

export default function Chatbox({ messages, onSend, status, user }) {
  const inputRef = useRef();
  const messagesBoxRef = useRef();
  const navigate = useNavigate();

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
      navigate('/about');
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
                    m.id === 0 ? (
                      <li className="system-message">
                        <span role="img" aria-label="error">⚠️</span>
                        &nbsp;ERR_CONNECTION_REFUSED
                      </li>
                    )
                    : m.owner_id === user.id ? <i className="me-message"><u>me</u></i>
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
        <div className="status-box">
          <div>
            # of live users:
            <span className="status-text good-status">{status.numOfUsers}</span>
          </div>
        </div>
      </WingBlank>
      <WhiteSpace />
      <WingBlank>
        <List>
          <form onSubmit={send}>
            <InputItem ref={inputRef} placeholder="say something lovely...">Me:</InputItem>
            <List.Item>
              <Flex justify="center">
                {/* use `am-button-borderfix`. because Multiple buttons inline arranged, the last one border-right may not display */}
                <Button icon="check-circle-o" inline size="small" className="am-button-borderfix" onClick={send}>send</Button>
              </Flex>
            </List.Item>
          </form>
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
