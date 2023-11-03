import React from "react"
import ContentLoader from "react-content-loader"

export const FullPizzaSkeleton = () => (
    <ContentLoader
        speed={2}
        width={1920}
        height={500}
        viewBox="0 0 1920 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="800" y="30" rx="5" ry="5" width="400" height="50"/>
        <circle cx="400" cy="250" r="250"/>
        <rect x="800" y="105" rx="5" ry="5" width="100" height="50"/>
        <rect x="800" y="180" rx="5" ry="5" width="400" height="150"/>
        <rect x="800" y="380" rx="20" ry="20" width="400" height="75"/>
        <rect x="800" y="480" rx="20" ry="20" width="150" height="50"/>
    </ContentLoader>
);