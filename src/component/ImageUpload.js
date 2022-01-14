import React, {useState} from 'react';
import {Button} from "@mui/material";
import firebase, {db, storage} from "../firebase";



const ImageUpload = ({username}) => {
    const [image, SetImage] = useState(null);
    const [caption, Setcaption] = useState('');
    const [progress, Setprogress] = useState(0);

    const handleChange = (e) =>{
    if(e.target.files[0]){
        SetImage(e.target.files[0]);
    }
    }


    const  handleUpload =  () =>{
       const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
            const progress =Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    Setprogress(progress)
            },
            (error)=>{
                console.log(error)
                alert(error.message)
        }, ()=>{
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url=>{
                        const {serverTimestamp} = firebase.firestore.FieldValue;
                        db.collection("posts").add({
                            timestamp: serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });
                        Setprogress(0);
                        Setcaption('');
                        SetImage(null);
                    })
                    }
        )
    }
    return (
        <div>

            <progress value={progress} max="100"/>
            <input placeholder="enter a caption" type="text" onChange={event => {Setcaption(event.target.value)}} value={caption}/>
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload} variant="contained" color="danger">Upload</Button>
        </div>
    );
};

export default ImageUpload;