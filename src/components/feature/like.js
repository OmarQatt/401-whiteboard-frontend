import React from 'react';
import { increment, decrement, selectCount } from './likeSlicer';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
export default function Like() {
    const counter = useSelector(selectCount)
    const dispatch = useDispatch();
    return (
        <div>
            <button onClick={() => dispatch(increment())} >{<FontAwesomeIcon icon={faThumbsUp} width="80px"/>}</button>
            <span>{counter}</span>
        </div>
    )
}