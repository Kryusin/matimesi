'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { EnterpriseProps } from "@/types";
import axios from "axios";
import getData from "@/scripts/getData";
import Card from "@/components/Card";

export default function Home() {
  const [enterpriseInfo, setEnterpriseInfo] = useState<EnterpriseProps>({result:0, shop:[]});
  const [keyword, setKeyword] = useState<string>('');
  const [range, setRange] = useState<string>('0');
  const [rangeDisp, setRangeDisp] = useState<number>(300);
  const [currentLocation, setCurrentLocation] = useState({latitude: 0, longitude: 0});
  const [order, setOrder] = useState<string>('1')
  const [start, setStart] = useState<number>(1);
  const [error, setError] = useState<string>('');

  const searchClick = async() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // 取得成功した場合
        async function(position) {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          await getData({keyword, lat, lng, range, order, start:1})
          .then((data) => {
            if(data === '検索範囲を指定するかキーワードを入力して下さい。') {
              setError(data);
            } else {
              setEnterpriseInfo(data);
              const rangeDisp = range === '1' ? 300 : range === '2' ? 500 : range === '3' ? 1000 : range === '4' ? 2000 : 3000;
              setRangeDisp(rangeDisp);
              setStart(11);
            }
          })
        },
        // 取得失敗した場合
        function(error) {
          switch(error.code) {
            case 1: //PERMISSION_DENIED
              alert("位置情報の利用が許可されていません");
              break;
            case 2: //POSITION_UNAVAILABLE
              alert("現在位置が取得できませんでした");
              break;
            case 3: //TIMEOUT
              alert("タイムアウトになりました");
              break;
            default:
              alert("その他のエラー(エラーコード:"+error.code+")");
              break;
          }
        }
      );
    }
  }

  const getMore = async() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // 取得成功した場合
        async function(position) {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          await getData({keyword, lat, lng, range, order, start})
          .then((data) => {
            setEnterpriseInfo({...enterpriseInfo,shop:[...enterpriseInfo.shop, ...data.shop]});
            setStart(start+10);
          })
        },
        // 取得失敗した場合
        function(error) {
          switch(error.code) {
            case 1: //PERMISSION_DENIED
              alert("位置情報の利用が許可されていません");
              break;
            case 2: //POSITION_UNAVAILABLE
              alert("現在位置が取得できませんでした");
              break;
            case 3: //TIMEOUT
              alert("タイムアウトになりました");
              break;
            default:
              alert("その他のエラー(エラーコード:"+error.code+")");
              break;
          }
        }
      );
    }
  }

  const errorDelete = () => {
    const errorDisp = document.querySelector('.error');
    errorDisp?.classList.add('animate-fadeOut');
    setTimeout(() => {
      setError('')
    }, 500)
  }

  return (
    <>
      {error.length > 0 && <div className="absolute top-[5px] right-[5px] animate-fadeIn px-4 py-4 bg-red-300 rounded-xl flex flex-row gap-2 error"><p>{error}</p><Image src="/svg/cancel.svg" alt="cancel" width={24} height={24} onClick={errorDelete} className="cursor-pointer"></Image></div>}
      <header className="w-full h-[68px] flex items-center pl-[21px]">
        <h1 className="tracking-default text-2xl">まちめし</h1>
      </header>
      <main className="w-full h-full flex flex-col items-center gap-[55px] pb-4">
        <div className="w-full lg:h-[350px] bg-[url(/svg/main.svg)] bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center gap-[31px] py-6">
          <h1 className="tracking-default text-2xl text-white">近くにあるレストランを探す</h1>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col lg:flex-row gap-5 justify-between">
              <div className="flex flex-row bg-white rounded-2xl overflow-hidden px-2">
                <Image
                  src="/svg/search.svg"
                  alt="search"
                  width={24}
                  height={24}
                />
                <input
                  type="text"
                  name="keyword"
                  value={keyword}
                  className="w-full h-[50px] lg:h-[63px] focus:outline-none"
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="キーワードを入力"
                />
              </div>
              <select
                name="scope"
                id=""
                className="lg:w-[100px] h-[50px] lg:h-[63px] bg-white rounded-2xl text-center"
                onChange={(e) => setRange(e.target.value)}
                value={range}
              >
                <option value="0" defaultChecked>範囲を指定しない</option>
                <option value="1">300m</option>
                <option value="2">500m</option>
                <option value="3">1000m</option>
                <option value="4">2000m</option>
                <option value="5">3000m</option>
              </select>
              <select
                name="order"
                id=""
                className="lg:w-[100px] h-[50px] lg:h-[63px] bg-white rounded-2xl text-center"
                onChange={(e) => setOrder(e.target.value)}
                value={order}
              >
                <option value="" className="text-gray-400" disabled>検索順</option>
                <option value="1">店名かな順</option>
                <option value="2">ジャンルコード順</option>
                <option value="3" defaultChecked>小エリアコード順</option>
                <option value="4">おすすめ順</option>
              </select>
            </div>
            <button onClick={searchClick} className="w-full h-[50px] bg-blue-300 text-white rounded-xl">検索</button>
          </div>
        </div>
        {enterpriseInfo.shop.length > 0 ? (
          <>
            <Card enterpriseInfo={enterpriseInfo} rangeDisp={rangeDisp} />
            {enterpriseInfo.shop.length < enterpriseInfo.result && (
              <button onClick={getMore} className="w-[440px] lg:w-[1074px] bg-white border-2 border-blue-300 rounded-2xl py-4 hover:bg-blue-300 hover:text-white duration-300">もっと見る</button>
            )}
          </>
        ) : (
          <div className="w-full h-[200px] flex flex-col items-center justify-center gap-4">
            <Image src="/svg/shop.svg" alt="shop" width={100} height={100} className=""></Image>
            <p className="tracking-default">お店が見つかりませんでした。</p>
          </div>
        )}
      </main>
    </>
  );
}
