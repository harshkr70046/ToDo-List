const inputArea = document.getElementById("inputfield");
        const addData = document.getElementById("btn1");
        const todolist_data = document.querySelector(".todolist_data");

        const gettodoListData = ()=>{
            return JSON.parse(localStorage.getItem("data"))
        }

        const addUpdatedstorage = (storeData) => {
            return localStorage.setItem("data",JSON.stringify(storeData));
        }

        let storeData = gettodoListData()==null?[]:gettodoListData();

        const addtodoDynamic = (currElem) => {
            const divElem = document.createElement('div');
            divElem.classList.add('mainDiv');

            divElem.innerHTML = `<li>${currElem}</li><button class="deleteBtn">Delete</button>`
            todolist_data.append(divElem);
        }
        const addTodoList = (e) => {
            
            const todolistValue = inputArea.value.trim();

            inputArea.value = "";
            if(!storeData.includes(todolistValue) && todolistValue!==""){
                
                storeData.push(todolistValue);
                storeData = [...new Set(storeData)];

                localStorage.setItem("data",JSON.stringify(storeData));
                addtodoDynamic(todolistValue);
            }            
        }
        const showTodoList = ()=>{
            storeData.forEach((currElem) => {
                addtodoDynamic(currElem);
            })
        }
        showTodoList();
        
        addData.addEventListener('click',(e)=>{
            e.preventDefault();
            addTodoList(e);
        })

        const removeData = (e)=>{
            const todoRemove = e.target;
            let tolistData = todoRemove.previousElementSibling.innerText;
            let parentElem = todoRemove.parentElement;
            storeData = storeData.filter((currTodo)=>{
                return currTodo !== tolistData;
            })

            addUpdatedstorage(storeData)
            parentElem.remove();
            
        }

        todolist_data.addEventListener('click',(e)=>{
            e.preventDefault();
            if(e.target.classList.contains("deleteBtn")){
                removeData(e);
            }
        })