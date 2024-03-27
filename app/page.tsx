/**
 * 近くのレストランを検索するページ
 * @module @/app/page
 * @return {JSX.Element} - 近くのレストランを検索するページ
 */

'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { EnterpriseProps } from "@/types";
import axios from "axios";
import getData from "@/lib/getData";
import Card from "@/components/Card";

export default function Home() {
  const [enterpriseInfo, setEnterpriseInfo] = useState<EnterpriseProps>({result:0, shop:[]});
  const [keyword, setKeyword] = useState<string>('');
  const [range, setRange] = useState<string>('0');
  const [rangeDisp, setRangeDisp] = useState<number>(300);
  const [order, setOrder] = useState<string>('1')
  const [start, setStart] = useState<number>(1);
  const [error, setError] = useState<string>('');

  /**
  * 検索ボタンがクリックされた時の処理
  * @return {Promise<void>} - 近くのレストランを検索する
  */
  const searchClick = async() => {
    // geolocationが使えるかどうか
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // 取得成功した場合
        async function(position) {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          // 店舗情報を取得
          await getData({keyword, lat, lng, range, order, start:1})
          .then((data) => {
            // エラーが返ってきた場合
            if(data === '検索範囲を指定するかキーワードを入力して下さい。') {
              setError(data);
            } else {
              // 正常にデータが取得できた場合
              setEnterpriseInfo(data);
              const rangeDisp = range === '1' ? 300 : range === '2' ? 500 : range === '3' ? 1000 : range === '4' ? 2000 : 3000;
              // 検索範囲をセット
              setRangeDisp(rangeDisp);
              // スタート位置をセット
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

  /**
  * もっと見るボタンがクリックされた時の処理
  * @return {Promise<void>} - start位置を基に店舗情報を取得
  */
  const getMore = async() => {
    // geolocationが使えるかどうか
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // 取得成功した場合
        async function(position) {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          // 店舗情報を取得
          await getData({keyword, lat, lng, range, order, start})
          .then((data) => {
            // 正常にデータが取得できた場合
            setEnterpriseInfo({...enterpriseInfo,shop:[...enterpriseInfo.shop, ...data.shop]});
            // スタート位置をセット
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

  /**
  * エラーメッセージを非表示にする
  * @return {void} - エラーメッセージを非表示にする
  */
  const errorDelete = () => {
    const errorDisp = document.querySelector('.error');
    errorDisp?.classList.add('animate-fadeOut');
    setTimeout(() => {
      setError('')
    }, 500)
  }

  /**
  * トップに戻る
  * @return {void} - トップに戻る
  */
  const returnTop = () => {
    window.scrollTo(0, 0);
  }

  return (
    <>
      {error.length > 0 && <div className="absolute bottom-[5px] right-[5px] animate-fadeIn px-4 py-4 bg-red-300 rounded-xl flex flex-row gap-2 error z-20"><p>{error}</p><Image src="/svg/cancel.svg" alt="cancel" width={24} height={24} onClick={errorDelete} className="cursor-pointer"></Image></div>}
      <header className="fixed top-2  bg-white rounded-xl w-[90%] mx-[5%] h-[68px] flex items-center px-[21px] justify-between shadow-[10px_10px_50px_0px_rgba(0,0,0,0.13)] z-10">
        <h1 className="tracking-default text-2xl">まちめし</h1>
        <button onClick={returnTop} className="text-[#3f3f3f] tracking-default">Topへ戻る</button>
      </header>
      <main className="absolute top-32 w-full h-full flex flex-col items-center gap-[55px] pb-4">
        <div className="w-full flex flex-col justify-center px-[12%]">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col lg:flex-row gap-5 bg-[#F3F4F3] rounded-lg lg:rounded-full justify-between lg:px-1 items-center py-4 lg:py-0">
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-5">
                <div className="flex flex-row items-center h-[40px] rounded-full overflow-hidden px-2">
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
                    className="w-full lg:h-[30px] focus:outline-none bg-[#F3F4F3] text-[#3f3f3f]"
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="レストラン 大阪"
                  />
                </div>
                <div className="flex flex-row gap-5">
                  <select
                    name="scope"
                    id=""
                    className="lg:w-[100px] h-[40px] rounded-full text-center bg-[#F3F4F3] text-[#9CA3AF] focus:text-[#3f3f3f] px-2 focus:outline-none"
                    onChange={(e) => setRange(e.target.value)}
                    value={range}
                  >
                    <option value="" className="text-gray-400" disabled>範囲指定</option>
                    <option value="0" defaultChecked>指定なし</option>
                    <option value="1">300m</option>
                    <option value="2">500m</option>
                    <option value="3">1000m</option>
                    <option value="4">2000m</option>
                    <option value="5">3000m</option>
                  </select>
                  <select
                    name="order"
                    id=""
                    className="lg:w-[100px] h-[40px] rounded-full text-center bg-[#F3F4F3] text-[#9CA3AF] focus:text-[#3f3f3f] px-2 focus:outline-none"
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
              </div>
              <button onClick={searchClick} className="w-[70%] lg:w-auto flex justify-center pl-4 pr-2 py-0.5 bg-black/30 hover:bg-black duration-200 text-white rounded-full text-lg tracking-default">検索</button>
            </div>
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
