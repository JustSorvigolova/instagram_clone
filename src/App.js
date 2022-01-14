import './App.css';
import React, {useEffect, useState} from 'react';
import Post from "./component/Post";
import {auth, db} from './firebase.js'
import {Button, Input, Modal} from "@mui/material";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImageUpload from "./component/ImageUpload";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

let App=()=> {
    const [open, setOpen] = useState(false);
    const [posts, setPosts] = useState([])
    const [username, SetUsername] = useState('')
    const [email, SetEmail] = useState('')
    const [password, Setpassword] = useState('')
    const [user, SetUser] = useState(null)
    const [openSignIn, SetOpenSignIn] = useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const input_1= (e)=>{SetUsername(e.target.value)}
    const input_2= (e)=>{SetEmail(e.target.value)}
    const input_3= (e)=>{Setpassword(e.target.value)}

    useEffect(()=>{
     const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                SetUser(authUser)
            }
            else {
                SetUser(null)
            }
        })
        return ()=>{
         unsubscribe();
        }

    },[user, username])

    useEffect(()=>{
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc=>({
                id: doc.id,
                post: doc.data(),
            })))
            }
        )
    },[posts])

    const signUp =  (event)=>{
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
            .then((authUser)=>{
            return  authUser.user.updateProfile({
                displayName: username
            })
        })
            .catch((error)=>alert(error.message))
        setOpen(false)
    }
    const handleLogOut =  ()=>{auth.signOut()}
    const SignIn = (event)=>{
        event.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error)=>alert(error.message))
        SetOpenSignIn(true);
    }
  return (
    <div className="app">



  <div className="app_header">
    <img  className="app_headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
    alt="instagram"/>
  </div>
        {user ? (
            <Button onClick={handleLogOut} variant="contained" color="success">Log Out</Button>
        ): (
            <div className="app_login">
            <Button onClick={handleOpen} variant="contained" color="success">Sign Up</Button>
            <Button onClick={()=>SetOpenSignIn(true)} variant="contained" color="success">Sign In</Button>
            </div>
        )
        }

        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">

            <Box sx={style}>
                <Typography className="center_items"  id="modal-modal-title" variant="h6" component="h2">
                    Sign Up
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <form className="sign_Up">
                        <img className="app_image_signUp" width={"50%"} alt={"defe"} src={"https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"}/>
                        <Input type="text" placeholder="username" value={username} onChange={input_1}  />
                        <Input type="text" placeholder="email" value={email} onChange={input_2}  />
                        <Input type="password" placeholder="password" value={password} onChange={input_3}  />
                        <Button type="submit" onClick={signUp}>Sign up</Button>
                    </form>
                </Typography>
            </Box>

        </Modal>

        <Modal open={openSignIn} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">

            <Box sx={style}>
                <Typography className="center_items"  id="modal-modal-title" variant="h6" component="h2">
                    Sign Up
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <form className="sign_Up">
                        <img className="app_image_signUp" width={"50%"} alt={"defe"} src={"https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"}/>
                        <Input type="text" placeholder="email" value={email} onChange={input_2}  />
                        <Input type="password" placeholder="password" value={password} onChange={input_3}  />
                        <Button type="submit" onClick={SignIn}>Sign In</Button>
                    </form>
                </Typography>
            </Box>

        </Modal>

        {
            posts.map(({post,id})=>(<Post key={id}  username={post.username}  caption={post.caption} imageUrl={post.imageURL} />))
        }
        {user?.displayName ?(
            <ImageUpload username={user.displayName}/>
        ) : (
            <h3>sorry login</h3>
        )

        }
    </div>
  )
}

export default App;
