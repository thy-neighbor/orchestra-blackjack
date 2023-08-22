export type CardType = {
    code?: string, 
    image: string,
    images?: imageOptions,
    value: string, 
    suit: string
}

type imageOptions = {
    png: string,
    svg: string
}