import { useEffect, useRef } from "react";
import styles from "./Camera.module.css";

const Camera = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Access the user's camera
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((error) => {
                console.error("Error accessing the camera: ", error);
            });

        // Capture a photo every 2 seconds
        const interval = setInterval(() => {
            captureAndSendPhoto();
        }, 2000);

        // Cleanup the interval on unmount
        return () => clearInterval(interval);
    }, []);

    const captureAndSendPhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            if (context) {
                // Set canvas dimensions to match the video
                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;

                // Draw the current video frame onto the canvas
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

                // Convert the canvas image to base64
                const imageData = canvas.toDataURL("image/png");

                // Send the image to the API
                sendPhotoToAPI(imageData);
            }
        }
    };

    const sendPhotoToAPI = (imageData: string) => {
        // Replace 'your-api-endpoint' with the actual API URL
        fetch("your-api-endpoint", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: imageData }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Emotion analysis result:", data);
            })
            .catch((error) => {
                console.error("Error sending photo to API: ", error);
            });
    };

    return (
        <div>
            <video ref={videoRef} autoPlay className={styles.video} />
            <canvas ref={canvasRef} style={{ display: "none" }} /> {/* Hidden canvas for capturing images */}
        </div>
    );
};

export default Camera;