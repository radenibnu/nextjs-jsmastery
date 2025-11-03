import React from 'react'

const UserDetails = async ({ params }: {params: Promise<{id: string}>}) => {
  const { id } = await params;

  return (
    <div>
      <h1>User Details</h1>
      <p>This is the user details page for user {id}.</p>
    </div>
  )
}

export default UserDetails
