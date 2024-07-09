export function isValidUrl(sample: string): boolean {
    // URL validation logic
    return /^http?:\/\/\w+(\.\w+)*(:[0-9]+)?(\/.*)?$/.test(sample)
}

export function isValidPhone(sample: string): boolean {
    // Adjust regex based on your phone number criteria
    return /^\d{10}$/.test(sample) // Example for a 10-digit phone number
}

export function isValidDNI(sample: string): boolean {
    // Simple DNI validation for digits only
    return /^\d+$/.test(sample)
}

export function isBuffer(obj: any, key: string): boolean {
    return obj.hasOwnProperty(key) && Buffer.isBuffer(obj[key])
}
