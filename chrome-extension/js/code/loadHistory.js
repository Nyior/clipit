 

async function loadData(data) {
    const url = "http://shter.herokuapp.com/api/v1/urls";

    const response = await fetch(
        url, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    );

    return response.json(); 
}

const writeDataToDom = () => { 

    loadData()
        .then(data => {

            let hasUrls = data.has_urls;

            if (hasUrls){
                let urlsList = data.urls
                let table = document.querySelector("#klinurl-table-body");

                for (let index = 0; index < urlsList.length; index++) {
                    const element =  urlsList[index];

                    let originalUrl = encodeURI(element.longUrl)
                    let shortcode = encodeURI(element.shortcode)
                    let baseUrl = "https://www.clipit.fun/"
                    let newUrl = `www.clipit.fun/${shortcode}`
                    let newurlHref = baseUrl.concat(shortcode);
                    let trimmedUrl = String(element.longUrl)

                    if(trimmedUrl.length > 10){
                        trimmedUrl = trimmedUrl.substring(0,20).concat("...");
                    }

                    // Create an empty <tr> element and add it to the 1st position of the table:
                    let row = table.insertRow(-1);

                    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);

                    let newUrlString =`
                                    <small>
                                            <a 
                                                href="${newurlHref} "    
                                                class="text-muted"
                                                target="blank"
                                            >
                                            ${newUrl}       
                                            </a>
                                    </small>
                                `
                    
                    let originalUrlString =`
                                <small>
                                        <a 
                                            href="${originalUrl} "    
                                            class="text-muted"
                                            target="blank"
                                        >
                                        ${trimmedUrl}       
                                        </a>
                                </small>
                            `

                    // Add the urls to the new cells:
                    cell1.innerHTML = newUrlString;
                    cell2.innerHTML = originalUrlString;      
                }  
            }else{
                let elem = document.querySelector("#no-saved-urls");
                elem.innerHTML = "You have no shortened urls yet"  ; 
            }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    writeDataToDom();
});
