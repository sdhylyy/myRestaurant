import React from "react";
import ItemList from "./ItemList/ItemList";

const Menu = (props) => {
    return (
        <div>
            <ItemList logout={props.logout} />
        </div>
    );
};

export default Menu;
