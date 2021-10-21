import React, { FC, useEffect, useRef, useState } from 'react';

const StickyContent: FC = (props) => {

    const [fixedMode, setFixedMode] = useState<boolean>(false);
    const stickyContentContainerRef = useRef<HTMLDivElement>(null)
    const topMargin = 90;

    useEffect(() => {
        const onScroll = () => {
            if (stickyContentContainerRef.current == null) return;
            let offset = stickyContentContainerRef.current.getBoundingClientRect().top;
            if (offset <= topMargin && !fixedMode) setFixedMode(true);
            if (offset > topMargin && fixedMode) setFixedMode(false); 
        }

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [fixedMode]);

    return (
        <div ref={stickyContentContainerRef} >
            <div style={{
                position: fixedMode ?  "fixed" : "static",
                top: topMargin + "px"
            }}>
                {props.children}
            </div>
        </div>
    )
}

export default StickyContent;