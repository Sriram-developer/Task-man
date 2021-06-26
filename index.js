//parent element to store cards 
const taskContainer = document.querySelector(".task__container");

//Global store
const globalStore = []; 

const newCard = ({
    id, 
    imageUrl,
    taskTitle,
    taskType,
    taskDescription,
}) =>`<div class="col-md-6 col-lg-4 mt-4" id=${id}>
<div class="card">
    <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
        <button type="button" class="btn btn-outline-danger"><i class="far fa-trash-alt"></i></button>
    </div>
    <img src="${imageUrl}" class="card-img-top rounded-1" alt="card__image">
    <div class="card-body">
      <h5 class="card-title">${taskTitle}</h5>
      <p class="card-text">${taskDescription}</p>
      <span class="badge bg-primary">${taskType}</span>
    </div>
    <div class="card-footer text-muted">
        <button type="button" class="btn btn-outline-primary float-end rounded-pill">Open Task</button>
    </div>
  </div>
</div>`;

const loadInitialTaskCards = () => {
    //access localstorage
    const getInitialData = localStorage.getItem("tasky");
    if (!getInitialData) return;

    //convert stringified-object to object
    const {cards} = JSON.parse(getInitialData);

    // map around the array to generate HTML card and inject it to DOM
    cards.map((cardObject) => {
        const createNewCard = newCard(cardObject);
        taskContainer.insertAdjacentHTML("beforeend", createNewCard);
        globalStore.push(cardObject);

    });
};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`, //unique number for card id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,

    };

       const createNewCard = newCard(taskData);

       taskContainer.insertAdjacentHTML("beforeend", createNewCard);
       globalStore.push(taskData);
       
       // add to localstorage 
       localStorage.setItem("tasky", JSON.stringify({ cards: globalStore}));
};