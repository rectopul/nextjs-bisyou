"use client";

import { useRef, useState } from "react";
import { InstantSearchBar } from "../InstantSearch";
import { Cart } from "./Cart";
import { Button } from "../ui/button";
import { SearchIcon } from "../icons/Icons";

export function HeaderActions() {
    const [state, setState] = useState<boolean>(false);
    const [showSearch, setShowSearch] = useState<boolean>(false);

    const handleChangeState = () => {
        setState(() => (showSearch == false ? false : true));
    };
    const handleShow = () => {
        setState(true);
        setShowSearch(!showSearch);
    };

    return (
        <>
            <div className="absolute right-0 top-[50%] -translate-y-[50%]">
                <Button
                    className="bg-transparent text-bisyou-font hover:text-bisyou-green hover:bg-transparent"
                    onClick={handleShow}
                >
                    <SearchIcon size={25} />
                </Button>
                <Cart />
            </div>

            {state && (
                <div
                    data-visible={showSearch}
                    className="absolute data-[visible=false]:animate-out data-[visible=false]:zoom-out-95 data-[visible=false]:fade-out-0 data-[visible=false]:-slide-out-to-top-96 animate-in data-[visible=true]:fade-in-100 data-[visible=true]:zoom-in-95  data-[visible=true]:slide-in-from-top-1/2 transition-all duration-300 data-[visible=true]:opacity-100 w-full xl:w-[600px] max-w-[600px] px-5 right-[88px] -top-96 data-[visible=true]:top-1/2 -mt-5 overflow-hidden rounded-md z-20"
                    onAnimationEnd={handleChangeState}
                >
                    <div className="w-full shadow-sm">
                        <InstantSearchBar
                            onCloseBar={() => setShowSearch(!showSearch)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
