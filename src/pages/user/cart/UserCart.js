import React from "react";

function UserCart({ currentUser, userDesc }) {

    if (userDesc?.cart) return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {userDesc?.cart?.map((product, index) => (
                <div key={index}>{product?.name}</div>
            ))}
        </div>
    )

    if (!userDesc?.cart) return (
        <h1>You haven't added any product yet.</h1>
    )
}

export default UserCart;
