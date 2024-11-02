import React, { useEffect, useState } from 'react'
import { Addfriendicon } from '../../svg/Addfriend'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref as Ref } from 'firebase/storage';
import avaterimg from '/public/avater.png'

const AllUser = () => {
    const db = getDatabase();
    const storage = getStorage();
    let user = useSelector((state) => state.login.loggedIn)
    let [users, setUsers] = useState([])
    let [friendreq, setFriendreq] = useState([])
    let [cencelreq, setCencelreq] = useState([])
    let [friend, setFriend]=useState([])
    let [search, setSearch] = useState('')
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

    // friends show
    useEffect(() => {
        const friendRef = ref(db, 'friends/' );
        onValue(friendRef, (snapshot) => {
           let friendarr= []
           snapshot.forEach((item)=>{
                friendarr.push(item.val().receiverId + item.val().senderId)
           })
           setFriend(friendarr)
        });
    }, [])

    let handleFriendRequest = (data) => {
        set(push(ref(db, 'friendrequest/')), {
            senderName: user.displayName,
            senderId: user.uid,
            senderPhoto: user.photoURL ?? "/avater.png",
            receiverName: data.username,
            receiverId: data.id,
            receiverPhoto: data.photoURL ?? "/avater.png"
        });
    }

    useEffect(() => {
        const friendreqRef = ref(db, 'friendrequest/');
        onValue(friendreqRef, (snapshot) => {
            let reqarr = []
            let celarr = []
            snapshot.forEach((item) => {
                reqarr.push(item.val().receiverId + item.val().senderId)
                celarr.push({ ...item.val(), id: item.key })
            })
            setFriendreq(reqarr)
            setCencelreq(celarr)
        });
    }, [db])
    // cencel request
    let handleCencelReq = (item) => {
        let reqtocencel = cencelreq.find((req) => req.receiverId == item)
        remove(ref(db, 'friendrequest/' + reqtocencel.id))
    }
    // filter user
    // let filteruser = users.filter((item) => item.username.toLowerCase().includes(search.toLowerCase()))
    let filteruser = users.filter((item) => item.username && item.username.toLowerCase().includes(search.toLowerCase()))

    return (
        <> 
            <div className='h-[95vh] border  bg-[#FFFFFF] scrollbar-thin p-5 shadow-lg  overflow-y-auto rounded-md '>
                <div className='sticky top-0 left-0 bg-[#fff]'>
                    <h2 className='font-inter_Bold text-3xl text-[#494949]'>All Users</h2>
                    <input type="text" className='w-full py-2 px-3 my-5 border rounded-lg bg-[#F8F8F8] outline-none' placeholder='search users...' value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className='flex flex-col gap-5 mt-10'>
                    {
                        filteruser.map((item) => (
                            <div key={item.id} className='flex justify-between items-center '>
                                <div className='flex items-center gap-4 '>
                                    <div className='w-[82px] h-[82px] bg-gray-700 border rounded-full'>
                                        <img src={item.photoURL || avaterimg} className='w-full h-full object-cover rounded-full overflow-hidden' alt="" />
                                    </div>
                                    <h3 className='font-inter_medium text-[23px] text-[#3D3C3C]'>{item.username}</h3>
                                </div>
                                {
                                    friendreq.includes(item.id + user.uid) ?
                                        <button className='py-2 px-4 bg-[#D34A4A] rounded-lg text-white' onClick={() => handleCencelReq(item.id)}>Cencel Req</button> :
                                        friendreq.includes(user.uid + item.id) ?
                                            <button className='py-2 px-4 bg-yellow-300 text-black font-inter_medium rounded-lg'>Pending</button>
                                            :
                                            friend.includes(user.uid + item.id) || friend.includes(item.id + user.uid) ?
                                             <h2 className='py-2 px-4 bg-green-400 rounded-lg'>Friends</h2>
                                            :
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