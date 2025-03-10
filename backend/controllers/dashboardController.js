function index (req, res){
    const user = res.locals.currentUser;
   
    // console.log(user);
    res.render('dashboard/index',{title : "Dashboard"});
    // res.render('layouts/main',{title:"Hello World"});
}

module.exports = {
    index
}