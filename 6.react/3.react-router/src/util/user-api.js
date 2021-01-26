const userAPI = {
    list() {
        let list = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
        return list;
    },
    add(user) {
        let list = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
        list.push(user);
        localStorage.setItem("users", JSON.stringify(list));
    },
    find(id) {
        let list = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
        for(let i = 0; i < list.length; i++) {
            if(list[i].id === id) {
                return list[i];
            }
        }
        return null;
    }

} 

export default userAPI;