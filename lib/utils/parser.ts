export function blobToBuffer(blob: Blob) {
    return new Promise((resolve, reject) => {
        const reader: FileReader = new FileReader()

        reader.onload = (event: ProgressEvent<FileReader>) => {
            const buffer = event.target?.result as ArrayBuffer
            resolve(buffer)
        }

        reader.onerror = () => {
            reject(reader.error)
        }

        reader.readAsArrayBuffer(blob)
    })
}
