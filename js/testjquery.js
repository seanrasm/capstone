function search() {
    const cx = '000103450533375697339:mn56sqv3ops' // your search engine id 
    const apikey = 'AIzaSyA8utdVuCt7_XrGfmmQqAolAfZdvevwBgk' // your api key

    /* select the input element */
    let input = document.getElementById('query')

    /* fetch the following URL that includes apikey, cx and the value of input */
    fetch(`https://www.googleapis.com/customsearch/v1?key=${apikey}&cx=${cx}&q=${input.value}`).then(response => response.text()).then(text => {
        let result = JSON.parse(text)
        result.items.forEach(item => {
            /* add it to your results div */
            // item.link, item.title, ...etc
        
            console.log(item.title);

            var li = document.createElement("li");
            var text = document.createTextNode(item.title);
            li.appendChild(text);
            document.getElementById("results").appendChild(li);
        })
    })
    /* make sure the form isn't actually submitted by returning false */
    return false 
}
