import { useState } from 'react'
import './App.css'
import Camera from './components/Camera'
import EmotionsFeed from './components/EmotionsFeed'

function App() {



  const [emotions, setEmotions] = useState<string[]>([])

  const handleEmotion = (emotion: string) => {
    setEmotions((prevEmotions) => {
      return [...prevEmotions
        , emotion]
    })
  }

  return (
    <>
      <div className="card">
        <h1>Emotions AI</h1>
        <p>
          Created by Daniel Ceron and Diego lopez
        </p>
        <p>
          Project done in React using TypeScript, and Python with Flask
        </p>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        width: '50vw',
      }}> 
        <Camera 
          sendEmotion={handleEmotion}
        />
        <EmotionsFeed
          emotions = {emotions}
        />
      </div>
    </>
  )
}

export default App
