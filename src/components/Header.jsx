import ToggleButton from "./ToggleButton";
import logo from "../assets/logo_dict.jpeg";
import { HiOutlineMoon } from "react-icons/hi2";

function Header({ setDarkMode, children }) {
    return (
        <header className="flex h-[50px] items-center justify-between">
            <img className="h-full" src={logo} alt="logo" />
            <div className="flex gap-4">
                {children}
                <div className="flex items-center gap-2">
                    <ToggleButton toggle={setDarkMode} />
                    <HiOutlineMoon className="size-[30px] transition-colors dark:stroke-[#a740f8]" />
                </div>
            </div>
        </header>
    );
}

export default Header;
