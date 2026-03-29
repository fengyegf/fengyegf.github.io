<script lang="ts">
import { onMount } from 'svelte'
import Icon from '@iconify/svelte'

type TranslateApi = {
  setUseVersion2?: () => void
  language?: {
    setLocal?: (lang: string) => void
    getCurrent?: () => string
  }
  service?: {
    use?: (channel: string) => void
  }
  listener?: {
    start?: () => void
  }
  selectLanguageTag?: {
    show?: boolean
    languages?: string
    selectOnChange?: (event: { target: { value: string } }) => void
  }
  request?: {
    listener?: {
      start?: () => void
    }
  }
  execute?: () => void
  changeLanguage?: (lang: string) => void
}

const SCRIPT_ID = 'xnx3-translate-script'
const SCRIPT_SRC_LIST = [
  '/vendor/translate.js',
  'https://res.zvo.cn/translate/translate.js',
  'https://gitee.com/mail_osc/translate/raw/master/translate.js/translate.js',
  'https://cdn.staticfile.net/translate.js/3.18.66/translate.js',
  'https://raw.githubusercontent.com/xnx3/translate/refs/heads/master/translate.js/translate.js',
]
const SELECTED_LANGUAGE_KEY = 'translate-selected-language'

const languages: Array<{ code: string; label: string }> = [
  { code: 'chinese_simplified', label: '简体中文' },
  { code: 'chinese_traditional', label: '繁體中文' },
  { code: 'english', label: 'English' },
  { code: 'japanese', label: '日本語' },
  { code: 'korean', label: '한국어' },
  { code: 'french', label: 'Français' },
  { code: 'german', label: 'Deutsch' },
  { code: 'russian', label: 'Русский' },
  { code: 'spanish', label: 'Español' },
]

let menuOpen = false
let initialized = false
let isLoading = false
let loadError = ''
let selectedLanguage = 'chinese_simplified'
let translateReadyPromise: Promise<void> | null = null

function getTranslate(): TranslateApi | undefined {
  return (window as Window & { translate?: TranslateApi }).translate
}

function initTranslateIfReady() {
  const translate = getTranslate()
  if (!translate || initialized) return

  translate.setUseVersion2?.()
  translate.language?.setLocal?.('chinese_simplified')
  translate.service?.use?.('client.edge')
  translate.listener?.start?.()
  translate.request?.listener?.start?.()

  if (translate.selectLanguageTag) {
    translate.selectLanguageTag.languages = languages
      .map(item => item.code)
      .join(',')
  }

  if (translate.selectLanguageTag) {
    translate.selectLanguageTag.show = false
  }

  translate.execute?.()
  initialized = true
}

async function ensureTranslateLoaded() {
  if (getTranslate()) {
    initTranslateIfReady()
    return
  }

  if (!translateReadyPromise) {
    translateReadyPromise = new Promise<void>((resolve, reject) => {
      const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
      if (existing?.dataset.loaded === '1') {
        initTranslateIfReady()
        resolve()
        return
      }

      let sourceIndex = 0
      const script = existing || document.createElement('script')
      script.id = SCRIPT_ID
      script.async = true

      const tryNextSource = () => {
        if (sourceIndex >= SCRIPT_SRC_LIST.length) {
          reject(new Error('Failed to load translate.js from all sources'))
          return
        }

        const nextSrc = SCRIPT_SRC_LIST[sourceIndex++]
        script.src = nextSrc
      }

      script.onload = () => {
        script.dataset.loaded = '1'
        initTranslateIfReady()
        resolve()
      }
      script.onerror = () => {
        tryNextSource()
      }

      if (!existing) {
        document.head.appendChild(script)
      }
      tryNextSource()
    })
  }

  await translateReadyPromise
}

function toggleMenu() {
  ensureTranslateLoaded().catch(() => {})
  menuOpen = !menuOpen
}

async function onPickLanguage(lang: string) {
  isLoading = true
  loadError = ''
  try {
    await ensureTranslateLoaded()
    const translate = getTranslate()
    if (translate?.selectLanguageTag?.selectOnChange) {
      translate.selectLanguageTag.selectOnChange({ target: { value: lang } })
    } else {
      translate?.changeLanguage?.(lang)
    }

    // Some environments do not auto-trigger execute after programmatic change.
    setTimeout(() => {
      const latest = getTranslate()
      latest?.execute?.()
    }, 80)

    selectedLanguage = lang
    localStorage.setItem(SELECTED_LANGUAGE_KEY, lang)
  } catch {
    loadError = '翻译服务加载失败，请稍后重试'
  } finally {
    isLoading = false
  }
  menuOpen = false
}

function onClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement | null
  if (!target) return
  if (target.closest('#i18n-switch-root')) return
  menuOpen = false
}

onMount(() => {
  selectedLanguage =
    localStorage.getItem(SELECTED_LANGUAGE_KEY) || 'chinese_simplified'

  ensureTranslateLoaded()
    .then(() => {
      const translate = getTranslate()
      const current = translate?.language?.getCurrent?.()
      if (current && current.trim().length > 0) {
        selectedLanguage = current
        localStorage.setItem(SELECTED_LANGUAGE_KEY, current)
      } else if (selectedLanguage !== 'chinese_simplified') {
        translate?.changeLanguage?.(selectedLanguage)
      }
    })
    .catch(() => {
      loadError = '翻译服务加载失败，请检查网络'
    })

  document.addEventListener('click', onClickOutside)
  return () => {
    document.removeEventListener('click', onClickOutside)
  }
})
</script>

<div id="i18n-switch-root" class="relative z-50 ignore" role="menu" tabindex="-1">
  <button
    aria-label="Language Switch"
    role="menuitem"
    class="btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
    on:click={toggleMenu}
    type="button"
  >
    <Icon icon="material-symbols:translate-rounded" class="text-[1.25rem]" />
  </button>

  {#if menuOpen}
    <div class="absolute top-11 right-0 pt-2">
      <div class="card-base p-2 rounded-lg flex flex-col border border-neutral-200 dark:border-neutral-700 min-w-[11rem]">
        {#each languages as lang}
          <button
            class={`px-4 py-2 rounded-md hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)] transition text-sm font-bold dark:text-neutral-300 whitespace-nowrap text-left flex items-center justify-between ${selectedLanguage === lang.code ? 'bg-[var(--btn-plain-bg-hover)] text-[var(--primary)]' : 'text-neutral-700'}`}
            disabled={isLoading}
            type="button"
            on:click={() => onPickLanguage(lang.code)}
          >
            <span>{lang.label}</span>
            {#if selectedLanguage === lang.code}
              <Icon icon="material-symbols:check-rounded" class="text-[1rem]" />
            {/if}
          </button>
        {/each}
      </div>
      {#if loadError}
        <div class="mt-2 px-2 text-xs text-red-500 dark:text-red-400">{loadError}</div>
      {/if}
    </div>
  {/if}
</div>
