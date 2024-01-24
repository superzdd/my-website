export class Env {
  private static ua: string

  public static getEnv() {
    const { getUa, uaMatch, uaIncludes, getIOSVersion, getAndroidVersion } = Env

    Env.ua = getUa()
    const isMobile = !!uaMatch(/AppleWebKit.*Mobile.*/)
    const isIOS
      = !!uaMatch(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || uaIncludes('iPhone')
    const isAndroid = uaIncludes('Android') || uaIncludes('Adr')
    const osName = isIOS ? 'ios' : 'android'
    const isIPhone = uaIncludes('iPhone')
    const isIPad = uaIncludes('iPad')
    const osVersion = isIOS ? getIOSVersion() : getAndroidVersion()

    return {
      isMobile,
      isIOS,
      isAndroid,
      osName,
      isIPhone,
      isIPad,
      osVersion,
    }
  }

  private static getUa() {
    const navigator = window ? window.navigator : null
    if (!navigator)
      return ''

    return navigator.userAgent
  }

  private static uaIncludes(str: string) {
    return Env.ua.includes(str)
  }

  private static uaMatch(re: string) {
    return Env.ua.match(re)
  }

  private static getIOSVersion() {
    const version = Env.ua.toLowerCase().match(/cpu iphone os (.*?) like mac os/)

    if (version && Array.isArray(version) && version.length > 0 && version[1])
      return version[1].replace(/_/gi, '.')

    return ''
  }

  private static getAndroidVersion() {
    const version = Env.ua.toLowerCase().match(/android [\d._]+/gi)

    if (Env.ua.toLowerCase().indexOf('android') > 0)
      return (`${version}`).replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.')

    return ''
  }
}
