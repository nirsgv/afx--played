import React, { useMemo } from 'react';
import Item from "./item";
import {setSampleId} from "../actions";


function Items ({ tracksFiltered, setPlayerItem, setSampleId }) {

    return (
        <>
            {tracksFiltered.map((item, index) => {
                return (
                    <Item key={index} trackData={item} setPlayerItem={setPlayerItem} setSampleId={setSampleId} />
                )
            })}
        </>
    )
}
export default Items;


// class Items extends React.Component {
//
//     shouldComponentUpdate(nextProps, nextState) {
//         // do not rerender unless this specific property changed
//         return nextProps.tracksFiltered !== this.props.tracksFiltered;
//     }
//
//     render(props) {
//         //console.log(this.props.tracksFiltered);
//         return (
//             <>
//                 {this.props.tracksFiltered.map((item, index) => {
//                     return (
//                         <Item key={index} trackData={item} isPlayingEmbedded={this.props.isPlayingEmbedded} setPlayerItem={this.props.setPlayerItem}/>
//                     )
//                 })}
//             </>
//         )
//     }
// }