import { useEffect, useState, useRef } from 'react';
import styles from './EmotionsFeed.module.css'; // Import the CSS module

const pillOptions = [
    "happy",
    "sad",
    "angry",
    "fearful",
    "disgusted",
    "surprised",
    "neutral"
];

const EmotionsFeed = () => {
    const [emotions, setEmotions] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setEmotions(prevEmotions => {
                const newEmotion = pillOptions[Math.floor(Math.random() * pillOptions.length)];
                return [...prevEmotions, newEmotion];
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollLeft = containerRef.current.scrollWidth;
        }
    }, [emotions]);

    return (
        <div className='card2'>
            <h1>Emotions Feed</h1>
            <div
                ref={containerRef}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    alignItems: 'center',
                    overflowX: 'scroll',
                    height: '100%',
                    width: '100%',
                }}
                className={styles.hideScrollbar} // Apply the CSS module class
            >
                {emotions.map((emotion, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100px',
                            height: '100px',
                            margin: '10px',
                            padding: '10px',
                            border: index === emotions.length - 1 ? '2px solid green' : '1px solid black', // Green border for the last emotion
                            borderRadius: '5px',
                        }}
                        
                    >
                        <img
                            src={`./src/assets/${emotion.toLowerCase()}.png`} // Updated path
                            alt={emotion}
                            className={styles.emotionImage} // Apply the CSS module class
                        />
                        <p>{emotion}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmotionsFeed;