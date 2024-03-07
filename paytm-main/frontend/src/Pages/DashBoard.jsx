import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export function DashBoard(){
    return <div>
        <Appbar></Appbar>
        <Balance value={10000}></Balance>
        <Users></Users>
    </div>
}