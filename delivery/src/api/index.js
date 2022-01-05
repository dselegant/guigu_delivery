import ajax from './ajax';
// 1、根据经纬度获取位置详情
export const reqAddress = geohash => ajax(`/api/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodCategories = () => ajax('/api/index_category')
// 3、根据经纬度获取商铺列表
export const reqShops = (latitude, longitude) => ajax('/api/shops', {
    latitude,
    longitude
})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (keyword, geohash) => ajax('/api/search_shops', { keyword, geohash });
// 5、用户名密码登陆
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax('/api/login_pwd', { name, pwd, captcha }, 'POST');
// 6、发送短信验证码
export const reqSendCode = (phone) => ajax('/api/sendcode', { phone });
// 7、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax('/api/login_sms', {
    phone, code
}, 'POST')
// 8、根据会话获取用户信息
export const reqUserInfo = () => ajax('/api/userinfo')
// 9、用户登出
export const reqLogout = () => ajax('/api/logout')
/**
 10.* 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')

/**
 11.* 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')

/**
 12.* 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')


