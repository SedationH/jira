const debounce = (func, delay) => {
  let timer

  return (...params) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => func(...params), delay)
  }
}

function f(params) {
  console.log(1)
}

const fDebounced = debounce(f)

fDebounced()
fDebounced()
fDebounced()