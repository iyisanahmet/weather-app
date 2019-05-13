const weatherForm = document.querySelector('#weatherForm');
const error = document.querySelector('#error');
const searchResult = document.querySelector('#searchResult');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    searchResult.innerHTML = 'Loading...'
    
    const searchValue = document.querySelector('#searchInput').value;
    fetch(`/weather?address=${searchValue}`)
        .then(response =>response.json())
        .then(data=>{
            if(data.error){
                error.innerHTML = data.error
                searchResult.innerHTML = ''
            }else{
                error.innerHTML = ''
                searchResult.innerHTML = `${data.forecastData}`;
            }
        })
})

