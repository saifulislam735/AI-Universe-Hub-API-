const loadData = async (dataForShowMore) => {
    document.getElementById('spinner').classList.remove('d-none');

    url = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(url);
    const data = await res.json();
    seeMore(data.data.tools, dataForShowMore);


}
const seeMore = (dataArray, dataForShowMore) => {
    const seeMoreButton = document.getElementById('seeMore');
    if (dataArray.length && dataForShowMore > 6) {
        const sendCard = dataArray.slice(0, 6);
        // console.log(sendCard.length)
        singleData(sendCard);
        seeMoreButton.classList.remove('d-none')

    }
    else {
        singleData(dataArray);
        seeMoreButton.classList.add('d-none')

    }
}
const singleData = (arrayData) => {
    arrayData.forEach(cardInfo => {
        showData(cardInfo);
        // console.log(cardInfo);
    });
}
const showData = (info) => {
    // console.log(info);
    // console.log(info.features);
    const divContainer = document.getElementById('divContainer');
    const addDiv = document.createElement('div');
    addDiv.innerHTML = `
    <div class="col">
        <div class="card h-100 p-3">
            <img src="${info.image}" class="card-img-top rounded-2 " alt="No image found">
            <div class="card-body">
                <h5 class="card-title fw-semibold">Features</h5>
                <p class="card-text">
                    <ol>
                        <li>
                            Natural language processing
                        </li>
                        <li>
                            Contextual understanding
                        </li>
                        <li>
                            Text generation
                        </li>
                    </ol>
                </p>
            </div>
            <div class="card-footer">
                <h5 class="card-title fw-semibold">${info.name}</h5>
                <small class="text-body-secondary d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-date  me-2 " viewBox="0 0 16 16">
                    <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    </svg>
                    <span>${info.published_in}</span>
                    <button onclick="modalLoad(${info.id})"  type="button" class="btn btn-primary ms-auto " data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Details
                    </button>
              </small>
            </div>
        </div>
    </div>
    `;
    divContainer.appendChild(addDiv);
    document.getElementById('spinner').classList.add('d-none')
}
const seeMoreButton = document.getElementById('seeMore');

seeMoreButton.addEventListener('click', function () {
    loadData(0);
    seeMoreButton.classList.add('d-none')
    document.getElementById('spinner').classList.remove('d-none')
})
const modalLoad = async (id) => {
    url = `https://openapi.programming-hero.com/api/ai/tool/0${id}`;
    const res = await fetch(url);
    const data = await res.json();
    modalShow(data.data);
}
const modalShow = (modalInfo) => {
    console.log(modalInfo);
    const feature = modalInfo.features
    console.log(feature[1].feature_name);
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="row  h-auto">
            <div class="col-sm-6 ">
                <div class="card">
                    <div class="card-body bg-danger " style="border:solid 0.5px red; --bs-bg-opacity: .05;">
                        <p class="fw-bold text-justify ">${modalInfo.description}</p>
                        <div class="d-flex gap-1 justify-content-center">
                            <div class="col-sm-4 bg-white rounded">
                                <div class=" text-center text-success fw-bold   ">
                                    <p class="p-2 mt-2 " >
                                        ${modalInfo.pricing[0].price} <br>
                                        ${modalInfo.pricing[0].plan}
                                    </p>
                                </div>
                            </div>
                            <div class="col-sm-4 bg-white rounded">
                                <div class=" text-center text-warning fw-bold">
                                    <p class="p-2 mt-2 " >
                                        ${modalInfo.pricing[1].price} <br>
                                        ${modalInfo.pricing[1].plan}
                                    </p>
                                </div>
                            </div>
                            <div class="col-sm-4 bg-white rounded ">
                                <div class=" text-center text-danger fw-bold">
                                    <p class="p-2 mt-2 " >
                                        ${modalInfo.pricing[2].price} <br>
                                        ${modalInfo.pricing[2].plan}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex gap-3">
                            <div class="col-sm-6">
                                <h5>Features:</h5>
                                <ul>
                                    <li>${modalInfo.features[1].feature_name}</li>
                                    <li>${modalInfo.features[2].feature_name}</li>
                                    <li>${modalInfo.features[3].feature_name}</li>
                                </ul>
                                
                            </div>
                            <div class="col-sm-6">
                                <h5>Integrations:</h5>
                                <li>${modalInfo.integrations[1]}</li>
                                <li>${modalInfo.integrations[2]}</li>
                                <li>${modalInfo.integrations[3]}</li>
                            </div>
                        </div>
                        
                    </div>
                </div>
                    
            </div>
            <div class="col-sm-6">
                <div class="card">
                    
                    <img src="${modalInfo.image_link[0]}" class="card-img-top p-2 rounded-1 " alt="...">
                    <span class="badge position-absolute  text-bg-danger p-2 end-0">94% accuracy</span>
                    <div class="card-body">
                    
                        <h5 class="card-title fw-bold text-center">Hi, how are you doing today?</h5>
                        <p class="card-text text-center ">I'm doing well, thank you for asking. How can I assist you    today?
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    `;
}
loadData(7);