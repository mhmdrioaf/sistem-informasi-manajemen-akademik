import React from "react";
import { MarketplaceHeader } from "../../components/layouts";

function Marketplace({ currentUser, userDesc }) {

    return (
        <>
            <MarketplaceHeader currentUser={currentUser} userDesc={userDesc} />
        </>
    )
}

export default Marketplace;