import React from 'react'
import NewEventForm from './NewEventForm'
import { getRequireAuthSession } from '@/lib/auth';

export default async function page() {
  const session = await getRequireAuthSession();
  const user = session?.user.id

  if(!user){return <h1>Log In</h1>}
  return <NewEventForm userId = {user} />
}
