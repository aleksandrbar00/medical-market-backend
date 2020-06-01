const selectContainer = document.getElementById('item-per-page')
const selectValues = selectContainer.getElementsByTagName('option')

selectContainer.addEventListener('change', (e) => {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)


    params.append('length', e.currentTarget.value)
    window.location.replace(`${window.location.origin}/catalog?${params.toString()}`)
    
    
})
