import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { GlobalState, globalActions } from "../store/slice/global.slice";
import { current } from "@reduxjs/toolkit";
import PreviewImage from "../components/PreviewImage";
import { useNavigate } from "react-router-dom";

const Preview: FC = () => {
  const { currentPicture } = useSelector<RootState, GlobalState>(state => state.global)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPicture === null || currentPicture === undefined) {
      navigate('/'); 
    }
  }, []);


  const okFunction = () => {
    dispatch(globalActions.addPicture(currentPicture))
    dispatch(globalActions.setCurrentPicture(null))
    navigate('/');
  };

  return (
    <>
      <PreviewImage cancelFunction={() => navigate('/')} image={currentPicture?.base64} okFunction={okFunction}/>
    </>
  )

}

export default Preview;