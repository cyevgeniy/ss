const effects = new Map()

function createSignal(value) {
  let _value = value

  function signal(v) {
    const isSetter = arguments.length > 0

    if (isSetter) {
      if (typeof v === 'function') {
        _value = v(_value)
      } else {
        _value = v
      }

      // Find registered callbacks
      const signalEffects = effects.get(signal)
      if (signalEffects) {
        for (const cb of signalEffects) {
          cb(_value)
        }
      }
    } else {
      return _value
    }
  }

  return signal
}

function on(signal, cb) {
  const signalEffects = effects.get(signal)

  if (signalEffects) {
    signalEffects.push(cb)
  } else {
    effects.set(signal, [cb])
  }
}

