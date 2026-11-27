import React from "react";
import List  from "../components/list";
import { Link } from "react-router-dom";
import SvgSprite from "./svgSprite";
import Spinner from "./spinner";
import PropTypes from 'prop-types';
import { getShow } from '../helpers/api';
import { useAsync } from '../customHooks';

// Links to the shows a track was played at; each show is fetched from the API.
function Concerts({ venues = [] }) {
    const { data: shows, loading } = useAsync(
        () => Promise.all(venues.map((id) => getShow(id).catch(() => null))),
        venues.join('|')
    );

    if (loading) return <Spinner label="Loading shows" />;

    const found = (shows || []).filter(Boolean);
    if (!found.length) return <h3 className={'expanded-item__none'}>None specified.</h3>;

    return (
        <List baseClassName='concerts'>
            {found.map((show) => (
                <Link to={`/concert/${encodeURIComponent(show.SHOW_ID)}`} key={show.SHOW_ID} className={'concerts__link'}>
                    <span className={'concerts__text'}>{show.SHOW_TITLE}</span>
                    <SvgSprite classes={'concerts__icon'} name={'LONG_ARROW_RIGHT'} />
                </Link>
            ))}
        </List>
    );
}

Concerts.propTypes = {
    venues: PropTypes.arrayOf(PropTypes.string),
};

export default Concerts;
