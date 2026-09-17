import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

/** 顶层内容目录（排除工程与隐藏目录） */
const SKIP_TOP = new Set(['.git', '.vitepress', 'node_modules', 'dist', '.github'])

function listTopLevelDirs(root: string): string[] {
  return readdirSync(root)
    .filter((name) => {
      if (SKIP_TOP.has(name) || name.startsWith('.')) return false
      try {
        return statSync(join(root, name)).isDirectory()
      } catch {
        return false
      }
    })
    .sort((a, b) => a.localeCompare(b, 'zh-CN'))
}

/** 有 rewrite 后，目录默认入口统一为 /dir/ */
function folderEntryLink(dir: string): string {
  return `/${dir}/`
}

const topDirs = listTopLevelDirs(process.cwd())

const vitePressOptions = {
  title: '城中村哈姆雷特',
  description: 'Hamlet of China’s Slums — 人文社科知识库在线浏览',
  lang: 'zh-CN',
  // 本地仍走 /；GitHub Actions 部署到 https://<user>.github.io/hamuleite/
  base: process.env.GITHUB_ACTIONS ? '/hamuleite/' : '/',
  // 根目录即文档源，不搬迁现有 Markdown
  srcDir: '.',
  srcExclude: ['**/node_modules/**', '**/dist/**'],
  ignoreDeadLinks: true,
  cleanUrls: true,
  lastUpdated: true,
  // 仓库里存在大写后缀图片（.PNG），Vite 默认不认，需显式纳入静态资源
  vite: {
    assetsInclude: ['**/*.PNG', '**/*.JPG', '**/*.JPEG', '**/*.GIF', '**/*.WEBP'],
  },
  // 把各目录 README/readme 映射成文件夹默认页，便于侧栏与导航
  rewrites: {
    ':folder/README.md': ':folder/index.md',
    ':folder/readme.md': ':folder/index.md',
    ':folder/:sub/README.md': ':folder/:sub/index.md',
    ':folder/:sub/readme.md': ':folder/:sub/index.md',
    ':folder/:sub/:deep/README.md': ':folder/:sub/:deep/index.md',
    ':folder/:sub/:deep/readme.md': ':folder/:sub/:deep/index.md',
    ':folder/:sub/:deep/:deeper/README.md': ':folder/:sub/:deep/:deeper/index.md',
    ':folder/:sub/:deep/:deeper/readme.md': ':folder/:sub/:deep/:deeper/index.md',
  },
  head: [
    ['meta', { name: 'theme-color', content: '#1a1a2e' }],
  ],
  themeConfig: {
    logo: '/hamlet.svg',
    siteTitle: '城中村哈姆雷特',
    outline: {
      label: '本页目录',
      level: [2, 3],
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            noResultsText: '无结果',
            resetButtonTitle: '清空',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },
    nav: [
      { text: '首页', link: '/' },
      {
        text: '板块',
        items: topDirs.map((dir) => ({
          text: dir,
          link: folderEntryLink(dir),
        })),
      },
      {
        text: 'GitHub',
        items: [
          { text: 'hamuleite', link: 'https://github.com/hoochanlon/hamuleite' },
          { text: 'fq-book', link: 'https://github.com/hoochanlon/fq-book' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hoochanlon/hamuleite' },
    ],
    footer: {
      message: '内容均为搬运整理，仅供海外华人及社科研究者参考',
      copyright: 'Hamlet of China’s Slums',
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
  },
}

const vitePressSidebarOptions = {
  documentRootPath: '/',
  collapsed: true,
  // 从第一层文件夹开始默认收起；2 会把顶层目录撑开
  collapseDepth: 1,
  capitalizeFirst: false,
  useTitleFromFileHeading: true,
  useFolderLinkFromIndexFile: true,
  includeRootIndexFile: false,
  includeFolderIndexFile: true,
  excludeByGlobPattern: [
    'node_modules/**',
    'dist/**',
    '.vitepress/**',
    'package.json',
    'package-lock.json',
    // 首页是 layout:home，不进侧栏，避免和 README 抢入口
    'index.md',
  ],
  // 关掉默认按名排序；用自定义：根 README 置顶，其余按中文名
  sortMenusByName: false,
  sortMenusByCustomFunction: (a: { fileName?: string; text?: string; link?: string }, b: { fileName?: string; text?: string; link?: string }) => {
    const isRootReadme = (x: typeof a) =>
      /^readme\.md$/i.test(String(x.fileName ?? '')) ||
      x.link === '/README' ||
      x.link === '/readme'
    if (isRootReadme(a) !== isRootReadme(b)) return isRootReadme(a) ? -1 : 1
    const an = String(a.fileName ?? a.text ?? '')
    const bn = String(b.fileName ?? b.text ?? '')
    return an.localeCompare(bn, 'zh-CN')
  },
  hyphenToSpace: true,
  underscoreToSpace: true,
}

export default defineConfig(
  withSidebar(vitePressOptions, vitePressSidebarOptions),
)
