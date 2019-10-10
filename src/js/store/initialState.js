import uuid from 'uuid/v4';

const parts = [
  ['m2', 'mx', 'mi', 'mo'],
  ['zeta', 'jega', 'mia', 'pika'],
  ['🤖', '🤓', '🚀', '🎹', '💠', '🤪', '👻']
];

const SESSION_KEY = 'heze.io#userInfo';

const genName = () => {
  let name = '';

  for (let i = 0; i < parts.length; i++) {
    let filler;
    if (i === 0) {
      filler = '.';
    } else if (i < parts.length - 1) {
      filler = '-';
    } else {
      filler = '';
    }
    name += `${parts[i][Math.floor(Math.random() * parts[i].length)]}${filler}`;
  }
  return name;
};

let user = null;
const userJSON = sessionStorage.getItem(SESSION_KEY);
if (!userJSON) {
  user = {
    name: genName(),
    id: uuid()
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
} else {
  user = JSON.parse(userJSON);
}

export default {
  messages: {
    all: [],
    user
  }
};
