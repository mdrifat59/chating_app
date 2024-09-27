import React, { useRef, useState } from 'react'
import { Closeicons } from '../../svg/Close'
import { UploadimgIcon } from '../../svg/Uploadimg'
import ImageCropper from '../Imgcropper';

const Modal = ({ setShow }) => {
    const [image, setImage] = useState();
    const [cropData, setCropData] = useState("#");
    const cropperRef = useRef();
    let fileRef = useRef(null)

    let handleChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);

    }
    return (
        <>
            <div className='fixed top-0 left-0 bg-[#444444e8] w-full h-screen flex items-center justify-center'>
                <div className='w-[30%] bg-white rounded-lg p-4 relative'>
                    <div>
                        <h3 className='font-inter_Regular text-3xl text-black text-center'>Upload Profile</h3>
                        <div className='absolute top-2 right-2 cursor-pointer' onClick={() => setShow(false)}>
                            <Closeicons />
                        </div>
                    </div>
                    <div className='w-full h-[250px] border border-slate-400 rounded-lg mt-5  p-2'>
                        <div className='w-full h-full bg-slate-200 flex justify-center items-center cursor-pointer' onClick={() => fileRef.current.click()}>
                            <div className='flex flex-col justify-center items-center'>
                                <UploadimgIcon />
                                <h4>Upload your profile photo</h4>
                                <input type="file" ref={fileRef} hidden onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    image && <ImageCropper setImage={setImage} cropperRef={cropperRef} image={image} setShow={setShow} setCropData={setCropData} />
                }
            </div>
        </>
    )
}

export default Modal