import { renderContent } from "app.js";

let noteContent=JSON.parse(localStorage.getItem('notes'))||[];
const archiveContainer=document.querySelector('.archive-notes-container');
archiveContainer.addEventListener('click',(event)=>{
    const type=event.target.dataset.type;
    const id=event.target.dataset.id;
    switch(type)
    {
        case "del":
            noteContent=noteContent.filter((item)=>item.id.toString()!==id);
            archiveContainer.innerHTML=renderContent(noteContent.filter((item)=>item.isArchive));
            localStorage.setItem('notes',JSON.stringify(noteContent));
            break;
        case "archived":
            noteContent=noteContent.map((item)=>item.id.toString()===id?{...item,isArchive:!item.isArchive}:item);
            archiveContainer.innerHTML=renderContent(noteContent.filter((item)=>item.isArchive));
            localStorage.setItem('notes',JSON.stringify(noteContent));



    }
})
archiveContainer.innerHTML=renderContent(noteContent.filter((item)=>item.isArchive));
