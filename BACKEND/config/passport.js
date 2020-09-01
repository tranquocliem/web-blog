//passport nay la pham mem trung gian xac thuc User
//passport-local la tai khoan tu tao nhu o day user va mat khau co the su dung passport-facebook.....
const passport = require("passport");
const LocalStratery = require("passport-local").Strategy;
const JwtStratery = require("passport-jwt").Strategy;
const User = require("../models/User");
const { use } = require("../routers/User");

const cookieExtractor = (req) => {
  let token = null;
  //neu doi tuong yeu o do va yeu cau cookie cua chung ta khong trong
  //chung ta kiem tra xem co ma thong bao jwt o do khong
  if (req && req.cookies) {
    token = req.cookies["access_token"];//yeu cau se duoc gui len cai token co ten nay
  }
  //cuoi cung la tra ra token
  return token;
};

/*
    -khi dang nhap su dung ten nguoi dung va mat khau khi duoc xac thuc(LocalStratery) chung ta se thiet lap 1 cookie
    tren trinh duyet cua nguoi dung,va cookie nay se la ma thong bao jwt
    -ta co the su dung JwtStratery nay de xac thuc nguoi dung bang ma token va _id cua nguoi dung do
    nen ko can su dung so sanh 2 mat khau trong LocalStratery nua
*/
//phan mem trung gian duoi day dung de uy quyen nen no se dc su dung o bat cu dau muon bao ve tai nguyen
//co the dung de phan biet dc tai khoan user hoac admin
//authorization
passport.use(
  new JwtStratery(
    {
      //yeu cau goi trinh xuat cooki
      //cookieExtractor day la chuc nang tuy trinh dang cung cap de trich xuat ma thong bao tu jwt
      jwtFromRequest: cookieExtractor,
      //khoa ma ban dung de dang nhap ma thong bao de duoc goi la bi mat hoac khoa va se thiet lap de ma hoa
      //su dung de xac minh ma thong bao nay la hop phap (nen ta can tao ra cookieExtractor(chuc nang trich xuat cookie))
      //trong jwt can co mot cai goi key de ko jwt dc bao mat hon
      secretOrKey: "QuocLiem",
    },
    //nhan lai dc payload va chuc nang hoan thanh
    (payload, done) => {
      //kiem tra nguoi dung co ton tai hay ko
      //tim bang ID
      User.findById({ _id: payload.sub }, (err, user) => {
        //co loi va khong co nguoi dung nao co khoa chinh(_id) do
        if (err) return done(err, false);
        //ko loi co nguoi dung co khoa chinh(_id) do
        if (user) return done(null, user);
        //ko co loi nhung ko co nguoi dung nao co khoa chinh(_id) do
        else return done(null, false);
      });
    }
  )
);

//phan mem trung duoi day dung de xac thuc nguoi dung bang username va password chi su dung khi chung ta dang nhap co ban
//username,password nhan tu nguoi dung
//done mot chuc nang dc goi khi chung ta thanh cong
//authentication su dung username va password
passport.use(
  new LocalStratery((username, password, done) => {
    //tim username nay co ton tai
    //xong ta se nhan lai dc 1 loi gi do duoi CSDL hoac se nhan duoc user ton tai hoac khong
    User.findOne({ username }, (err, user) => {
      //loi gi do tu CSDL
      if (err) return done(err);
      //user khong ton tai
      //done se tra ra null la khong co loi,nhung user false tuc user nay khong ton tai duoi CSDL
      if (!user) return done(null, false);
      //tim thay duoc username
      //va so sanh mat khau
      //kiem tra mat khau co dung khong
      //nen can chuyen vao mat khau va 1 ham tra ra khi hoan thanh 1 chuc nang
      user.comparePassword(password, done);
    });
  })
);

//khi nguoi dung da dang nhap, trong moi yeu cau tiep theo se bao gom ma thong bao jwt
//de xac dinh ro duoc nguoi dung nao gui, va ma co thoi gian hieu luc nen khi het thoi gian hieu luc can dang nhap lai