import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader
        speed={0.5}
        width={110}
        height={33}
        viewBox="0 0 110 33"
        backgroundColor="#b8f7ff"
        foregroundColor="#ffffff"
        {...props}
    >
        <rect x="33" y="169" rx="0" ry="0" width="2" height="7" />
        <rect x="5" y="2" rx="7" ry="7" width="15" height="15" />
        <rect x="25" y="2" rx="7" ry="7" width="15" height="15" />
        <rect x="65" y="2" rx="7" ry="7" width="15" height="15" />
        <rect x="45" y="2" rx="7" ry="7" width="15" height="15" />
        <rect x="85" y="2" rx="7" ry="7" width="15" height="15" />
    </ContentLoader>
)

export default MyLoader