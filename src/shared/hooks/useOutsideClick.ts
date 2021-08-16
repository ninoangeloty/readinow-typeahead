import { useEffect } from "react";

function onClickHander(e: any, selector: string, callback: () => void) {
    let elem = document.querySelector(selector); 
    if (elem) {
        const didClickedOutside = !elem.contains(e.target);
        if (didClickedOutside) {
            callback();
        }
    }
}

function useOutsideClick(selector: string, callback: () => void) {   
    useEffect(() => {
        document.addEventListener("click", (e: any) => onClickHander(e, selector, callback))
        return () => {
            document.removeEventListener("click", (e: any) => onClickHander(e, selector, callback))
        }
    })
}

export default useOutsideClick;