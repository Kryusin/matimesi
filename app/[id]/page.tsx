'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { EnterpriseProps, ShopProps } from "@/types";
import { getDetailData } from "@/scripts/getData";
import DetailTitle from "@/components/DetailTitle";

export default function Page({params}: {params: {id: string}}) {
    const [data, setData] = useState<ShopProps>();
    useEffect(() => {
        const id = params.id;
        getDetailData({id}).then((detail) => {
            setData(detail);
        })
    }, [params.id])

    return (data &&
        <div className="flex flex-col w-full justify-center text-[#28282B]">
            <div className="w-full p-[30px] flex flex-row justify-between items-start">
                <Link href="/" className="flex gap-3 items-center flex-[1_0_0]"><Image src='/svg/arrow.svg' alt="back" width={24} height={24}></Image>戻る</Link>
                <div className="flex flex-col gap-6 flex-[1_0_0] justify-center items-center">
                    <p className="tracking-default text-[#888888]">{data.genre.name}</p>
                    <h1 className="text-2xl tracking-default">{data.name}</h1>
                </div>
                <div className="flex-[1_0_0]"></div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 px-[8%]">
                <div className="w-full lg:w-[45%] flex flex-col gap-4">
                    <Image src={data.photo.pc.l} alt={data.name} width={100} height={100} className="w-full h-[400px] object-cover rounded-3xl"></Image>
                    <div className="w-[500px] flex flex-col gap-[30px] lg:p-6">
                        <div className="flex flex-col gap-4">
                            <DetailTitle text="住所" />
                            <p className="tracking-default">{data.address}</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <DetailTitle text="アクセス" />
                            <p className="tracking-default">{data.access}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-[45%] flex flex-col gap-[30px]">
                    <div className="flex flex-col gap-4">
                        <DetailTitle text="営業時間・定休日" />
                        <p className="tracking-default">{data.open}</p>
                        <p className="tracking-default text-[#FF0000]">※{data.midnight === '営業している' ? '23時以降も営業' : '23時以降は営業していません'}</p>
                        <p className="tracking-default">{data.close}</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <DetailTitle text="予算" />
                        <p className="tracking-default">{data.budget.name || '特にございません'}</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <DetailTitle text="設備" />
                        <p className="tracking-default">
                            食べ放題{data.free_drink}・
                            飲み放題{data.free_drink}・
                            個室{data.private_room}・
                            掘りごたつ{data.horigotatsu}・
                            座敷{data.tatami}・
                            {data.non_smoking}・
                            駐車場{data.parking}・
                            {data.charter}・
                            ペット{data.pet}・
                            TV・プロジェクター{data.tv}・
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <DetailTitle text="総席数" />
                        <p className="tracking-default">{data.capacity}席</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <DetailTitle text="カード決済" />
                        <p className="tracking-default">{data.card}</p>
                    </div>
                </div>
            </div>
            <Link href={data.urls.pc} target="_blank" className="flex gap-2 items-center p-4 lg:p-6 bg-[#D0111B] rounded-[80px] fixed bottom-6 right-6"><Image src='/svg/hotpeppericon.svg' alt={data.name} width={32} height={32}></Image><p className="hidden lg:block tracking-default text-white">ホットペッパーで予約する</p></Link>
        </div>
    )
}