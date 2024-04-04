import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

function Menu({ value, setValue, data }) {
    const [openMenu, setOpenMenu] = useState(false);

    const liElements = Object.keys(data).map((key) => {
        return (
            <li
                key={key}
                onClick={() => {
                    setValue(key);
                    setOpenMenu(false);
                }}
                className="whitespace-nowrap"
                style={{ fontFamily: key }}
            >
                {key}
            </li>
        );
    });

    function toggleMenu() {
        setOpenMenu(!openMenu);
    }

    return (
        <div className={`relative w-[80px] select-none border-r`}>
            <div
                onClick={toggleMenu}
                className="flex size-full cursor-pointer items-center justify-between px-2 py-1"
            >
                <p className="font-semibold">{data[value]}</p>
                <FaAngleDown
                    className={`fill-[#a740f8] transition-transform ${openMenu && "rotate-180"} font-sans`}
                />
            </div>
            <ul
                className={`absolute mt-2 flex cursor-pointer flex-col rounded-md bg-slate-50 transition-all *:px-2 *:py-1 *:transition-colors hover:*:bg-slate-200 dark:bg-slate-900 dark:hover:*:bg-slate-800 ${!openMenu && "-z-10 -translate-y-4 opacity-0"}`}
            >
                {liElements}
            </ul>
        </div>
    );
}

export default Menu;
