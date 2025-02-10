import React from 'react'

const userCard = ({user}) => {
     //console.log(user)
    const { firstName,lastName,age,gender,photoUrl,about } = user
  return (
    <div className='flex justify-center my-4'>
      <div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src={photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " "+lastName}</h2>
    <h3>{age +" "+gender}</h3>
    <p>{about}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-secondary px-2">Ignore</button>
      <button className="btn btn-primary px-2">Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default userCard
