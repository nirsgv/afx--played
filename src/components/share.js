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
            console.log(props);
            props.dispatchMessageToModal('URL_COPIED');
        }} >
            {props.children}
        </div>
    )
};



const Share = ({ url, isExpanded, onShareWindowClose, dispatchMessageToModal }) => {
    console.log(dispatchMessageToModal);

    const { src, description } = imgData.sprite;

    const cb = () => {
        onShareWindowClose(false);
    };
    return (
        <div c>
            <List baseClassName={`share-box`}>
                <FacebookShareButton url={url} onShareWindowClose={() => cb()}  children={
                    <SvgSprite classes={'share-box__icoN'} src={src} alt={description} name={'FACEBOOK'} />
                }/>
                <TwitterShareButton url={url} onShareWindowClose={() => cb()}  children={
                    <SvgSprite classes={'share-box__icon'} src={src} alt={description} name={'TWITTER'}  />
                }/>
                <WhatsappShareButton url={url} onShareWindowClose={() => cb()}  children={
                    <SvgSprite classes={'share-box__icon'} src={src} alt={description} name={'WHATSAPP'} />
                }/>
                <RedditShareButton url={url} onShareWindowClose={() => cb()}  children={
                    <SvgSprite classes={'share-box__icon'} src={src} alt={description} name={'REDDIT'} />
                }/>
                <CopyUrlButton url={url} dispatchMessageToModal={dispatchMessageToModal} onShareWindowClose={() => cb()}  children={<SvgSprite classes={'share-box__icon'} src={src} alt={description} name={'CLIPBOARD'} />}/>
            </List>

        </div>
    )
};

export default Share;