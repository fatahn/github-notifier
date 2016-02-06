"use strict";

function populateProjectList(){
    chrome.storage.sync.get("data", function (obj) {
        if(obj.data === null || obj.data === undefined || obj.data.length === 0){
            document.querySelector('.add-project__new-user').style.display = 'block'
            document.querySelector('.add-project__been-here-before').style.display = 'none';
        }else{
            document.querySelector('.add-project__been-here-before').style.display = 'block';
            document.querySelector('.add-project__new-user').style.display = 'none'
        }

        let projectForms = document.querySelector('.add-project__forms');
        projectForms.innerHTML = "";

        obj.data.forEach(function(project){
            projectForms.insertAdjacentHTML("beforeend", '\
                <div class="add-project__form">\
                <input type="text" value="' + project.org + '" placeholder="Organisation/User" class="org">\
                <input type="text" value="' + project.repo + '" placeholder="Repo" class="repo">\
            </div>');
        });
    });
}

function saveProjects(){
    let projects = document.querySelectorAll('.add-project__form'),
        projectStorageArr = [];

    for(let i = 0; i < projects.length; i++){
        projectStorageArr.push({
            org: projects[i].querySelector(".org").value,
            repo: projects[i].querySelector(".repo").value
        });
    }

    chrome.storage.sync.set(
        {
            'data': projectStorageArr
        }
    );
}

document.querySelector(".add-project__save-bttn").addEventListener("click", function(e){
    saveProjects();
    e.preventDefault();
});

document.querySelector('.add-project__watch-new-bttn').addEventListener("click", function(e){
    saveProjects();

    let projectForms = document.querySelector('.add-project__forms');

    projectForms.insertAdjacentHTML("beforeend", '\
        <div class="add-project__form">\
        <input type="text" placeholder="Organisation/User" class="org" title="This is the text of the tooltip">\
        <input type="text" placeholder="Repo" class="repo">\
    </div>');

    e.preventDefault();
});

populateProjectList();
