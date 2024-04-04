import { useState } from "react";

function ToggleButton({ toggle }) {
    const [active, setActive] = useState(false);

    return (
        <div
            onClick={() => {
                setActive(!active);
                toggle((prev) => !prev);
            }}
            className={`h-[20px] w-[40px] cursor-pointer rounded-full px-[3px] py-[2px] transition-colors ${active ? "bg-[#a745ef]" : "bg-gray-500"}`}
        >
            <div
                className={`size-[16px] rounded-full bg-white transition-transform ${active ? "translate-x-[18px]" : ""}`}
            ></div>
        </div>
    );
}

export default ToggleButton;
