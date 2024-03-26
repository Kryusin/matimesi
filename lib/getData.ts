'use server'
import { EnterpriseProps, ParamsProps, ShopProps } from '@/types';
import axios from 'axios';

// 地球の半径
const EARTH_RADIUS = 6378.137;

/**
* ホットペッパーグルメAPIを叩く関数
* @param {string} keyword - 入力済みのキーワード
* @param {number} lat - 緯度
* @param {number} lng - 経度
* @param {string} range - 検索範囲
* @param {string} order - 並び順
* @param {number} start - 取得開始位置
* @return {Promise<EnterpriseProps> | string} - 取得したデータ or エラーメッセージ
*/
export default async function getData({keyword, lat, lng, range, order, start}:{keyword:string, lat:number, lng:number, range:string, order:string, start:number}):Promise<EnterpriseProps | string>{
    if(range === '0' && keyword === '') {
        return '検索範囲を指定するかキーワードを入力して下さい。'
    }
    // ホットペッパーグルメAPIを叩く
    let params:ParamsProps = {
        key: process.env.NEXT_PUBLIC_API_KEY!,
        order: order,
        count: 10,
        start: start,
        format: 'json',
        keyword: keyword
    }

    if(range !== '0') {
        params.lat = lat;
        params.lng = lng;
        params.range = range;
    }
    console.log(params)
    const response = await axios.get('https://webservice.recruit.co.jp/hotpepper/gourmet/v1/', {
      params: {...params},
    });
    // データを整形(型の説明は/types/index.tsに記載しています)
    const data:EnterpriseProps = {result:response.data.results.results_available, shop:[...response.data.results.shop].map((shop) => {
        // 距離の計算(経度(latitude)・緯度(longitude))
        const distance = [deg2rad(lat), deg2rad(lng), deg2rad(shop.lat), deg2rad(shop.lng)];
        const calced_distance = cal_distance(distance[1], distance[0], distance[3], distance[2]);
        return {
            id: shop.id,
            name: shop.name,
            name_kana: shop.name_kana,
            address: shop.address,
            genre: {
                code: shop.genre.code,
                name: shop.genre.name,
                catch: shop.genre.catch,
            },
            budget: {
                average: shop.budget.average,
                name: shop.budget.name,
                code: shop.budget.code,
            },
            capacity: shop.capacity,
            access: shop.access,
            mobile_access: shop.mobile_access,
            urls: {
                pc: shop.urls.pc,
            },
            photo: {
                pc: {
                    l: shop.photo.pc.l,
                    m: shop.photo.pc.m,
                    s: shop.photo.pc.s,
                },
                mobile: {
                    l: shop.photo.mobile.l,
                    s: shop.photo.mobile.s,
                },
            },
            open: shop.open,
            close: shop.close,
            free_drink: shop.free_drink,
            free_food: shop.free_food,
            private_room: shop.private_room,
            horigotatsu: shop.horigotatsu,
            tatami: shop.tatami,
            card: shop.card,
            non_smoking: shop.non_smoking,
            charter: shop.charter,
            parking: shop.parking,
            barrier_free: shop.barrier_free,
            karaoke: shop.karaoke,
            tv: shop.tv,
            lunch: shop.lunch,
            midnight: shop.midnight,
            pet: shop.pet,
            child: shop.child,
            wifi: shop.wifi,
            distance: calced_distance,
        }
    })};
    return data;
}

/**
* 特定の店舗の情報を取得する関数
* @param {string} id - 店舗ID
* @return {Promise<ShopProps>} - 取得したデータ
*/
export async function getDetailData({id}:{id:string}):Promise<ShopProps> {
    const response = await axios.get('https://webservice.recruit.co.jp/hotpepper/gourmet/v1/', {
        params: {
            key: process.env.NEXT_PUBLIC_API_KEY,
            id: id,
            format: 'json',
        },
    });
    const data = response.data.results.shop[0];
    const returnData:ShopProps = {
        id: data.id,
        name: data.name,
        name_kana: data.name_kana,
        address: data.address,
        lat: data.lat,
        lng: data.lng,
        genre: {
            code: data.genre.code,
            name: data.genre.name,
            catch: data.genre.catch,
        },
        budget: {
            average: data.budget.average,
            name: data.budget.name,
            code: data.budget.code,
        },
        capacity: data.capacity,
        access: data.access,
        mobile_access: data.mobile_access,
        urls: {
            pc: data.urls.pc,
        },
        photo: {
            pc: {
                l: data.photo.pc.l,
                m: data.photo.pc.m,
                s: data.photo.pc.s,
            },
            mobile: {
                l: data.photo.mobile.l,
                s: data.photo.mobile.s,
            },
        },
        open: data.open,
        close: data.close,
        free_drink: data.free_drink,
        free_food: data.free_food,
        private_room: data.private_room,
        horigotatsu: data.horigotatsu,
        tatami: data.tatami,
        card: data.card,
        non_smoking: data.non_smoking,
        charter: data.charter,
        parking: data.parking,
        barrier_free: data.barrier_free,
        karaoke: data.karaoke,
        tv: data.tv,
        lunch: data.lunch,
        midnight: data.midnight,
        pet: data.pet,
        child: data.child,
        wifi: data.wifi,
    };
    return returnData;
}

/**
* 角度を度からラジアンに変換するための関数
* @param {number} deg - 度数値
* @return {number} - ラジアンに変換された値
*/
const deg2rad = (deg:number):number => {
    return deg * (Math.PI/180);
}

/**
* 2点間の距離を求める関数
* @param {number} x1 - 現在地の経度
* @param {number} y1 - 現在地の緯度
* @param {number} x2 - 店舗の経度
* @param {number} y2 - 店舗の緯度
* @return {number} - 2点間の距離
*/
const cal_distance = (x1:number, y1:number, x2:number, y2:number):number => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const a = Math.pow(Math.sin(dy/2), 2) + Math.cos(y1) * Math.cos(y2) * Math.pow(Math.sin(dx/2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = EARTH_RADIUS * c;
    return Math.round(d * 1000);
}