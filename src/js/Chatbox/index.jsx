import { useRef, useEffect } from 'react';
import {
  Button, Input, Form, Space
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

  const onFormFinish = ({ message }) => {
    // e.preventDefault();
    console.log(message);
    console.log(inputRef.current);

    // easter egg, konami code
    if (message === 'Curio') {
      inputRef.current.clear();
      navigate('/about');
      return;
    }

    if (!message) {
      inputRef.current.focus();
    } else {
      onSend(message);
      inputRef.current.clear();
    }
  };

  return (
    <div style={{ margin: "0 15px" }}>
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
      <Form
        onFinish={onFormFinish}
        layout="horizontal"
        footer={
          (
            <Space justify="center" block>
              <Button size="small" type="submit">
                <i className="fa-regular fa-circle-check" style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                send
              </Button>
            </Space>

          )
        }
      >
        <Form.Item
          label="Me:"
          name="message"
        >
          <Input ref={inputRef} placeholder="say something lovely..." />
        </Form.Item>
      </Form>
    </div>
  );
}

Chatbox.propTypes = {
  messages: PropTypes.array.isRequired,
  onSend: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
