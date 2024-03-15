import Image from 'next/image'

export default function DetailTitle({text}:{text:string}) {
    let img = text === '住所' ? (
        'Address.svg'
    ) : text === 'アクセス' ? (
        'Access.svg'
    ) : text === '営業時間・定休日' ? (
        'Time.svg'
    ) : text === '予算' ? (
        'Money.svg'
    ) : text === '設備' ? (
        'Setting.svg'
    ) : text === '総席数' ? (
        'Seat.svg'
    ) : text === 'カード決済' && (
        'Card.svg'
    )

    const size = text === '住所' ? (
        `after:w-[80px]`
    ) : text === 'アクセス' ? (
        `after:w-[130px]`
    ) : text === '営業時間・定休日' ? (
        'after:w-[240px]'
    ) : text === '予算' ? (
        'after:w-[80px]'
    ) : text === '設備' ? (
        'after:w-[80px]'
    ) : text === '総席数' ? (
        'after:w-[100px]'
    ) : text === 'カード決済' && (
        'after:w-[140px]'
    )

    return (
        <div className={`relative flex flex-row gap-2 after:content-[''] after:absolute after:top-0 after:left-0 ${size} after:h-full after:block after:border-b-[5px] after:border-[#BDFF00] items-center`}>
            <Image src={`/svg/${img}`} alt={text} width={24} height={24}></Image>
            <p className="text-xl tracking-small">{text}</p>
        </div>
    )
}