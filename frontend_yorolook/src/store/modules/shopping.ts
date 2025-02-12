import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { CartItem } from "@/api/shop/type"
import { updateCartItem } from "@/api/shop/cart" // 假设这是更新购物车的 API

export const useShoppingStore = defineStore("shopping", () => {
  const cart = ref<CartItem[]>([])
  let timeout: ReturnType<typeof setTimeout> | null = null

  // 发送 API 请求更新后端购物车
  function updateCartOnServer() {
    // updateCartItem(cart.value).catch((error: any) => {
    //   console.error("更新购物车失败:", error)
    // })
  }

  // 添加购物车项
  function addToCart(item: CartItem) {
    cart.value.push(item)
    resetTimeout()
  }

  // 从购物车中删除项
  function removeFromCart(itemId: string) {
    cart.value = cart.value.filter(item => item.id !== itemId)
    resetTimeout()
  }

  // 清空购物车
  function clearCart() {
    cart.value = []
    resetTimeout()
  }

  // 重置定时器
  function resetTimeout() {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      updateCartOnServer()
    }, 5000)
  }

  return { cart, addToCart, removeFromCart, clearCart }
})
/** 在 setup 外使用 */
export function useShoppingStoreHook() {
  return useShoppingStore(store)
}
