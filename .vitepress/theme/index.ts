import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import GitHubStars from './GitHubStars.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 页头导航右侧、社交图标前：展示 GitHub star 数
      'nav-bar-content-after': () => h(GitHubStars),
    })
  },
}
