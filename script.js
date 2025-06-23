let taskCounter=0;
window.onload=function(){
  showDate();
  loadTasks();
};

function showDate(){
  const today=new Date();
  document.getElementById("date").textContent=today.toDateString();
}

function addTask(text='',saved=false){
  const taskList=document.getElementById("task-list");

  const row=document.createElement("div");
  row.className=`task-row ${saved ?'saved':'unsaved'}`;
  row.setAttribute("draggable","true");
  row.id=`task-${taskCounter}`;
  row.ondragstart=drag;
  row.ondragend=()=> row.classList.remove("dragging");

  const input = document.createElement("input");
  input.type = "text";
  input.className = "task";
  input.value = text;
  input.oninput = () => row.classList.replace("saved", "unsaved");

  const saveBtn = document.createElement("button");
  saveBtn.className = "saveBtn";
  saveBtn.textContent = "Save";
  saveBtn.onclick = () => 
{
    localStorage.setItem(row.id, input.value);
    row.classList.replace("unsaved", "saved");
  };
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "deleteBtn";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => 
  {
    localStorage.removeItem(row.id);
    row.remove();
  };
  row.appendChild(input);
  row.appendChild(saveBtn);
  row.appendChild(deleteBtn);
  taskList.appendChild(row);
  taskCounter++;
}

function loadTasks() 
{
  for (let key in localStorage) 
    {
    if (key.startsWith("task-")) 
{
      addTask(localStorage.getItem(key), true);
    }
  }
}

// Drag & Drop functions
function drag(event) 
{
  event.dataTransfer.setData("text", event.target.id);
  event.target.classList.add("dragging");
}

function allowDrop(event)
{
  event.preventDefault();
}

function drop(event)
{
  event.preventDefault();
  const id = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(id);
  const target = event.target.closest(".task-row");

  if (target && target !== draggedElement) 
    {
    const taskList = document.getElementById("task-list");
    taskList.insertBefore(draggedElement, target.nextSibling);
  }
}
