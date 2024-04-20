import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
    const router = useRouter();
    const { id } = router.query;
  return (
    <div>
      <h1>Item ID: {id}</h1>
      {/* Render your item details here */}
    </div>
  )
}

export default page