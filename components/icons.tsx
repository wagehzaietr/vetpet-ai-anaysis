import Image from "next/image";



export const UploadSvg = () =>{
    return (
        <Image loading="lazy"  src="/upload.svg" alt="Upload" width={600} height={500} />
    )
}

export const BarinSvg = () =>{
    return (
        <Image loading="lazy"  src="/brain.svg" alt="Upload" width={500} height={500} />
    )
}

export const ChatSvg = () =>{
    return (
        <Image loading="lazy" src="/chat.svg" alt="Upload" width={500} height={500} />
    )
}


export const Logo = () =>{
    return(
        <Image loading="lazy" src="/headerlogo.png" alt="Upload" width={500} height={500} />
    )
}