import React from 'react'
import ConnectionCard from '../newComponent/ConnectionCard/ConnectionCard'
import NotificationCard from '../newComponent/NotificaitonCard/NotificationCard';
import EventCard from '../newComponent/EventCard/EventCard';

function EventSection() {
  return (
    <div className='flex flex-col px-2 py-2'>
    <h2 className='text-lg font-semibold xl:text-xl'>Events</h2>

<EventCard />
<EventCard />
<EventCard />
<EventCard />
<EventCard />             
<EventCard />             
<EventCard />             
<EventCard />             
<EventCard />             
</div>
  )
}

export default EventSection;