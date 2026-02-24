
async function getStream() {
    const stream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: true,
    })

    window._js_stream = stream
    return stream
}

async function applyConstraints() {
    const stream = window._js_stream
    stream.getVideoTracks().forEach((t) => {
        t.applyConstraints({
            width: { max: 480 },
            height: { max: 360 },
        }).then(console.log)
    })
}

async function record(second = 3) {
    const chunks = []
    const stream = window._js_stream
    const options = { mimeType: 'video/webm; codecs=vp9' }
    // const options = {
    //     mimeType: 'video/webm; codecs=h264',
    //     videoBitsPerSecond: 8000000,
    // }
    const recorder = new MediaRecorder(stream, options)
    recorder.start()
    recorder.ondataavailable = (e) => {
        chunks.push(e.data)
    }

    window._js_chunks = chunks
    setTimeout(() => {
        recorder.stop()
        console.log('record done')
    }, second * 1000)
}

function downloadVideo(file = 'a.mp4') {
    const chunks = window._js_chunks
    const blob = new Blob(chunks)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = file
    a.click()
}