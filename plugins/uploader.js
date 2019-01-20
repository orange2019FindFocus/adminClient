import Vue from 'vue'
import vUploader from 'v-uploader';

// v-uploader plugin global config
const uploaderConfig = {
  // file uploader service url
  uploadFileUrl: '/upload/admin',
  fileTypeExts: 'jpeg,jpg,gif,png,mp4,ogg',
  // file delete service url
  // deleteFileUrl: 'http://127.0.0.1:5001/upload/delete',
  // set the way to show upload message(upload fail message)
  showMessage: (vue, message) => {
    console.log(message)
    //using v-dialogs to show message
    // vue.$vDialog.alert(message, null, {
    //   messageType: 'error'
    // });
  }
};

// install plugin with options
Vue.use(vUploader, uploaderConfig);
