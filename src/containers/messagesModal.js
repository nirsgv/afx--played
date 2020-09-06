import React from 'react';
import { bindActionCreators } from "redux";
import { removeMessageToModal } from "../actions/index";
import { connect } from "react-redux";
import messagesMap from '../data/messagesMap';
import { evaluateKey } from '../helpers/str';
import SvgSprite from '../components/svgSprite';
import List from '../components/list';

const Message = ({itemId, uniqueId, index, removeMessageToModal, className}) => {
    const message = evaluateKey(messagesMap, itemId),
          timeout = setTimeout(
        () => removeMessageToModal(uniqueId) , (evaluateKey(messagesMap, itemId).countdown) * 1000
    );

    return (
        <>
            <SvgSprite classes={'message-icon'} name={message.iconName} />
            <span key={index}>{message.content}</span>
            <button className='close-btn' onClick={() => removeMessageToModal(uniqueId)}>
                <SvgSprite name={'TIMES'} />
            </button>
        </>
    );
};


const MessagesModal = ({currentMessages, removeMessageToModal}) => {
    return (
        <section className='modal-box__wrap'>
            <ul className="modal-box__list">
                {currentMessages.map((item, index) =>
                    <li className='modal-box__item'
                        data-index={index}
                        style={{ top: `${index * 62}px` }}
                        key={item.uniqueId}
                    >
                    <Message key={item.uniqueId}
                             index={index}
                             itemId={item.id}
                             uniqueId={item.uniqueId}
                             removeMessageToModal={removeMessageToModal}
                             className='modal-box__item'
                    />
                    </li>

                )}
            </ul>
        </section>
    )
};


const mapStateToProps = state => ({
    currentMessages: state.messages.currentMessages
});

const mapDispatchToProps = dispatch => bindActionCreators({
    removeMessageToModal
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessagesModal);