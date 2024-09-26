import React, { useState } from 'react'

function Test() {

    

    const [image,setImage]=useState()
    const handleFile = (event)=>{
        const file = event.target.files[0];

        const fr = new FileReader()

        fr.onloadend = ()=>{
            if(file){
                console.log(fr.result)
                setImage(fr.result)
            }else{
                setImage(null)
            }
            
        }

        fr.readAsDataURL(file)

        console.log(file)
    }

  return (
   

    <>
        <input type='file' onChange={handleFile} />

        {image ? <img src={image} /> : null}
    </>
  )
}

export default Test