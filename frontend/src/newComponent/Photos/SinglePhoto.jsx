import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Lightbox } from 'yet-another-react-lightbox';

function SinglePhoto({src, id, setIndex, index, openDeleteModal}) {
   
   const [hover, setHover] = useState(false);
   const [showLightBox, setShowLightBox] = useState(false);

   const closeLightBox = () => {
      setShowLightBox(false);
    }

  return (
           <div   className="w-full md:w-[33%] relative lg:w-[25%] h-[250px] md:h-[200px] lg:h-[250px] flex justify-center cursor-pointer" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
            
             <div className={`absolute top-0 right-0 px-1 py-1 rounded-full bg-white ${hover ? 'block' : 'hidden'}`} onClick={() => openDeleteModal(id)}>    
              <BsThreeDotsVertical size={25} className="text-[var(--secondary)] hover:text-[var(--primary)]" />
              </div>

                  <img onClick={() => {
                    // setShowLightBox(true)
                    setIndex(index)
                }} className='cursor-pointer w-full h-full object-cover object-center' src={src} />
                  {/* <img className='w-full h-full object-cover object-center'  src={`http://localhost:3000/attachments/f0c30ff5853a4e8c6d07bc5e067c1390.jpg`} alt='attachments'/> */}
                 

                {/* <Lightbox 
                 open={showLightBox}
                 close={() => closeLightBox()}
                 slides={[{src: `${src}`, width: '800', height: '600'}]}
                 /> */}
           </div>
  )
}

export default SinglePhoto;