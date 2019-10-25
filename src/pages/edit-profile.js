import Button from '../components/button.js';

// function logOut() {
//   auth
//     .signOut()
//     .then(() => {
//       window.location = '#login';
//     });
// }

function UserInfo() {
  const user = auth.currentUser;
  db.collection('users').doc(user.uid).get().then((doc) => {
    const username = `
  ${doc.data().name}
  `;
    document.querySelector('.profile-name').innerHTML = username.toUpperCase();
  });
}

function AddBio() {
  const user = auth.currentUser;
  db.collection('users').doc(user.uid).get().then((doc) => {
    const userBiography = `
    <p class="text-bio">${doc.data().biography}</p>
    `;
    document.querySelector('.user-bio').innerHTML = userBiography;
  });
}

function saveEditBio() {
  const user = auth.currentUser;
  const bioText = document.querySelector('.text-bio');
  const saveEdit = document.querySelector('.edit-textarea').value;
  bioText.innerHTML = `
  <p class='text-bio'>${saveEdit}</p>
  `;
  firebase.firestore().collection('users').doc(user.uid).update({
    biography: saveEdit,
  });
  document.querySelector('.edit-button').innerHTML = '';
}

function cancelEditBio() {
  const user = auth.currentUser;
  db.collection('users').doc(user.uid).get().then((doc) => {
    const originalText = `
        <p class='text-bio'>${doc.data().biography}</p>
    `;
    document.querySelector('.user-bio').innerHTML = originalText;
  });
}

function editBio() {
  const bioText = document.querySelector('.text-bio');
  const text = bioText.textContent;
  bioText.innerHTML = `
  <form>
    ${window.textarea.component({
    class: 'edit-textarea',
    id: 'edit-textarea',
    placeholder: 'Fale de você, seus gostos, plantas favoritas, etc. fa fa-comments',
    value: text,
  })}
  </form>
  ${window.button.component({
    id: 'btn-save',
    class: 'btn save-btn',
    onclick: profile.saveEditBio,
    title: 'Publicar',
  })}
      ${window.button.component({
    id: 'btn-cancel',
    class: 'btn cancel-btn',
    onclick: profile.cancelEditBio,
    title: 'Cancelar',
  })}
  `;
}

function CreateBio() {
  const template = `
  ${Button({
    type: 'button',
    class: 'btn btn-gray btn-post',
    id: 'btn-post',
    onclick: editBio,
    title: 'Editar biografia',
  })}
  `;
  return template;
}

export {
  UserInfo,
  AddBio,
  CreateBio,
};


// function Profile() {
//   const template = `
//   <header class='header'>
//       ${Button({
//     type: 'button',
//     class: 'btn profile-btn hide-mobile',
//     id: 'btn-profile',
//     onclick: () => window.location = '#feed',
//     title: 'Mural',
//   })}
//     <div class='header-title'>
//       <label for='toggle-side-menu'>
//         <div class='fa fa-bars hide-desktop menu-icon'></div>
//       </label>
//       <p> Horta Urbana </p>
//       <div class='header-img'>
//         <img src="./img/cenoura.png">
//       </div>
//     </div>
//     ${Button({
//     type: 'button',
//     class: 'btn logout-btn hide-mobile',
//     id: 'btn-log-out',
//     onclick: logOut,
//     title: 'Sair',
//   })}
//     <input
//       type='checkbox'
//       id='toggle-side-menu'
//       class='toggle-side-menu hide-desktop'
//     />
//     <div class='side-menu hide-desktop'>
//       ${Button({
//     type: 'button',
//     class: 'btn profile-btn',
//     id: 'btn-profile',
//     onclick: () => window.location = '#feed',
//     title: 'Mural',
//   })}
//       ${Button({
//     type: 'button',
//     class: 'btn logout-btn ',
//     id: 'btn-log-out',
//     onclick: logOut,
//     title: 'Sair',
//   })}
//     </div>
//   </header>
//   <section class='user-profile'>
//     <div class='profile-name'> 
//     ${UserInfo()} 
//     </div>
//     <section class='user-bio'>
//       ${AddBio()}
//     </section>
//     ${CreateBio()}
//     <div class="edit-button"></div>
//   </section>
// `;
//   return template;
// }

// export default Profile;

window.profile = {
  saveEditBio,
  cancelEditBio,
};