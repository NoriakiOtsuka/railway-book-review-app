import React, { useState } from "react"

import './imageUpload.scss'

export const ImageUpload = (props) => {
  const [icon, setIcon] = useState([])

  const handleInputFile = (e) => {
    const file = e.target.files[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result !== 'string') {
        return
      }
      setIcon(() => [result])
    }
    reader.readAsDataURL(file)
    props.handleIconChange(file)
  }

  const handleClearFile = (e) => {
    setIcon(() => [])
    props.handleIconChange([])
  }

  return (
    <div>
      <label>ユーザアイコン</label>
      <br />
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleInputFile}
      />
      <div>
        <div>
          {(icon.length !== 0) && icon.map(image => (
            <div>
              <img
                src={image}
                width={240}
                height={240}
                onClick={handleClearFile}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
