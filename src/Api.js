import axios from "axios";

const API = axios.create({
  baseURL: "http://task-tracker-v4.runasp.net/api/",
});

// User

export async function GetAllUsers(){
    try{
        const response = await API.get("Account/users");
        return(response.data)
    }
    catch(ex){
        return console.error(ex)
    }
}

export async function GetUserById(id){
    try{
        const response = await API.get(`Account/user/${id}`);
        return(response.data)
    }
    catch(ex){
        return console.error(ex)
    }
}

export async function ChangeUserRole(id,rolehash){
    try{
        await API.patch(`Account/update-role/${id}/${rolehash}`);
        return("Ok")
    }
    catch(ex){
        return console.error(ex)
    }
}

export async function UpdateUser(user) {
  try {
    const payload = {
      ...user,
      joinDate: new Date(user.joinDate).toISOString().split("T")[0],
    };

    console.log("Sending payload:", payload);

    await API.put("Account/update", payload);
    return "Ok";
  } catch (ex) {
    console.error("UpdateUser error:", ex);
    throw ex;
  }
}


export async function DeleteUser(id){
    try{
        await API.delete(`Account/delete/${id}`);
        return("Ok")
    }
    catch(ex){
        return console.error(ex)
    }
}


//Auth

export async function LoginUser(dto){
    try{
        const response = await API.post(`Login/LoginAuth`,dto);
        return(response.data)
    }
    catch(ex){
        return console.error(ex)
    }
}


//Notifications

export async function GetNotificationByUserID(id){
    try{
        const response = await API.get(`Notification/user-nots/${id}`);
        return(response.data)
    }
    catch(ex){
        return console.error(ex)
    }
}

export async function UpdateNotification(id){
    try{
        await API.patch(`Notification/notification/${id}`);
        return console.log("Ok")
    }
    catch(ex){
        return console.error(ex)
    }
}

export async function DeleteNotification(id){
    try{
        await API.delete(`Notification/notification/${id}`);
        return console.log("Ok");
    }
    catch(ex){
        return console.error(ex);
    }
}

// Task

export async function GetTaskById(id){
    try{
        const response = await API.get(`Task/${id}`);
        return(response.data)
    }
    catch(ex){
        return console.error(ex)
    }
}

export async function GetTasksAssignedByUserId(id){
    try{
        const response = await API.get(`Task/assigned-by/${id}`);
        return(response.data)
    }
    catch(ex){
        return console.error(ex)
    }
}

export async function GetTasksNotAssignedByUserId(id){
    try{
        const response = await API.get(`Task/not-assigned-by/${id}`);
        return(response.data)
    }
    catch(ex){
        return console.error(ex)
    }
}

export async function GetTasksAssignedToUserId(id){
    try{
        const response = await API.get(`Task/assigned-to/${id}`);
        return(response.data)
    }
    catch(ex){
        return console.error(ex)
    }
}

export async function CreateTaskAPI(dto){
    try{
        await API.post(`Task/create`,dto)
        return("Ok")
    }
    catch(ex){
        return console.error(ex)
    }
}

export async function UpdateTaskAPI(id,dto){
    try{
        await API.put(`Task/update/${id}`,dto)
        return("Ok")
    }
    catch(ex){
        return console.error(ex)
    }
}

export async function DeleteTaskAPI(id){
    try{
        await API.delete(`Task/delete/${id}`)
        return("Ok")
    }
    catch(ex){
        return console.error(ex)
    }
}

export async function UpdateTaskStatus(id){
    try{
        await API.patch(`Task/update-status/${id}`)
        return("Ok")
    }
    catch(ex){
        return console.error(ex)
    }
}



