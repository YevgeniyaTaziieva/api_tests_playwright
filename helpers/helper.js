export function deleteFile(path){
    try {
      unlinkSync(path);
      console.log('File deleted');
    } catch (err) {
      console.error(err.message);
    }
  } 