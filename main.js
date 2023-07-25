import { renderContent } from "app.js";

const noteTitle=document.querySelector('.title');
const noteContent=document.querySelector('.note');
const addButton=document.querySelector('.add-btn');
const showNotes=document.querySelector('.notes-container');
const displayNotes=document.querySelector('.notes-display');
const pinnedNotes=document.querySelector('.pinned-notes-container')
let cardContent=JSON.parse(localStorage.getItem("notes")) || [];
let pinnedContent=cardContent.length>0?cardContent.filter((item)=>item.isPinned && !item.isArchive):[];

addButton.addEventListener('click',(event)=>{
    if(noteTitle.value.trim().length>0 || noteContent.value.trim().length>0)
    {
        cardContent=[...cardContent,{id:Date.now(),isPinned:false,isArchive:false,notes:noteContent.value,title:noteTitle.value}];
        noteContent.value="";
        noteTitle.value="";
        const displayContent=cardContent.filter((item)=>!item.isArchive && !item.isPinned);
        showNotes.innerHTML=renderContent(displayContent);
        localStorage.setItem("notes", JSON.stringify(cardContent));
    }
})

displayNotes.addEventListener('click',(event)=>{
    const type=event.target.dataset.type;
    const id=event.target.dataset.id;
    const pinned=event.target.dataset.pinned;
    switch(type)
    {
        case "del":
            cardContent=cardContent.filter((item)=>item.id.toString()!== id && !item.isPinned && !item.isArchive);
            showNotes.innerHTML=renderContent(cardContent);
            if(pinned==="true" && type==="del");
            {
                pinnedContent=pinnedContent.filter((item)=> id!==item.id.toString());
                pinnedNotes.innerHTML=renderContent(pinnedContent);
            }
            localStorage.setItem("notes", JSON.stringify(cardContent));
            break;
        case "pinned":
            cardContent=cardContent.map((item)=> item.id.toString()===id?{...item,isPinned:!item.isPinned}:item);
            pinnedContent=cardContent.filter((item)=> item.isPinned && !item.isArchive);
            pinnedNotes.innerHTML=renderContent(pinnedContent);
            const showContent=cardContent.filter((item)=>!item.isPinned && !item.isArchive);
            showNotes.innerHTML=renderContent(showContent);
            localStorage.setItem("notes", JSON.stringify(cardContent));
            break;
        case 'archived':
            cardContent=cardContent.map((item)=>item.id.toString()===id?{...item,isArchive:!item.isArchive}:item);
            const showCont=cardContent.filter((item)=>!item.isPinned && !item.isArchive);
            showNotes.innerHTML=renderContent(showCont);
            pinnedContent=pinnedContent.map((item)=>item.id.toString()===id?{...item,isArchive:!item.isArchive}:item);
            pinnedContent=pinnedContent.filter((item)=>!item.isArchive);
            pinnedNotes.innerHTML=renderContent(pinnedContent);
            localStorage.setItem("notes", JSON.stringify(cardContent));
            break;
    }
})
const displayContent=cardContent.filter((item)=>!item.isArchive && !item.isPinned);
showNotes.innerHTML=renderContent(displayContent);
pinnedNotes.innerHTML=renderContent(pinnedContent);
