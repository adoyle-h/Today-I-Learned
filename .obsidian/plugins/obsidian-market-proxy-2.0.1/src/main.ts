import { Plugin, Platform } from "obsidian"

class AppProxy {
  public sendHandle: any

  constructor() {
    ; (window as any).sendHandle = (window as any).electron.ipcRenderer.send
  }

  register() {
    ; (window as any).electron.ipcRenderer.send = function(a: any, b: any, e: any, ...rest: any) {
      UrlRewrite(e)
        ; (window as any).sendHandle(a, b, e, ...rest)
    }
  }

  unRegister() {
    ; (window as any).electron.ipcRenderer.send = (window as any).sendHandle
  }
}

class NativeProxy {
  constructor() {
    ; (window as any).sendHandle = (window as any).Capacitor.toNative
  }
  register() {
    ; (window as any).toNativeContainer = function() {
      ; (window as any).Capacitor.toNative = (a: any, b: any, c: any, d: any) => {
        if (a == "App" && b == "requestUrl") {
          UrlRewrite(c)
        }
        return (window as any).sendHandle(a, b, c, d)
      }
    }
      ; (window as any).toNativeContainer()
  }

  unRegister() {
    ; (window as any).Capacitor.toNative = (window as any).sendHandle
  }
}

function isNeedUrlRewrite(e: any): boolean {
  if (!e || !e.url) {
    return false
  }
  if (e.url.startsWith("https://github.com/") || e.url.startsWith("https://raw.githubusercontent.com/")) {
    return true
  }
  return false
}

function UrlRewrite(e: any): void {
  if (e && e.url && isNeedUrlRewrite(e)) {
    const src = e.url
    e.url = "https://ghfast.top/" + e.url

    if ((window as any).Capacitor.isLoggingEnabled) {
      window.console.info(JSON.stringify({ src: src, proxy: e.url }))
    }
    if (!e.headers) {
      e.headers = {}
    }
    e.headers["content-type"] = "application/x-www-form-urlencoded"
    e.headers["Access-Control-Allow-Origin"] = "*"
  }
}

export default class MarketProxy extends Plugin {
  proxy: AppProxy | NativeProxy

  async onload() {
    if (Platform.isDesktop) {
      this.proxy = new AppProxy()
    } else {
      this.proxy = new NativeProxy()
    }
    this.proxy.register()
  }

  onunload() {
    this.proxy.unRegister()
  }
}
