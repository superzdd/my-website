// export const isDark = useDark({
//   onChanged(dark: boolean) {
//     // update the dom, call the API or something
//     DotLineConfig.dotColor = dark ? `rgba(255,255,255,0.5)` : `rgba(0,0,0,0.5)`

//     //
//   },
// })
export const isDark = useDark()

export const toggleDark = useToggle(isDark)
