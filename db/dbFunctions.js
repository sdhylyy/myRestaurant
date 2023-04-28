const {MongoClient} = require('mongodb');
const { ObjectId } = require('mongodb');
const dbName = 'MyRestaurant';
const collUser = 'users';
const collOwner = 'owners';
const collOrders='orders';
const collMenu='menu';
const collImages='images';
const url = process.env.MOGO_URL || "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const db = client.db(dbName);

module.exports = {

  addOrder: async (item) => {
    return await db.collection(collOrders).insertOne(item);
  },

  findUser:async(name)=>{
    return await db.collection(collUser).findOne({username:name});
  },
  findOwner:async(name)=>{
    return await db.collection(collOwner).findOne({username:name});
  },
  addUser:async(user)=>{
    return await db.collection(collUser).insertOne(user);
  },
  findOrderByName:async(name)=>{
    return await db.collection(collOrders).find({username:name}).toArray();
  },
  findAllOrders:async(obj)=>{
    return await db.collection(collOrders).find(obj).toArray();
  },
  setOrderReady:async(id)=>{
    return await db.collection(collOrders).updateOne({_id:ObjectId(id)},{$set:{delivered:"Yes"}});
  },
  addToMenu:async(obj)=>{
    return await db.collection(collMenu).insertOne(obj);
  },
  getMenu:async()=>{
    return await db.collection(collMenu).find().toArray();
  },
  deleteFromMenu:async(id)=>{
    return await db.collection(collMenu).deleteOne({_id:ObjectId(id)});
  },
  findMenuItemById:async(id)=>{
    return await db.collection(collMenu).findOne({_id:ObjectId(id)});
  },
  updateMenuItemById:async(id,obj)=>{
    return await db.collection(collMenu).updateOne({_id:ObjectId(id)},{$set:obj});
  },
  getImage:async(name)=>{
    return await db.collection(collImages).findOne({filename:name});
  },
  addImage:async(obj)=>{
    return await db.collection(collImages).insertOne(obj);
  },
  deleteImage:async(name)=>{
    return await db.collection(collImages).deleteOne({filename:name});
  },
  getBalanceByName:async(name)=>{
    let user=await db.collection(collUser).findOne({username:name})
    return user.balance;
  },
  updateBalanceByName:async(name,current)=>{
    return await db.collection(collUser).updateOne({username:name},{$set:{balance:current}});
  },
  getAllUsers:async(obj)=>{
    return await db.collection(collUser).find(obj).toArray();
  },
};

