export const renderContent=(noteContent)=>{
    let newContent=noteContent.map(({id,isPinned,isArchive,notes,title})=>{
        return `
        <div class="single-note relative shadow">
            <div class="d-flex align-center title-container">
                <span class="single-note-title">${title}</span>
                <button class="button del-btn v-hidden" data-type="del" data-id="${id}">
                    <span data-type="del" data-id="${id}" class="material-icons-outlined">delete</span>
                </button>
            </div>
            <p>${notes}</p> 
            <div class="options d-flex gap-md">
                <button class="button btn pinned-btn v-hidden" data-pinned=${isPinned} data-type="pinned" data-id="${id}">
                    <span class=${isPinned ? "material-icons" : "material-icons-outlined" } data-pinned=${isPinned} data-type="pinned" data-id="${id}">push_pin</span>
                </button>
                <button class="button btn pinned-btn v-hidden" data-type="archived" data-id="${id}">
                    <span data-type="archived" data-id="${id}" class="material-icons-outlined">archive</span>
                </button>
            </div>   
        </div>`;
    })
    newContent=newContent.join("");
    return newContent;
}