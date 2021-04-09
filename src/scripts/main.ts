const toggleClassList = (args: { target: string[], classList: string[]}) => {
    const { target, classList } = args

    target.forEach(selector => {
        for (const node of document.querySelectorAll(selector)) {

                classList.forEach(className => node.classList.toggle(className))
        }
    })
}

const toggleAttribute = (args: { target: string[], attributeList: string[]}) => {
    const { target, attributeList } = args

    target.forEach(selector => {
        for (const node of document.querySelectorAll(selector)) {
          attributeList.forEach(attribue => {
              const value = node.getAttribute(attribue)
              if(value === null ) {
                  node.toggleAttribute(attribue)
              }
              const newValue  = value === null ? 'true' : value === 'false' ? 'true' : 'false'
              node.setAttribute(attribue, newValue)
          })
        }
    })
}

const focusableElements = `
  button:not([disabled]), 
  [href], 
  input:not([disabled]), 
  select:not([disabled]), 
  textarea:not([disabled]), 
  [tabindex]:not([tabindex="-1"]):not([disabled]), 
  details:not([disabled]), 
  summary:not(:disabled)`

const toggleMainNav = () => {
  /* TODO fix focus trap Daniel Laubacher  Sun 28 Feb 2021 **/
  const target = ['#main-nav']
  toggleClassList({target: ['body'], classList: ['overflow-hidden']})
  toggleClassList({target, classList: ['active', 'hidden']})
  toggleAttribute({target, attributeList: ['aria-hidden']})

  const isActive = document.querySelector('#main-nav')?.classList.contains('active') || false

  if(isActive) {
    for(const node of document.querySelectorAll(focusableElements)) {
      node.setAttribute('data-hidden', "true")
    }

    const focusableNodes = [document.querySelector('#toggle-main-nav'), ...document.querySelector('#main-nav')!.querySelectorAll(focusableElements)]

    for(const node of focusableNodes) {
      node!.removeAttribute('data-hidden')
    }

  } else {
    for(const node of document.querySelectorAll('[data-hidden]')) {
      node.removeAttribute('data-hidden')
    }
  }
}

const addPageLevelAnchors = () => {
  const headingsSelector = "article h1, article h2, article h3, article h4, article h5"
  const headings = document.querySelectorAll(headingsSelector) 

  for(const element of headings) {
    element.innerHTML += `<a href="#${element.id}">#</a>`
  }
}


window.addEventListener('load', () => {
   addPageLevelAnchors() 
})


