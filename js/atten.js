let videoStream;
let isCapturing = false;

document.getElementById('startButton').addEventListener('click', startCapture);
document.getElementById('stopButton').addEventListener('click', stopCapture);

function startCapture() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            videoStream = stream;
            document.getElementById('cameraPrompt').style.display = 'none';
            document.getElementById('stopButton').removeAttribute('disabled');
            isCapturing = true;

            const videoElement = document.getElementById('video');
            videoElement.srcObject = stream;

            // Draw video frames on the canvas
            const canvasContext = videoElement.getContext('2d');

            // Start drawing video frames
            function drawVideoFrame() {
                if (isCapturing) {
                    canvasContext.drawImage(videoElement, 0, 0, videoElement.width, videoElement.height);
                    requestAnimationFrame(drawVideoFrame);
                }
            }

            // Start drawing video frames
            drawVideoFrame();
        })
        .catch(error => console.error('Error accessing camera:', error));
}

function stopCapture() {
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        document.getElementById('cameraPrompt').style.display = 'block';
        document.getElementById('stopButton').setAttribute('disabled', 'disabled');
        isCapturing = false;

        // Clear the canvas
        const videoElement = document.getElementById('video');
        const canvasContext = videoElement.getContext('2d');
        canvasContext.clearRect(0, 0, videoElement.width, videoElement.height);
    }
}
