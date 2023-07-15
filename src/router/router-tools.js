
export const getViewPage = (name) => {
  return () => {
    return import('@/pages/' + name + '.vue')
  }
}

export const getComponent = name => () =>
  import('@/components/' + name + '.vue')
