module.exports = function (app) {
  app.get('/', function (req, res) {//可
    res.render("index");
  });
  app.get('/coupon', function (req, res) {
    res.render("coupon");
  });
  app.get('/chess', function (req, res) {// 
    res.render("chess");
  });
  app.get('/slotmachine', function (req, res) {
    res.render("slotMachine");
  });
  app.get('/lottery', function (req, res) {//
    res.render("lottery");
  });
  app.get('/entertainment', function (req, res) {
    res.render("entertainment");
  });
  app.get('/transactionrecord', function (req, res) {//
    res.render("transactionRecord");
  });
  app.get('/accountsettings', function (req, res) {
    res.render("accountSettings");
  });
  app.get('/transfer', function (req, res) {
    res.render("transfer");
  });
  app.get('/personalcenter', function (req, res) {
    res.render("personalCenter");
  });
  app.get('/reflect', function (req, res) {
    res.render("reflect");
  });
  app.get('/login', function (req, res) {//
    res.render("login");
  });
  app.get('/successregistration', function (req, res) {//
    res.render("successRegistration");
  });
  app.get('/recharge', function (req, res) {//
    res.render("recharge");
  });
  app.get('/per_betting', function (req, res) {//
    res.render("per_betting");
  });
  app.get('/per_message', function (req, res) {//
    res.render("per_message");
  });
  app.get('/promo', function (req, res) {//
    res.render("promo");
  });
  app.get('/sports', function (req, res) {//
    res.render("sports");
  });
  app.get('/help/deposit', function (req, res) {//
    res.render("help/deposit");
  });
  app.get('/help/withdrawal', function (req, res) {//
    res.render("help/withdrawal");
  });
  app.get('/help/transfer', function (req, res) {//
    res.render("help/transfer");
  });
  app.get('/help/security', function (req, res) {//
    res.render("help/security");
  });
  app.get('/help/browser', function (req, res) {//
    res.render("help/browser");
  });
  app.get('/help/standby', function (req, res) {//
    res.render("help/standby");
  });
  app.get('/help/sportrule', function (req, res) {//
    res.render("help/sportrule");
  });
  app.get('/help/handicap', function (req, res) {//
    res.render("help/handicap");
  });
  app.get('/help/wap', function (req, res) {//
    res.render("help/wap");
  });
  app.get('/help/kenointro', function (req, res) {//
    res.render("help/kenointro");
  });
  app.get('/help/kenorule', function (req, res) {//
    res.render("help/kenorule");
  });
  app.get('/help/kenoaq', function (req, res) {//
    res.render("help/kenoaq");
  });
  app.get('/help/agent', function (req, res) {//
    res.render("help/agent");
  });
  app.get('/help/contactus', function (req, res) {//
    res.render("help/contactus");
  });
  app.get('/help/surport', function (req, res) {//
    res.render("help/surport");
  });
  app.get('/help/poloshirt', function (req, res) {//
    res.render("help/poloshirt");
  });
  app.get('/help/banner', function (req, res) {//
    res.render("help/banner");
  });
  app.get('/help/odds', function (req, res) {//
    res.render("help/odds");
  });
  app.get('/help/about', function (req, res) {//
    res.render("help/about");
  });
  app.get('/help/duty', function (req, res) {//
    res.render("help/duty");
  });
  app.get('/help/conditions', function (req, res) {//
    res.render("help/conditions");
  });
  app.get('/help/privacy', function (req, res) {//
    res.render("help/privacy");
  });
  app.get('/help/partner', function (req, res) {//
    res.render("help/partner");
  });
  app.get('/help/index', function (req, res) {//
    res.render("help/index");
  });
 

};
