import queryString from "query-string"
import { useState } from "react"
import { useLocation, useNavigate } from "@reach/router"

// For initial value, priority is (1) url, (2) options.initialValue
export function useQueryParam(key, options = {}) {
  let type = options.type || "string"
  let initialValue = options.initialValue || undefined

  let { pathname, search } = useLocation()
  let navigate = useNavigate()

  let queryParams = queryString.parse(search) ?? {}

  let qpOrInitialValue
  if (queryParams[key]) {
    if (type === "binary") {
      qpOrInitialValue = queryParams[key] ? atob(queryParams[key]) : null
    } else {
      qpOrInitialValue = queryParams[key]
    }
  } else {
    qpOrInitialValue = initialValue
  }

  let [value, setValue] = useState(qpOrInitialValue)

  function setter(newValue) {
    let newValueSerialized
    if (type === "binary") {
      newValueSerialized = newValue ? btoa(newValue) : undefined
    } else {
      newValueSerialized = newValue || undefined
    }
    queryParams[key] = newValueSerialized

    let serializedQueryString = queryString.stringify(queryParams)
    let search = serializedQueryString ? `?${serializedQueryString}` : ""
    let url = `${pathname}${search}`

    setValue(newValue)
    navigate(url, { replace: true })
  }

  return [value, setter]
}
