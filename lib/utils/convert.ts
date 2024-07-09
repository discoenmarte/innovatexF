export class Convert {
    // Conver class to json
    public static objectToJson(value: any): any {
        const valueString = JSON.stringify(value)
        const obj = JSON.parse(valueString)
        return obj
    }

    // Allow encode json data to be passed through URL parameters
    public static encodeURIJSON(obj: any): string {
        return encodeURIComponent(JSON.stringify(obj))
    }

    // Allow decode URL parameters to json data
    public static decodeURIJSON(obj: string): any {
        return JSON.parse(decodeURIComponent(obj))
    }

    public static blobToBuffer(blob: Blob): Promise<ArrayBuffer> {
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

    public static BufferToBlob(buffer: ArrayBuffer): Blob {
        return new Blob([buffer])
    }

    public static blobToBase64(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (event.target?.result) {
                    const result = event.target?.result as string
                    const base64Data = result.split(',')[1] // Removemos el prefijo 'data:*/*;base64,'
                    resolve(base64Data)
                }
            }

            reader.onerror = () => {
                reject(reader.error)
            }

            reader.readAsDataURL(blob)
        })
    }

    public static base64ToBlob(base64: string, mimeType = 'image/jpeg'): Blob {
        const binaryString = atob(base64)
        const bytes = new Uint8Array(binaryString.length)

        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i)
        }

        return new Blob([bytes], { type: mimeType })
    }
}
