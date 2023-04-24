const express = require('express');
const myDB = require('mongodb');
const crypto = require('crypto');

const router = express.Router();
const dbFunctions = require('../db/dbFunctions');
const {genPassword} =require('./encryption');

const loginRedirect="/login?msg=login needed";

const path = require('path');
const uploadDir="./upload/";
const fs=require('fs');

router.get('/api/findOrderByName', async (req, res) => {
  if (!req.session.login) {
    res.redirect(loginRedirect);
    return;
  }
  try {
    const data = await dbFunctions.findOrderByName(req.session.user.username);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post('/api/findAllOrders', async (req, res) => {
  if (!req.session.ownerLogin) {
    res.redirect(loginRedirect);
    return;
  }
  // console.log(req.body);
  try {
    const data = await dbFunctions.findAllOrders(req.body);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post('/api/login', async (req, res) => {
  let data = req.body;
  try {
    let owner=await dbFunctions.findOwner(data.username);
    if(owner){
      if (owner.password == genPassword(data.password)) {
        req.session.owner = owner;
        req.session.ownerLogin = true;
        res.redirect("/owner/");
        return;
      } else {
        res.redirect("/login?msg=wrong password");
        return;
      }
    }
  
    let user = await dbFunctions.findUser(data.username);
    if (user) {
      if (user.password == genPassword(data.password)) {
        req.session.user = user;
        req.session.login = true;
        res.json(user.username);
      } else {
        res.redirect("/login?msg=wrong password");
      }
    } else {
      res.redirect("/login?msg=user not exists");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post('/api/register', async (req, res) => {
  let data = req.body;
  try {
    if (await dbFunctions.findOwner(data.username)||await dbFunctions.findUser(data.username)) {
      res.redirect("/register?msg=user already exist");
    } else {
      data.password=genPassword(data.password);
      await dbFunctions.addUser(data);
      res.redirect("/login?msg=register succeed");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post('/api/submitOrder', async (req, res) => {
  if (!req.session.login) {
    res.redirect(loginRedirect);
    return;
  }
  let data={
    username:req.session.user.username,
    time:req.body.time,data:req.body.data,
    total:req.body.total,
    delivered:req.body.delivered
  };
  try {
    data = await dbFunctions.addOrder(data);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.get('/api/logout',async (req, res) => {
  // console.log("logout\n");
  req.session.user = null;
  req.session.login = false;
  return res.json();
})

router.get('/api/ownerLogout',async (req, res) => {
  // console.log("logout\n");
  req.session.owner = null;
  req.session.ownerLogin = false;
  return res.json();
})

router.post('/api/setOrderReady',async (req, res) => {
  let data = req.body;
  if (!req.session.ownerLogin) {
    res.redirect(loginRedirect);
    return;
  }
  try {
    await dbFunctions.setOrderReady(data.id);
    res.json();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post('/api/submitOrder', async (req, res) => {
  if (!req.session.login) {
    res.redirect(loginRedirect);
    return;
  }
  let data={
    username:req.session.user.username,
    time:req.body.time,data:req.body.data,
    total:req.body.total,
    delivered:req.body.delivered
  };
  try {
    data = await dbFunctions.addOrder(data);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

router.post('/api/addToMenu',async (req, res) => {
  let data = req.body;
  if (!req.session.ownerLogin) {
    res.redirect(loginRedirect);
    return;
  }
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  const file = req.files.file;
  let startIndex = file.name.lastIndexOf(".");
  let type="";
  if(startIndex != -1){
    type=file.name.substring(startIndex, file.name.length).toLowerCase();
  }
  const newFileName=crypto.randomUUID()+type;
  const path=uploadDir+newFileName;
  file.mv(path, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
  });
  let obj={
    title:data.title,
    price:data.price,
    description:data.description,
    filename:newFileName
  }
  try {
    res.json(await dbFunctions.addToMenu(obj));
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})
router.get('/api/checkOwner',async (req, res) =>{
  if (!req.session.ownerLogin) {
    res.redirect(loginRedirect);
    return res.json();
  }
  return res.json();
})

router.get('/api/getMenu',async (req, res) =>{
  try {
    res.json(await dbFunctions.getMenu());
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

router.post('/api/deleteFromMenu',async (req, res) => {
  let data = req.body;
  if (!req.session.ownerLogin) {
    res.redirect(loginRedirect);
    return;
  }
  try {
    let path=uploadDir+data.filename;
    let result=await dbFunctions.deleteFromMenu(data.id)
    if (fs.existsSync(path)) {
      fs.unlink(path,(err => {
        if (err){console.log(err)} 
        else {
          console.log("\nDeleted file: "+path);
        }
      }));
    }
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

router.post('/api/editMenu',async (req, res) => {
  let data = req.body;
  if (!req.session.ownerLogin) {
    res.redirect(loginRedirect);
    return;
  }
  try {
    let obj={};
    if (req.files) {
      const file = req.files.file;
      let startIndex = file.name.lastIndexOf(".");
      let type="";
      if(startIndex != -1){
        type=file.name.substring(startIndex, file.name.length).toLowerCase();
      }
      const newFileName=crypto.randomUUID()+type;
      obj.filename=newFileName;
      const path=uploadDir+newFileName;
      file.mv(path, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
      });
      let oldPath=uploadDir+data.preFilename;
      if (fs.existsSync(oldPath)) {
        fs.unlink(oldPath,(err => {
          if (err){console.log(err)} 
          else {
            console.log("\nDeleted file: "+oldPath);
          }
        }));
      }

    }
    if(data.title&&data.title!=""){
      obj.title=data.title;
    }
    if(data.price&&data.price!=""){
      obj.price=data.price;
    }
    if(data.description&&data.description!=""){
      obj.description=data.description;
    }
    console.log(obj);

    return res.json(await dbFunctions.updateMenuItemById(data.id,obj));

    
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

router.post('/api/getImage', (req, res) => {
  let data=req.body;
  // read the image file from disk
  const filePath = uploadDir+data.filename;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      // set the response content-type header to image/jpeg
      res.set('Content-Type', 'image/jpeg');
      // send the binary data of the image as the response
      res.send(data);
    }
  });
});

router.get('*', async function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../frontend/build')});
});

module.exports = router;