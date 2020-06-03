import React from 'react'
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    RedditShareButton,
} from "react-share";
import SvgSprite from './svgSprite';
import { imgData } from '../data/localImgData';
import { copyToClipboard } from '../helpers/str';
import List from "./list";



const CopyUrlButton = (props) => {
    return (
        <div className={`share`} onClick={() => {
            copyToClipboard();
            props.dispatchMessageToModal('URL_COPIED');
        }} >
            {props.children}
        </div>
    )
};



const Share = ({ url, isExpanded, onShareWindowClose, dispatchMessageToModal }) => {
    // console.log(dispatchMessageToModal); //todo: find out why this is rendering on interval

    const { src, description } = imgData.sprite;

    const cb = () => {
        onShareWindowClose(false);
    };
    return (
        <>
            <List baseClassName={`share-box`}>
                <CopyUrlButton url={url} dispatchMessageToModal={dispatchMessageToModal} onShareWindowClose={() => cb()}  children={
                    <SvgSprite classes={'share-box__icon'} name={'CLIPBOARD'} />
                }/>
                <FacebookShareButton url={url} onShareWindowClose={() => cb()}  children={
                    <SvgSprite classes={'share-box__icon'} name={'FACEBOOK'} />
                }/>
                <TwitterShareButton url={url} onShareWindowClose={() => cb()}  children={
                    <SvgSprite classes={'share-box__icon'} name={'TWITTER'}  />
                }/>
                <WhatsappShareButton url={url} onShareWindowClose={() => cb()}  children={
                    <SvgSprite classes={'share-box__icon'} name={'WHATSAPP'} />
                }/>
                <RedditShareButton url={url} onShareWindowClose={() => cb()}  children={
                    <SvgSprite classes={'share-box__icon'} name={'REDDIT'} />
                }/>
            </List>

        </>
    )
};

export default Share;