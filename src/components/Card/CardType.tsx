
export type CardType = {
    code?: string, 
    image: string,
    images?: imageOptions,
    value: number, 
    suit: string
}

type imageOptions = {
    png: string,
    svg: string
}