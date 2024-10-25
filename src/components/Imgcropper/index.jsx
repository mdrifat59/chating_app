import React, { useState } from 'react'
import { Closeicons } from '../../svg/Close'
import { Cropper } from 'react-cropper'
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, updateProfile } from "firebase/auth";
import { loggedInUser } from '../../features/slice/Loginslice';
import { SyncLoader } from 'react-spinners';

const ImageCropper = ({ setImage, cropperRef, image, setCropData, setShow }) => {
    const storage = getStorage();
    const auth = getAuth();
    let user = useSelector((state) => state.login.loggedIn)
    let [loading, setLoading] = useState(false)
    const storageRef = ref(storage, user.uid);
    let dispatch = useDispatch()
    const getCropData = () => {
        setLoading(true)
        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
            const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
            uploadString(storageRef, message4, 'data_url').then((snapshot) => {
                getDownloadURL(storageRef).then((downloadURL) => {
                    updateProfile(auth.currentUser, {
                        photoURL: downloadURL
                    }).then(() => {
                        dispatch(loggedInUser({ ...user, photoURL: downloadURL }))
                        localStorage.setItem('user', JSON.stringify({ ...user, photoURL: downloadURL }))
                        setShow(false)
                        setLoading(false)
                    }).catch((error) => {
                        console.log(error.message);

                    });
                })
            });
        }
    };
    return (
        <>
            <div className='fixed top-0 left-0   w-full h-screen flex items-center justify-center'>
                <div className='w-[30%] bg-white rounded-lg p-4 relative'>
                    <div>
                        <h3 className='font-inter_Regular text-3xl text-black text-center'>Upload Profile</h3>
                        <div className='absolute top-2 right-2 cursor-pointer' onClick={() => setImage(false)}>
                            <Closeicons />
                        </div>
                    </div>
                    <div className='w-20 h-20 rounded-full mx-auto overflow-hidden'>

                        <div
                            className="img-preview"
                            style={{ width: "100%", float: "left", height: "300px" }}
                        />

                    </div>
                    <div className='mt-5'>
                        <Cropper
                            ref={cropperRef}
                            style={{ height: 400, width: "100%" }}
                            zoomTo={0.5}
                            initialAspectRatio={1}
                            preview=".img-preview"
                            src={image}
                            viewMode={1}
                            minCropBoxHeight={10}
                            minCropBoxWidth={10}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                            guides={true}
                        />
                    </div>
                    <button className='bg-blue-500 text-white w-full mt-5 py-2 rounded-md' onClick={getCropData}>{loading ? <SyncLoader color='#ffffff' /> : "Upload"}</button>
                </div>
            </div>
        </>
    )
}

export default ImageCropper