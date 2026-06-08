import {React, useState,useEffect} from 'react'
import axios from 'axios'

function Suggesstions() {
const [profile,setProfile] = useState(null);
const [suggesstions,setSuggesstions] = useState([]);

useEffect(()=>{
  fetch('http://localhost:3000/profile')
  .then(data => data.json())
  .then(data => setProfile(data))
  .catch(err=>console.log(err))

  fetch('http://localhost:3000/suggesstions')
  .then(data => data.json())
  .then(data => setSuggesstions(data))
  .catch(err=>console.log(err))
},[])

const handleFollow = async(id,username)=>{
    axios.post("http://localhost:3000/followers",{"id":id , "username" : username})
    .then(alert('Followed'))
    .catch(err => console.log(err))    
    }
  return (
    <div>
      <div className='suggesstions w-75 m-5'>
            {profile ?
              <div className='d-flex'>
                  <img className="dp rounded-circle"src={profile.profile_pic} alt=""/>
                  <h5>{profile.username}</h5>
                  <small className='ms-auto text-primary'>Switch</small>
              </div>
              : <p>Loading...</p>}

              <div className='d-flex'>
                  <p>Suggessted for you</p>
                  <b className='ms-auto'>See All</b>
              </div>

              {suggesstions.length > 0 ? (
            <div>
                {suggesstions.map((suggesstion)=>(
                    <div className="my-0" key={suggesstion.id}>
                        <div className='d-flex'>
                            <img className="dp rounded-circle"src={suggesstion.profile_pic} alt=""/>
                            <h5>{suggesstion.username}</h5>
                            <a className='ms-auto text-primary' onClick={()=>{handleFollow(suggesstion.id,suggesstion.username)}}>Follow</a>
                        </div> 
                    </div>
                ))
                    
                }
            </div>
        ):(
            <div>
                Loading....
            </div>
        )}
    </div>
      </div> 
  )
}

export default Suggesstions