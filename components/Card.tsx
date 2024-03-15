import Image from "next/image"
import Link from "next/link"

import { EnterpriseProps, ShopProps } from "@/types"

export default function Card({enterpriseInfo, rangeDisp}: {enterpriseInfo:EnterpriseProps, rangeDisp:number}) {
    return (
        <div className="lg:w-[1134px] flex flex-col gap-10">
            <p className="text-base lg:text-lg tracking-default pl-8">{rangeDisp}m以内　{enterpriseInfo.shop.length}件/{enterpriseInfo.result}件中</p>
            <div className="lg:w-[1134px] overflow-visible flex flex-col px-[30px] py-[30px] flex-wrap gap-14">
                {enterpriseInfo.shop.map((info:ShopProps) => (
                  <Link href={`/${info.id}`} className="relative w-full rounded-2xl px-3 py-3 shadow-[10px_10px_50px_0px_rgba(0,0,0,0.13)] overflow-hidden" key={info.id}>
                    <div className="absolute w-full flex justify-end top-60 lg:top-7 -right-28 lg:-right-14"><div className="w-[200px] h-[30px] bg-[#0000FF]/30 lg:rotate-45 lg:text-center font-bold pl-2 lg:pl-0 rounded-l-lg">{info.distance}m</div></div>
                    <div className="flex flex-col lg:flex-row gap-5">
                      <Image
                        src={info.photo.pc.l}
                        alt={info.name}
                        width={210}
                        height={210}
                        className="w-full lg:w-[210px] h-[210px] rounded-lg object-cover">
                      </Image>
                      <div className="flex flex-col gap-4 justify-between flex-[1_0_0]">
                        <div className="flex flex-col border-l-4 border-yellow-300 pl-2">
                          <p className="text-xs tracking-default">{info.name_kana}</p>
                          <p className="text-2xl tracking-default">{info.name}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                          <Image src='/svg/shop-gray.svg' alt='住所' width={24} height={24} className="text-gray-400"></Image>
                          <p className="tracking-small items-stretch">{info.address}</p>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <div className="flex flex-col flex-1">
                                <p className="text-sm tracking-default text-gray-400">定休日</p>
                                <p className="tracking-small items-stretch">{info.close}</p>
                            </div>
                            <div className="flex flex-col flex-1">
                                <p className="text-sm tracking-default text-gray-400">予算</p>
                                <p className="tracking-small items-stretch">{info.budget.average || 'なし'}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-stretch">
                          <p className="text-sm tracking-small text-gray-400">アクセス</p>
                          <p className="tracking-small items-stretch">{info.access}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
    )
}