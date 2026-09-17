import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import RepoStars from './RepoStars.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 页头导航右侧：本仓库 + fq-book 的 star 数
      'nav-bar-content-after': () => h(RepoStars),
    })
  },
}
