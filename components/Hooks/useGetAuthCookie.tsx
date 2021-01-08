import React from 'react';
import { useCookies } from "react-cookie";

export function useGetAuthCookie() {
    const [cookie] = useCookies(["user"]);

    if (cookie.user) {
        return cookie.user;
    }

    return false;
}