import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider,} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCOLk11eajpoN18F9LZOCL5VcydYOfRB4g",
    authDomain: "login-app-60305.firebaseapp.com",
    projectId: "login-app-60305",
    storageBucket: "login-app-60305.appspot.com",
    messagingSenderId: "922884165107",
    appId: "1:922884165107:web:67171f57c297900a409686",
    measurementId: "G-ZKZXL6WQW5"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
auth.languageCode = 'en';

const provider = new GoogleAuthProvider();
const googleLogin = $(".login-gg-btn");

function infoalert(title, text, icon, isreload) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon
    }).then((result) => {
        if (result.isConfirmed && isreload) {
            window.location.reload();
        }
    });
}
        

googleLogin.click(function(){
  signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    $.ajax({
            type: 'POST',
            url: '/handleSignupSocial',
            contentType: 'application/json',
            data: JSON.stringify({
              username: user.displayName,
              email:user.email,
              avatar: user.photoURL,

            }),
            success: function (response) {
              if(response.code === 200)
              {
                infoalert('Đăng Nhập thành công!', '', 'success', true);
              }else{
                infoalert('Lỗi!', response.error, 'error', false);
              }
            },
            error: function (xhr) {
              const response = JSON.parse(xhr.responseText);
              infoalert('Lỗi', response.error || 'Đã xảy ra lỗi, vui lòng thử lại.', 'error', false);
            }
    });
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
})