import Vue from "vue";

export function saveCount(shopId,cartFoods) {
  const countObj = cartFoods.reduce((pre,food) => {
    pre[food.id] = food.count
    return pre
  },{})
  sessionStorage.setItem(shopId+'_key',JSON.stringify(countObj))
}

export function getCount(shop) {
  const cartFoods = []
  const cartCount = JSON.parse(sessionStorage.getItem(shop.id+'_key')) || {}
  
  shop.goods.forEach(good => {
    good.foods.forEach(food => {
      if(cartCount[food.id]>0){
        Vue.set(food,'count',cartCount[food.id])
        cartFoods.push(food)
      }
    })
  })
  return cartFoods
}