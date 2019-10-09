import Button from '../components/button.js';

function logOut() {
  auth
    .signOut()
    .then(() => {
      console.log('adeus');
    });
}

function Signout() {
  return Button({ id: 'btn-log-out', onclick: logOut, title: 'Sair' });
}

export default Signout;