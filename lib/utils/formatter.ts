export function capitalize(text: string) {
    const words = text.toLowerCase().split(' ')

    const capitalizedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    })

    const capitalizedText = capitalizedWords.join(' ')

    return capitalizedText
}

export const currency = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 2,
})

export const number = new Intl.NumberFormat()
