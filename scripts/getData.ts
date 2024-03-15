'use server'
import { EnterpriseProps } from '@/types';
import axios from 'axios';

const EARTH_RADIUS = 6378.137;

export default async function getData({keyword, lat, lng, range, order, start}:{keyword:string, lat:number, lng:number, range:string, order:string, start:number}) {
    // ホットペッパーグルメAPIを叩く
    const response = await axios.get('https://webservice.recruit.co.jp/hotpepper/gourmet/v1/', {
      params: {
        key: process.env.NEXT_PUBLIC_API_KEY,
        keyword: keyword,
        lat: lat,
        lng: lng,
        range: range,
        order: order,
        count: 10,
        start: start,
        format: 'json',
      },
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

// 特定の店舗の情報を取得する関数
export async function getDetailData({id}:{id:string}) {
    const response = await axios.get('https://webservice.recruit.co.jp/hotpepper/gourmet/v1/', {
        params: {
            key: process.env.NEXT_PUBLIC_API_KEY,
            id: id,
            format: 'json',
        },
    });
    const data = response.data.results.shop[0];
    const returnData = {
        id: data.id,
        name: data.name,
        name_kana: data.name_kana,
        address: data.address,
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

// 位置情報を取得する関数
const deg2rad = (deg:number) => {
    return deg * (Math.PI/180);
}

// 2点間の距離を求める関数
const cal_distance = (x1:number, y1:number, x2:number, y2:number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const a = Math.pow(Math.sin(dy/2), 2) + Math.cos(y1) * Math.cos(y2) * Math.pow(Math.sin(dx/2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = EARTH_RADIUS * c;
    return Math.round(d * 1000);
}