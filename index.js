const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv")
const helmet = require("helmet");
// import db from "./src/Config/db";

//routes
const authRoute = require("./src/routes/auth");
const userRoute = require("./src/routes/user");
const uploadRoute = require("./src/routes/upload");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
dotenv.config();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// Router
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/upload",uploadRoute);
// app.use("/api/v1/users/booking", bookingRoute);
// app.use("/api/v1/users/city", cityRoute);
// app.use("/api/v1/users/country", countryRoute);
// app.use("/api/v1/users/airlines", airlinesRoute);
// app.use("/api/v1/users/flight", flightRoute);

// Index
app.get("/api/v1", (req, res) => {
  res.status(200).send({
    success: true,
    message: 'welcome ankasa tiket api'
  });
});

// Middleware Photos
app.use('/public/images',express.static("public/images"));

// Socket 
// io.on('connection', (socket)=> {
//   console.log('user connect')
//     socket.on('initial-chat', (id) => {
//       console.log('data masuk')
//       if (id) {
//           // console.log('datany adalah ini: ',id)
//           socket.join(id)
//           db.query(`SELECT * FROM messages WHERE id_user = ${id} `, (err, res) => {
//             // console.log('hasil dari messages: ',res)
//             if (res) {
//                io.to(id).emit('get-messages', res)
//             }
//           });
//       }
//     })
//     socket.on('initial-chat-room', (id_user) => {
//       // console.log('data masuk initial-chat-room')
//       if (id_user) {
//           // console.log('datany initial-chat-room: ',id_user)
//           socket.join(id_user)
//           db.query(`SELECT * FROM chat_room WHERE id_user_chat = '${id_user}'`, (err, res) => {
//             // console.log('hasil dari chatRoom: ',res)
//             if (res) {
//                io.to(id_user).emit('get-chat', res)
//             }
//           });
//       }
//     })

//     socket.on('send-chat', (data) => {
//       const {id,message,data_id} = data
//       console.log('data send-chat')
//       if (data_id) { 
//           data_id.split('_').map(res =>{
//             db.query(`SELECT * FROM messages WHERE id_user = ${res}`, (err, res) => {
//               if(res[0])
//               {
//                 db.query(`UPDATE messages SET last_chat ='${message}' WHERE id_room ='${data_id}'`, (err, res) => {

//                 });
//               }else{
//                 if (res == 16 ) {
//                   db.query(`INSERT INTO messages (id_room,last_chat,id_user,fullName) values ('${data_id}','${message}',${res},'Customer Service') `, (err, res) => {

//                   });
//                 }else{
//                   db.query(`INSERT INTO messages (id_room,last_chat,id_user,fullName) values ('${data_id}','${message}',${res},'Komang') `, (err, res) => {

//                   });
//                 }
                
//               }
//             });

//           })


//           db.query(`INSERT INTO chat_room  (id_user_chat,chat,id_user) values ('${data_id}','${message}',${id}) `, (err, res) => {
//             // console.log('hasil dari messages: ',res)
//             if (res) {
//                io.to(id).emit('get-messages', res)
//             }
//           });
//       }
//     })

//     // disconnect 
//     socket.on('disconnect',() => {
//         console.log("Users disconnect to socket or server");
//     })

//   })


// Listen Port
server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
