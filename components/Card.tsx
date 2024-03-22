/**
 * カードコンポーネント.
 * @module @/components/Card
 * @param {EnterpriseProps} enterpriseInfo - ひとつの店舗情報.
 * @param {number} rangeDisp - 検索範囲
 * @return {JSX.Element} - カードコンポーネント.
 */

import Image from "next/image"
import Link from "next/link"
import { KiwiMaru } from "@/lib/fonts"

import { EnterpriseProps, ShopProps } from "@/types"

export default function Card({enterpriseInfo, rangeDisp}: {enterpriseInfo:EnterpriseProps, rangeDisp:number}) {
    return (
        <div className="lg:w-[1134px] flex flex-col justify-center items-center gap-4">
            <p className="w-[350px] text-sm lg:text-lg tracking-default text-gray-600">{rangeDisp}m以内　{enterpriseInfo.shop.length}件/{enterpriseInfo.result}件中</p>
            <div className="w-full overflow-visible flex flex-row justify-center lg:justify-normal py-[30px] flex-wrap gap-10">
                {enterpriseInfo.shop.map((info:ShopProps) => (
                  <Link href={`/${info.id}`} className="relative w-[350px] rounded-2xl shadow-[10px_10px_50px_0px_rgba(0,0,0,0.13)] overflow-hidden" key={info.id}>
                    <div className="absolute w-full flex justify-end top-60 lg:top-7 -right-28 lg:-right-14"><div className="w-[200px] h-[30px] bg-[#ACACF8] lg:rotate-45 lg:text-center font-bold pl-2 lg:pl-0 rounded-l-lg">{info.distance}m</div></div>
                    <div className="flex flex-col gap-5">
                      <Image
                        src={info.photo.pc.l}
                        alt={info.name}
                        width={210}
                        height={210}
                        className="w-full h-[210px] rounded-t-lg object-cover">
                      </Image>
                      <div className="flex flex-col gap-4 justify-between flex-[1_0_0] px-4 pb-4">
                        <div className="flex flex-col pl-2">
                          <p className="text-xs tracking-default">{info.name_kana}</p>
                          <p className={`text-2xl tracking-defaultn ${KiwiMaru.className}`}>{info.name}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                          <Image src='/svg/shop-gray.svg' alt='住所' width={16} height={16} className="text-gray-400"></Image>
                          <p className="tracking-small items-stretch text-sm text-[#404040]">{info.address}</p>
                        </div>
                        <hr className="w-full" />
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col flex-1">
                                <p className="text-xs tracking-default text-gray-400">定休日</p>
                                <p className="tracking-small items-stretch">{info.close}</p>
                            </div>
                            <div className="flex flex-col flex-1">
                                <p className="text-xs tracking-default text-gray-400">予算</p>
                                <p className="tracking-small items-stretch">{info.budget.average || 'なし'}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-stretch">
                          <p className="text-xs tracking-small text-gray-400">アクセス</p>
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