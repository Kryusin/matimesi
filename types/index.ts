export type LocationProps = {
    longitude?:number;
    latitude?:number;
}

type areaProps = {
    code: string;
    name: string;
}

export type EnterpriseProps = {result:number,shop:ShopProps[]}

export type ShopProps = {
    // お店のID
    id: string;
    // お店の名前
    name: string;
    // お店の名前（カナ）
    name_kana: string;
    // お店の住所
    address: string;
    // lat: number;
    // lng: number;
    // お店のジャンル
    genre: {
        code: string;
        name: string;
        catch: string;
    };
    // 予算
    budget: {
        average: string;
        name: string;
        code: string;
    };
    // お店の総席数
    capacity: number;
    // お店のアクセス方法
    access: string;
    // お店の携帯用アクセス方法
    mobile_access: string;
    // お店のホットペッパーのURL
    urls: {
        pc: string;
    };
    // お店の写真
    photo: {
        pc: {
            l: string;
            m: string;
            s: string;
        };
        mobile: {
            l: string;
            s: string;
        };
    };
    // お店の営業時間
    open: string;
    // お店の定休日
    close: string;
    // 飲み放題
    free_drink: string;
    // 食べ放題
    free_food: string;
    // 個室有無
    private_room: string;
    // 掘りごたつ有無
    horigotatsu: string;
    // 座敷有無
    tatami: string;
    // カード利用可否
    card: string;
    // 禁煙席有無
    non_smoking: string;
    // 貸切可否
    charter: string;
    // 駐輪所有無
    parking: string;
    // バリアフリー有無
    barrier_free: string;
    // カラオケ有無
    karaoke: string;
    // TV・プロジェクター有無
    tv: string;
    // lunch有無
    lunch: string;
    // 23時以降営業有無
    midnight: string;
    // お店のペット可否
    pet: string;
    // お店の子供可否
    child: string;
    // お店のwifi有無
    wifi: string;
    // // お店のクーポンのURL
    // coupon_urls: {
    //     pc: string;
    //     sp: string;
    // };
    // お店までの距離
    distance?: number;
}