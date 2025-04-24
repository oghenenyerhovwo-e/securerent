'use client'

//  modules
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

// functions and objects
import { setTheme } from "@/redux";

const ThemeInitializer = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const saved = localStorage.getItem('theme') || 'light';
      dispatch(setTheme(saved));
    }, [dispatch]);
  
    return (
        <Fragment></Fragment>
    );
};

export default ThemeInitializer