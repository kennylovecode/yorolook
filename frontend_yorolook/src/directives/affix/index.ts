import { type Directive } from "vue"

interface AffixConfig {
  target: string
  threshold: number | number[]
  style?: Record<string, string>
  class?: string[]
  handle?: {
    do: (el: HTMLElement) => void
    undo: (el: HTMLElement) => void
  }
  mixin?: string
}
function applyAffixStyle(el: HTMLElement, config: AffixConfig) {
  el.classList.add(...(config.class || []))
  if (config.style) Object.assign(el.style, config.style || {})
  if (config.mixin) {
    const mixinRect = document.querySelector(config.mixin)?.getBoundingClientRect()
    el.style.right = `${mixinRect?.left}px`
    if (document.querySelector(config.mixin)) {
      el.style.width = (mixinRect?.width || 0) * el.getBoundingClientRect().width * 0.001 + "px"
    }
  }
}
export const affix: Directive = {
  mounted(el, binding) {
    const config: AffixConfig = binding.value
    let observer: IntersectionObserver | null = null

    let lastUpdateTime = 0

    const DEBOUNCE_DELAY = 100 // 防抖
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const now = Date.now()
      if (now - lastUpdateTime > DEBOUNCE_DELAY) {
        lastUpdateTime = now
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (config.handle) {
              config.handle.do(el)
            }
            applyAffixStyle(el, config)
          } else {
            if (config.handle) {
              config.handle.undo(el)
            }
            el.style.cssText = ""
            if (config.class) el.classList.remove(...(config.class || []))
          }
        })
      }
    }

    observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: config.threshold
    })

    // 观察需要固定的元素
    if (config.target) observer.observe(document.querySelector(config.target) as Element)
    else observer.observe(el)

    // 组件卸载时清理观察器
    const cleanup = () => {
      // 停止观察
      if (observer) {
        observer.disconnect()
        observer = null
      }
    }

    el._affixCleanup = cleanup
  },

  unmounted(el) {
    // 调用之前保存的清理函数
    if (typeof el._affixCleanup === "function") {
      el._affixCleanup()
    }
  }
}
