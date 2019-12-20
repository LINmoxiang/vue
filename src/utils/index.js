export function saveCount(shopId,cartFoods) {
  const countObj = cartFoods.reduce((pre,food) => {
    pre[food.id] = food.count
    return pre
  },{})
  sessionStorage.setItem(shopId+'_key',JSON.stringify(countObj))
}