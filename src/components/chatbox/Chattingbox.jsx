import React, { useEffect, useRef, useState } from 'react'
import { Audioicon } from '../../svg/Audio'
import { EmojiIcon } from '../../svg/Emoji'
import { PictuerIcon } from '../../svg/Pictuer'
import { useSelector } from 'react-redux'
import { getDatabase, onValue, push, ref, set } from 'firebase/database'
import avaterimg from '../../../public/avater.png'
import { formatDistance } from 'date-fns'
import EmojiPicker from 'emoji-picker-react'
import { getStorage, ref as Ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { Closeicons } from '../../svg/Close'

const Chattingbox = () => {
  let db = getDatabase()
  const storage = getStorage();
  let singlefriend = useSelector((state) => state.active.activefriend)
  let user = useSelector((state) => state.login.loggedIn)
  let [message, setMessage] = useState("")
  let [allmessage, setAllmessagea] = useState([])
  let [emojishow, setEmojishow] = useState(false)
  let [selectedimg, setSelectedimg] = useState(null)
  let [imagefile, setImagefile] = useState(null)
  let [audiourl, setAudiourl] = useState("")
  let [block, setBlock] = useState([])
  let [blobs, setBlobs] = useState("")
  let choosefile = useRef(null)
  let scrollRef = useRef()
  let spach = /^(?!\s*$).+/

  let recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err)
  )
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudiourl(url)
    setBlobs(blob)
  };

  let handleSend = () => {

    if (singlefriend?.status == "single") {
      if (spach.test(message)) {
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
    }
    if (singlefriend?.status == "single" && imagefile != null) {

      const storageRef = Ref(storage, `${user.displayName}= sendImageMessage/ ${imagefile}`);
      const uploadTask = uploadBytesResumable(storageRef, imagefile);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error);

        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            set(push(ref(db, "singlemessage")), {
              whosendname: user.displayName,
              whosendid: user.uid,
              whoreceivename: singlefriend.name,
              whoreceiveid: singlefriend.id,
              message: message || "",
              image: downloadURL,
              date: new Date().toISOString()
            }).then(() => {
              setMessage("")
              setEmojishow(false)
              setImagefile(null)
              setSelectedimg(null)
            })
          });
        }
      );

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
  }, [singlefriend?.id])

  let handleEmoji = ({ emoji }) => {
    setMessage(message + emoji)

  }
  let handleImage = (e) => {
    let imgFile = e.target.files[0]

    setSelectedimg(URL.createObjectURL(imgFile))
    setImagefile(imgFile)
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

  let handleSendaudio = () => {
    const storageRef = Ref(storage, `${user.displayName} = audiovoice/${blobs} `);
    uploadBytes(storageRef, blobs).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        set(push(ref(db, "singlemessage")), {
          whosendname: user.displayName,
          whosendid: user.uid,
          whoreceivename: singlefriend.name,
          whoreceiveid: singlefriend.id,
          message: message,
          audio: downloadURL,
          date: new Date().toISOString()
        }).then(() => {
          setAudiourl("")
        })
      });
    });
  }
  useEffect(() => {
    const blockdRef = ref(db, 'blocks/');
    onValue(blockdRef, (snapshot) => {
      let blockarr = []
      snapshot.forEach((item) => {
        blockarr.push({ ...item.val(), id: item.key })
      })
      setBlock(blockarr)
    });

  }, [singlefriend?.id])

  return (
    <>
      <div className='w-full h-full relative'>
        <div className='flex items-center p-5  gap-5  bg-[#F9F9F9]'>
          <div className='w-[81px] h-[81px] bg-gray-500 rounded-full' >
            <img src={singlefriend?.profile || avaterimg} className='w-full h-full rounded-full object-cover overflow-hidden' alt="" />
          </div>
          <h3 className='font-inter_medium text-xl text-[#000000]'>{singlefriend?.name || "Choouse your friend"}</h3>
        </div>
        <div className="h-[500px] px-5 overflow-y-auto ">
          {
            singlefriend?.status == "single" ?
              allmessage.map((item, index) => (
                <div key={index} ref={scrollRef}>
                  {

                    item.whosendid == user.uid ? (
                      item.audio ?
                        <div className="w-[65%] ml-auto flex flex-col items-end">
                          <div className=" py-3 px-3  inline-block mt-5">
                            <audio src={item.audio} controls></audio>
                          </div>
                          <span >{formatDistance(item.date, new Date(), { addSuffix: true })}</span>
                        </div>
                        :
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
                      item.audio ?
                        <div className="w-[65%] ">
                          <div className=" py-3 px-3 mt-5">
                            <audio src={item.audio} controls ></audio>
                          </div>
                          <span >{formatDistance(item.date, new Date(), { addSuffix: true })}</span>
                        </div>
                        :
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

        {block.some(
          (el) =>
            (el.blockedId === singlefriend.id && el.blockerId === user.uid) ||
            (el.blockedId === user.uid && el.blockerId === singlefriend.id)
        ) ?
          block.find((e) => e.blockedId === user.uid && e.blockerId === singlefriend.id) ?
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%] py-4 px-2 bg-red-500 rounded-lg">
              <p className="text-white text-center">This chat is blocked by {singlefriend.name}</p>
            </div>
            :
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%] py-4 px-2 bg-red-500 rounded-lg">
              <p className="text-white text-center">You blocked this {singlefriend.name}</p>
            </div>
          : (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%] py-4 px-2  bg-[#F5F5F5] rounded-lg grid grid-cols-[2fr,6fr,1fr]">
              <div className="w-full h-full flex justify-center items-center gap-4">
                <div
                  className="cursor-pointer "
                  onClick={() => recorderControls.startRecording()}
                >
                  <Audioicon />
                </div>
                <div className=" flex justify-center items-center gap-2">
                  <div className="relative">
                    <div
                      className="cursor-pointer"
                      onClick={() => setEmojishow((prev) => !prev)}
                    >
                      <EmojiIcon />
                    </div>
                    {emojishow && (
                      <div className="absolute bottom-9 -left-24">
                        <EmojiPicker onEmojiClick={handleEmoji} />
                      </div>
                    )}
                  </div>
                </div>
                <div
                  onClick={() => choosefile.current.click()}
                  className="cursor-pointer"
                >
                  <PictuerIcon />
                  <input
                    type="file"
                    ref={choosefile}
                    hidden
                    onChange={handleImage}
                  />
                </div>
              </div>
              <div className="w-full h-full flex items-center ">
                {!recorderControls.isRecording && !audiourl && (
                  <input
                    type="text"
                    className="w-full py-3 px-2 outline-none rounded-lg font-semibold"
                    onKeyUp={handleSendKey}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="type here..."
                  />
                )}
                <div
                  className={`mx-auto ${!recorderControls.isRecording ? "hidden" : ""
                    }`}
                >
                  <AudioRecorder
                    onRecordingComplete={(blob) => addAudioElement(blob)}
                    recorderControls={recorderControls}
                    showVisualizer={true}
                  />
                </div>
                {audiourl && (
                  <div className="flex gap-5 mx-auto">
                    <audio
                      src={audiourl}
                      controls
                      className="border border-black rounded-lg"
                    ></audio>
                    <button
                      className="py-2 px-5 bg-red-500 text-white rounded-lg"
                      onClick={() => setAudiourl("")}
                    >
                      Cencel
                    </button>
                  </div>
                )}
              </div>
              <div className="absolute bottom-1/2 left-1/4">
                {selectedimg && (
                  <>
                    <img
                      src={selectedimg}
                      className="w-[300px] h-[300px] object-cover overflow-hidden relative"
                      alt=""
                    />
                    <div
                      className="absolute top-2 right-2 text-red-500 cursor-pointer"
                      onClick={() => setSelectedimg(null)}
                    >
                      <Closeicons />
                    </div>
                  </>
                )}
              </div>
              <div className="w-full h-full ">
                {audiourl ? (
                  <button
                    className="font-inter_medium  text-xl  bg-[#3E8DEB] text-[#FFFFFF] py-3 px-10 rounded-lg mx-2"
                    onClick={handleSendaudio}
                  >
                    Send
                  </button>
                ) : (
                  <button
                    className="font-inter_medium  text-xl bg-[#3E8DEB] text-[#FFFFFF]   py-3 px-10 rounded-lg mx-2"
                    onClick={handleSend}
                  >
                    Send
                  </button>
                )}
              </div>
            </div>
          )}

      </div>
    </>
  )
}

export default Chattingbox

