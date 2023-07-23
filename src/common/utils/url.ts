export const UrlUtil = {
  parseToUrlParams: (params: Record<string, string[]>) => {
    const urlParams = new URLSearchParams()

    if (Object.keys(params).length) {
      for (let prop in params) {
        if (params.hasOwnProperty(prop)) {

          if (Array.isArray(params[prop])) {
            [...params[prop]].forEach((item) => { 
              urlParams.append(prop + "[]", String(item))
            })
            
          } else {
            urlParams.append(prop, String(params[prop]))
          }
          
        }
      }
      return urlParams.toString()
    }
    return params
  }
}