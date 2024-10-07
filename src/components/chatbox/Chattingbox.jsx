import React, { useEffect, useRef, useState } from 'react'
import { Audioicon } from '../../svg/Audio'
import { EmojiIcon } from '../../svg/Emoji'
import { PictuerIcon } from '../../svg/Pictuer'
import { useSelector } from 'react-redux'
import { getDatabase, onValue, push, ref, set } from 'firebase/database'
import avaterimg from '../../../public/avater.png'
import { formatDistance } from 'date-fns'
import EmojiPicker from 'emoji-picker-react'
import { getStorage, ref as Ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

const Chattingbox = () => {
  let db = getDatabase()
  const storage = getStorage();
  let singlefriend = useSelector((state) => state.active.activefriend)
  let user = useSelector((state) => state.login.loggedIn)
  let [message, setMessage] = useState("")
  let [allmessage, setAllmessagea] = useState([])
  let [emojishow, setEmojishow] = useState(false)
  let [audiourl, setAudiourl] = useState("")
  let choosefile = useRef(null)
  let scrollRef = useRef()

  let recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err)
  )
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    // const audio = document.createElement("audio");
    // audio.src = url;
    // audio.controls = true;
    setAudiourl(url)
  };
  let handleSend = () => {
    {
      message.length > 0 &&
        <>
          if (singlefriend?.status == "single") {
            set(push(ref(db, "singlemessage")), {
              whosendname: user.displayName,
              whosendid: user.uid,
              whoreceivename: singlefriend.name,
              whoreceiveid: singlefriend.id,
              message: message,
              date: new Date().toISOString()
            }).then(() => {
              setMessage("")
              setEmojishow(false)
            })
          }
        </>
    }
  }

  useEffect(() => {
    onValue(ref(db, "singlemessage/"), (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if (user.uid == item.val().whosendid && item.val().whoreceiveid == singlefriend.id || user.uid == item.val().whoreceiveid && item.val().whosendid == singlefriend.id) {
          arr.push(item.val())
        }
      })
      setAllmessagea(arr)
    })
  }, [singlefriend.id])

  let handleEmoji = ({ emoji }) => {
    setMessage(message + emoji)

  }
  let handleImage = (e) => {
    let imgFile = e.target.files[0]
    const storageRef = Ref(storage, `${user.displayName}= sendImageMessage/ ${imgFile}`);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          set(push(ref(db, "singlemessage")), {
            whosendname: user.displayName,
            whosendid: user.uid,
            whoreceivename: singlefriend.name,
            whoreceiveid: singlefriend.id,
            message: message,
            image: downloadURL,
            date: new Date().toISOString()
          }).then(() => {
            setMessage("")
            setEmojishow(false)
          })
        });
      }
    );

  }
  // press enter
  let handleSendKey = (e) => {
    if (e.key == 'Enter') {
      handleSend()
    }
  }
  // scrolling
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    })
  }, [message])
  return (
    <>
      <div className='w-full h-full relative'>
        <div className='flex items-center p-5  gap-5  bg-[#F9F9F9]'>
          <div className='w-[81px] h-[81px] bg-gray-500 rounded-full' >
            <img src={singlefriend?.profile || avaterimg} className='w-full h-full rounded-full object-cover overflow-hidden' alt="" />
          </div>
          <h3 className='font-inter_medium text-xl text-[#000000]'>{singlefriend?.name || "Choouse your friend"}</h3>
        </div>
        <div className="h-[500px] px-5 overflow-y-auto">
          {
            singlefriend?.status == "single" ?
              allmessage.map((item, index) => (
                <div key={index} ref={scrollRef}>
                  {
                    item.whosendid == user.uid ? (
                      item.image ?
                        <div className="w-[65%] ml-auto flex flex-col items-end">
                          <div className=" py-3 px-3  inline-block mt-5">
                            <img src={item.image} className='border border-sky-400 rounded-lg object-cover w-full h-full' alt="" />
                          </div>
                          <span >{formatDistance(item.date, new Date(), { addSuffix: true })}</span>
                        </div>
                        :

                        <div className="w-[65%] ml-auto flex flex-col items-end">
                          <p className="bg-sky-400 py-3 px-4 rounded-lg inline-block mt-5 text-white"> {item.message} </p>
                          <span  > {formatDistance(item.date, new Date(), { addSuffix: true })}</span>
                        </div>
                    ) : (
                      item.image ?
                        <div className="w-[65%] ">
                          <div className=" py-3 px-3  inline-block mt-5">
                            <img src={item.image} className='border border-slate-400 rounded-lg object-cover w-full h-full' alt="" />
                          </div>
                          <span >{formatDistance(item.date, new Date(), { addSuffix: true })}</span>
                        </div>
                        :
                        <div className="w-[65%] flex flex-col items-start">
                          <p className="bg-slate-400 py-3 px-4 rounded-lg inline-block mt-5 text-white"> {item.message}</p>
                          <span  > {formatDistance(item.date, new Date(), { addSuffix: true })}</span>
                        </div>
                    )
                  }
                </div>
              ))
              : ""
          }

        </div>
        <div className='absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%] py-4 px-2  bg-[#F5F5F5] rounded-lg grid grid-cols-[2fr,6fr,1fr]'>
          <div className='w-full h-full flex justify-center items-center gap-4'>
            <div className='cursor-pointer ' onClick={() => recorderControls.startRecording()}>
              <Audioicon />
            </div>
            <div className=' flex justify-center items-center gap-2'>
              <div className='relative'>
                <div className='cursor-pointer' onClick={() => setEmojishow((prev) => !prev)}>
                  <EmojiIcon />
                </div>
                {
                  emojishow &&
                  <div className='absolute bottom-9 -left-24'>
                    <EmojiPicker onEmojiClick={handleEmoji} />
                  </div>
                }
              </div>
            </div>
            <div onClick={() => choosefile.current.click()} className='cursor-pointer'>
              <PictuerIcon />
              <input type="file" ref={choosefile} hidden onChange={handleImage} />
            </div>
          </div>
          <div className='w-full h-full flex items-center '>
            {
              !recorderControls.isRecording && !audiourl &&
              <input type="text" className='w-full py-3 px-2 outline-none rounded-lg font-semibold' onKeyUp={handleSendKey} value={message} onChange={(e) => setMessage(e.target.value)} placeholder='type here...' />
            }
            <div className={`mx-auto ${!recorderControls.isRecording ? "hidden" : ""}`}>
              <AudioRecorder
                onRecordingComplete={(blob) => addAudioElement(blob)}
                recorderControls={recorderControls}
                showVisualizer={true}
              />
            </div>
            {
              audiourl &&
              <div className='flex gap-5 mx-auto'>
                <audio src={audiourl} controls className='border border-black rounded-lg'></audio>
                <button className='py-2 px-5 bg-red-500 text-white rounded-lg' onClick={() => setAudiourl("")}>Cencel</button>
              </div>
            }
          </div>
          <div className='w-full h-full '>

            <button className={`font-inter_medium  text-xl ${message.length > 0 ? 'bg-[#3E8DEB] text-[#FFFFFF]' : 'bg-slate-300 text-slate-700 cursor-not-allowed'}  py-3 px-10 rounded-lg mx-2`} onClick={handleSend} >Send</button>

          </div>
        </div>
      </div>
    </>
  )
}

export default Chattingbox

