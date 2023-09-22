const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'F:/Phermacy App/New folder/pharmecy-app-react/client/src/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const fileext = file.originalname.split('.').pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + '.' + fileext);
  },
});



module.exports =  storage ;