var getexpress=require("express");
receivedexpress=getexpress();
var getmysql=require("mysql");
// var fileuploader=require("express-fileupload");


//=====================mysql connection========================
var dbconfigurationobject={
    host:"localhost",
    user:"root",
    password:"",
    database:"taskit",
}
 
var dbref=getmysql.createConnection(dbconfigurationobject);

dbref.connect(function(err){
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("connected..");
    }
})



//===============================server connection===================
receivedexpress.listen(2023,function(){
    console.log("HEY HURRAH!!  SERVER GOT STARTED");
})
// receivedexpress.use(getexpress.static("public"));// for incuding css
receivedexpress.get("/",function(req,resp){
    var purapath=process.cwd()+"/public/index.html";
    resp.sendFile(purapath);
})

//====================================== login and signup=========================
receivedexpress.get("/signup",function(req,res){

    var dataarr=[req.query.txtEmail,req.query.txtPass];
    dbref.query("insert into users values(?,?)",dataarr,function(err,result){
        console.log(req.query.txtEmail+" "+req.query.txtPass);
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send("sign up successfully..");
        }
    })

    
})


receivedexpress.get("/login", function (req, res)  {

    dbref.query("select * from users where emailid=? and password=?", [req.query.loginNo, req.query.loginPassword], function (err, result) {
        console.log(req.query.loginNo + "  " + req.query.loginPassword);
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })

})


//=======================================tasks==================
receivedexpress.get("/sendpunch",function(req,res){

    var dataarr=[req.query.taskinput,req.query.txtEmail];
    dbref.query("insert into tasks values(?,?)",dataarr,function(err,result){
        console.log(req.query.taskinput+" " + req.query.txtEmail);
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send("done task");
        }
    })

    
})


//=======================================tasks================
receivedexpress.get("/fetchAllRecords",function(req,res){
    dbref.query("select * from tasks",function(err,result){
        if(err)
        {
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})

//=======================delete task==============================================

receivedexpress.get("/delete-task",function(req,res){
    dbref.query("delete from tasks where emailid=?",[req.query.emailid],function(err,result){
        if(err)
            res.send(err);
        else
        if(result.affectedRows==0)
        res.send("Invalid Id");
        else
            res.send("Record Deleted Successfulllllyyyyy");
})
})
