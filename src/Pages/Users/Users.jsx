import React from "react";
import User from "./User/User";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/slices/users";

function Users() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users)

    const isUsersLoading = users.status === "loading";

    console.log(users)
    React.useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    return(
        <div>
            {isUsersLoading ? "Loading" : (
                users.items.data.map((user) => (
                    <User fullName={user.fullName} email={user.email} createdAt={user.createdAt}/>
                )) 
            )}
            Общее количество пользователей: {isUsersLoading ? "loading" : users.items.data.length}
        </div>
    )
}

export default Users;