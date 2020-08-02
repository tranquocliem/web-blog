const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, //yeu cau vi bat buoc vi nguoi dung phai co ten nguoi dung
    min: 3,
    max: 25,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin"], //vai tro phai dc chon trc va khong the muon nhap gi nhap nen dung enum chi chon dc cac gia tri trong nay
    required: true,
  },
  //luu todos vao nguoi dung
  //todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog"}],
});

//chung ta phai ma hoa mat khau truoc luc luu vao CSDL
//tham so next co nghia rang ban co the di tiep
UserSchema.pre("save", function (next) {
  //kiem tra xem mat khau da ma hoa chua vi chi ma hoa nhung mat khau don gian

  //da duoc ma hoa roi
  if (!this.isModified("password")) return next();
  //chua duoc ma hoa
  //moi tao mat khau hoac doi mat khau moi
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    //ma hoa bi loi
    if (err) return next(err);
    //ghi de mat khau cu bang mat khau da ma hoa
    this.password = passwordHash;
    next();
  });
});
//sau khi da co mat khau ma hoa ta can so sanh 2 mat khau cua nguoi dung nhap va mat khau cua CSDL luu(da bi ma hoa)
//function(password,cd) = no se lay mat khau nguoi dung nhap va goi lai cb(callback)
//lay mat khau tu nguoi dung nhap,cb goi lai neu co dieu gi xay ra
UserSchema.methods.comparePassword = function (password, cb) {
  //so sanh mat khau tu nguoi dung nhap voi mat khau bam trong CSDL
  //se tra ra loi gi do tu CSDL hoc tim thay va ko tim thay mat khau
  bcrypt.compare(password, this.password, (err, isMatch) => {
    //loi gi do tu CSDL
    if (err) return cb(err);
    //khong co loi gi tu CSDL
    else {
      //cb tra ra khong co loi(null) va khong khop voi mat khau trong csdl
      if (!isMatch) return cb(null, isMatch);
      //nguoc lai
      return cb(null, this);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);
