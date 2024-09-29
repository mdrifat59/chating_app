import React, { useEffect, useState } from 'react'
import { Addfriendicon } from '../../svg/Addfriend'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref as Ref } from 'firebase/storage';
import avaterimg from '../../../public/avater.png'

const AllUser = () => {
    const db = getDatabase();
    const storage = getStorage();
    let user = useSelector((state) => state.login.loggedIn)
    let [users, setUsers] = useState([])
    let [friendreq, setFriendreq] = useState([])
    useEffect(() => {
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            let userarr = []
            snapshot.forEach((userlist) => {
                if (user.uid !== userlist.key) {
                    getDownloadURL(Ref(storage, userlist.key)).then((downloadURL) => {
                        userarr.push({
                            ...userlist.val(),
                            id: userlist.key,
                            photoURL: downloadURL
                        })
                    }).catch((error) => {
                        userarr.push({
                            ...userlist.val(),
                            id: userlist.key,
                            photoURL: null
                        })
                    }).then(() => {
                        setUsers([...userarr])
                    })
                }
            })
        });
    }, [db, user.uid, storage])

    let handleFriendRequest = (data) => {
        set(push(ref(db, 'friendrequest/')), {
            senderName: user.displayName,
            senderId: user.uid,
            senderPhoto: user.photoURL ?? "/public/avater.png",
            receiverName: data.username,
            receiverId: data.id,
            receiverPhoto: data.photoURL ?? "/public/avater.png"
        });
    }

    useEffect(() => {
        const friendreqRef = ref(db, 'friendrequest/');
        onValue(friendreqRef, (snapshot) => {
            let reqarr = []
            snapshot.forEach((item) => {
                reqarr.push(item.val().receiverId + item.val().senderId)
            })
            setFriendreq(reqarr)
        });
    })
    return (
        <>
            <div className='p-5 shadow-lg w-full h-full  bg-[#FFFFFF] rounded-lg overflow-y-auto '>
                <div className='sticky top-0 left-0 bg-[#fff]'>
                    <h2 className='font-inter_semibold text-3xl text-[#494949]'>All Users</h2>
                    <input type="text" className='w-full py-2 px-3 my-5 border rounded-lg bg-[#F8F8F8] outline-none' placeholder='search users...' />
                </div>
                <div className='flex flex-col gap-5 mt-10'>
                    {
                        users.map((item) => (
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-4'>
                                    <div className='w-[82px] h-[82px]  border rounded-full'>
                                        <img src={item.photoURL || avaterimg} className='w-full h-full object-cover rounded-full overflow-hidden' alt="" />
                                    </div>
                                    <h3 className='font-inter_medium text-[23px] text-[#3D3C3C]'>{item.username}</h3>
                                </div>
                                {
                                    friendreq.includes(item.id + user.uid) ?
                                        <button className='py-2 px-4 bg-[#D34A4A] rounded-lg text-white'>Cencel Req</button> :
                                        friendreq.includes(user.uid + item.id) ?
                                            <button className='py-2 px-4 bg-yellow-300 text-black font-inter_medium rounded-lg'>Pending</button> :
                                            <div className='cursor-pointer' onClick={() => handleFriendRequest(item)}>
                                                <Addfriendicon />
                                            </div>
                                }
                            </div>
                        ))

                    }

                </div>
            </div>
        </>
    )
}

export default AllUser